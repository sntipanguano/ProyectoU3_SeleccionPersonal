import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Container, Table, Button, Form } from "react-bootstrap";

const GET_CANDIDATOS_EVALUACION = gql`
  query GetCandidatosEvaluacion {
    candidatosPendientesEvaluacion {
      id
      nombre
      email
      estado
      vacante
    }
  }
`;

const REGISTRAR_EVALUACION = gql`
  mutation RegistrarEvaluacion($id: ID!, $puntaje: Int!, $comentarios: String!) {
    registrarEvaluacion(id: $id, puntaje: $puntaje, comentarios: $comentarios) {
      id
      estado
    }
  }
`;

const EvaluacionCandidatos = () => {
  const { loading, error, data } = useQuery(GET_CANDIDATOS_EVALUACION);
  const [registrarEvaluacion] = useMutation(REGISTRAR_EVALUACION);
  const [evaluacion, setEvaluacion] = useState({});

  if (loading) return <p>Cargando candidatos...</p>;
  if (error) return <p>Error al cargar candidatos</p>;

  const handleInputChange = (e, id) => {
    setEvaluacion({ ...evaluacion, [id]: { ...evaluacion[id], [e.target.name]: e.target.value } });
  };

  const handleSubmit = async (id) => {
    const { puntaje, comentarios } = evaluacion[id] || {};
    if (!puntaje || !comentarios) return;
    await registrarEvaluacion({ variables: { id, puntaje: parseInt(puntaje), comentarios } });
    alert("Evaluación registrada correctamente");
  };

  return (
    <Container>
      <h2>Evaluación de Candidatos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Vacante</th>
            <th>Puntaje</th>
            <th>Comentarios</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.candidatosPendientesEvaluacion.map((candidato) => (
            <tr key={candidato.id}>
              <td>{candidato.id}</td>
              <td>{candidato.nombre}</td>
              <td>{candidato.email}</td>
              <td>{candidato.vacante}</td>
              <td>
                <Form.Control
                  type="number"
                  name="puntaje"
                  min="0"
                  max="100"
                  onChange={(e) => handleInputChange(e, candidato.id)}
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="comentarios"
                  onChange={(e) => handleInputChange(e, candidato.id)}
                />
              </td>
              <td>
                <Button variant="success" onClick={() => handleSubmit(candidato.id)}>
                  Guardar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EvaluacionCandidatos;