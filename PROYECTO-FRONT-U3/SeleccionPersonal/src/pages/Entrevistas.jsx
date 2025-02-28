import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { Container, Card, Button, ListGroup, Form } from "react-bootstrap";

const GET_ENTREVISTAS = gql`
  query GetEntrevistas {
    entrevistas {
      id
      candidato {
        nombre
        email
      }
      fecha
      estado
      evaluacion
    }
  }
`;

const EVALUAR_ENTREVISTA = gql`
  mutation EvaluarEntrevista($id: ID!, $evaluacion: String!) {
    evaluarEntrevista(id: $id, evaluacion: $evaluacion) {
      id
      evaluacion
      estado
    }
  }
`;

const Entrevistas = () => {
  const { user } = useSelector((state) => state.auth);
  const { loading, error, data } = useQuery(GET_ENTREVISTAS);
  const [evaluarEntrevista] = useMutation(EVALUAR_ENTREVISTA);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [evaluationText, setEvaluationText] = useState("");

  if (!user || user.role !== "Interviewer") {
    return <p>Acceso denegado. Solo los entrevistadores pueden ver esta página.</p>;
  }

  if (loading) return <p>Cargando entrevistas...</p>;
  if (error) return <p>Error al cargar las entrevistas</p>;

  const handleEvaluate = async (id) => {
    try {
      await evaluarEntrevista({ variables: { id, evaluacion: evaluationText } });
      alert("Evaluación enviada correctamente");
      setSelectedInterview(null);
      setEvaluationText("");
    } catch (error) {
      console.error("Error al evaluar entrevista", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Gestión de Entrevistas</h2>
      <ListGroup>
        {data.entrevistas.map((entrevista) => (
          <Card key={entrevista.id} className="mb-3">
            <Card.Body>
              <Card.Title>Candidato: {entrevista.candidato.nombre}</Card.Title>
              <Card.Text>Email: {entrevista.candidato.email}</Card.Text>
              <Card.Text>Fecha: {new Date(entrevista.fecha).toLocaleString()}</Card.Text>
              <Card.Text>Estado: {entrevista.estado}</Card.Text>
              {entrevista.estado === "Pendiente" && (
                <Button onClick={() => setSelectedInterview(entrevista.id)}>
                  Evaluar
                </Button>
              )}
              {entrevista.evaluacion && (
                <Card.Text>Evaluación: {entrevista.evaluacion}</Card.Text>
              )}
            </Card.Body>
          </Card>
        ))}
      </ListGroup>

      {selectedInterview && (
        <div className="mt-3">
          <h4>Registrar Evaluación</h4>
          <Form>
            <Form.Group>
              <Form.Label>Comentarios:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={evaluationText}
                onChange={(e) => setEvaluationText(e.target.value)}
              />
            </Form.Group>
            <Button onClick={() => handleEvaluate(selectedInterview)} className="mt-2">
              Enviar Evaluación
            </Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default Entrevistas;