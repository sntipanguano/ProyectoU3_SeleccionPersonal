import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Container, Table, Button, Alert } from "react-bootstrap";

// Consulta para obtener los candidatos seleccionados
const GET_CANDIDATOS_SELECCIONADOS = gql`
  query GetCandidatosSeleccionados {
    candidatosSeleccionados {
      id
      nombre
      email
      puesto
      estado
    }
  }
`;

// Mutación para confirmar la contratación
const CONFIRMAR_CONTRATACION = gql`
  mutation ConfirmarContratacion($id: ID!) {
    confirmarContratacion(id: $id) {
      id
      estado
    }
  }
`;

const SeleccionContratacion = () => {
  const { loading, error, data, refetch } = useQuery(GET_CANDIDATOS_SELECCIONADOS);
  const [confirmarContratacion] = useMutation(CONFIRMAR_CONTRATACION);
  const [successMessage, setSuccessMessage] = useState("");

  const handleConfirmar = async (id) => {
    try {
      await confirmarContratacion({ variables: { id } });
      setSuccessMessage("Contratación confirmada exitosamente.");
      refetch(); // Recargar la lista de candidatos seleccionados
    } catch (error) {
      console.error("Error al confirmar contratación", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>✅ Selección y Contratación</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al cargar candidatos</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Puesto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.candidatosSeleccionados.map((candidato) => (
              <tr key={candidato.id}>
                <td>{candidato.id}</td>
                <td>{candidato.nombre}</td>
                <td>{candidato.email}</td>
                <td>{candidato.puesto}</td>
                <td>{candidato.estado}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleConfirmar(candidato.id)}
                  >
                    Confirmar Contratación
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default SeleccionContratacion;