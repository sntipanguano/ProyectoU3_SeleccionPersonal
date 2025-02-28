import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Container, Table, Button, Form } from "react-bootstrap";

const GET_CANDIDATOS = gql`
  query GetCandidatos {
    candidatos {
      id
      nombre
      email
      estado
      vacante
    }
  }
`;

const ACTUALIZAR_ESTADO_CANDIDATO = gql`
  mutation ActualizarEstadoCandidato($id: ID!, $estado: String!) {
    actualizarEstadoCandidato(id: $id, estado: $estado) {
      id
      estado
    }
  }
`;

const GestionCandidatos = () => {
  const { loading, error, data } = useQuery(GET_CANDIDATOS);
  const [actualizarEstado] = useMutation(ACTUALIZAR_ESTADO_CANDIDATO);
  const [filtro, setFiltro] = useState("");

  if (loading) return <p>Cargando candidatos...</p>;
  if (error) return <p>Error al cargar candidatos: {error.message}</p>;

  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      await actualizarEstado({ variables: { id, estado: nuevoEstado } });
      window.location.reload();
    } catch (err) {
      console.error("Error al actualizar estado", err);
    }
  };

  return (
    <Container>
      <h2>Gestión de Candidatos</h2>
      <Form.Control
        type="text"
        placeholder="Buscar candidato..."
        onChange={(e) => setFiltro(e.target.value)}
      />
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Vacante</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.candidatos
            .filter((candidato) =>
              candidato.nombre.toLowerCase().includes(filtro.toLowerCase())
            )
            .map((candidato) => (
              <tr key={candidato.id}>
                <td>{candidato.nombre}</td>
                <td>{candidato.email}</td>
                <td>{candidato.vacante}</td>
                <td>{candidato.estado}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleEstadoChange(candidato.id, "Aprobado")}
                  >
                    Aprobar
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleEstadoChange(candidato.id, "Rechazado")}
                  >
                    Rechazar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GestionCandidatos;
