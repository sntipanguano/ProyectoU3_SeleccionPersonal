import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Container, Table, Button, Modal } from "react-bootstrap";

// Consulta para obtener candidatos evaluados
const GET_CANDIDATOS_EVALUADOS = gql`
  query GetCandidatosEvaluados {
    candidatosEvaluados {
      id
      nombre
      email
      puntajeTotal
      comentarios
    }
  }
`;

// Mutación para seleccionar un candidato
const SELECCIONAR_CANDIDATO = gql`
  mutation SeleccionarCandidato($id: ID!) {
    seleccionarCandidato(id: $id) {
      id
      nombre
      estado
    }
  }
`;

const HiringManagerPage = () => {
  const { loading, error, data } = useQuery(GET_CANDIDATOS_EVALUADOS);
  const [seleccionarCandidato] = useMutation(SELECCIONAR_CANDIDATO);
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidato, setSelectedCandidato] = useState(null);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los candidatos</p>;

  const handleSeleccion = async (id) => {
    try {
      await seleccionarCandidato({ variables: { id } });
      alert("Candidato seleccionado con éxito");
    } catch (error) {
      alert("Error al seleccionar candidato");
    }
  };

  return (
    <Container>
      <h2>Gestión de Selección de Candidatos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Puntaje Total</th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.candidatosEvaluados.map((candidato) => (
            <tr key={candidato.id}>
              <td>{candidato.nombre}</td>
              <td>{candidato.email}</td>
              <td>{candidato.puntajeTotal}</td>
              <td>{candidato.comentarios}</td>
              <td>
                <Button 
                  variant="success" 
                  onClick={() => handleSeleccion(candidato.id)}
                >
                  Seleccionar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HiringManagerPage;
