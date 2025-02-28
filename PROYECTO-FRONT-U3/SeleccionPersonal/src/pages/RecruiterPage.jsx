import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Container, Card, Button, Modal, Form, Table } from "react-bootstrap";

// Consultas GraphQL
const GET_VACANTES = gql`
  query GetVacantes {
    vacantes {
      id
      titulo
      descripcion
      estado
    }
  }
`;

const GET_POSTULACIONES = gql`
  query GetPostulaciones {
    postulaciones {
      id
      candidato {
        nombre
        email
      }
      vacante {
        titulo
      }
      estado
    }
  }
`;

const PROGRAMAR_ENTREVISTA = gql`
  mutation ProgramarEntrevista($postulacionId: ID!, $fecha: String!) {
    programarEntrevista(postulacionId: $postulacionId, fecha: $fecha) {
      id
      fecha
      estado
    }
  }
`;

const RecruiterPage = () => {
  const { data: vacantesData, loading: vacantesLoading } = useQuery(GET_VACANTES);
  const { data: postulacionesData, loading: postulacionesLoading } = useQuery(GET_POSTULACIONES);
  const [programarEntrevista] = useMutation(PROGRAMAR_ENTREVISTA);

  const [showModal, setShowModal] = useState(false);
  const [selectedPostulacion, setSelectedPostulacion] = useState(null);
  const [fechaEntrevista, setFechaEntrevista] = useState("");

  const handleProgramarEntrevista = async () => {
    await programarEntrevista({
      variables: { postulacionId: selectedPostulacion.id, fecha: fechaEntrevista },
    });
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h2>👔 Gestión de Vacantes y Postulaciones</h2>

      {/* 📌 Lista de Vacantes */}
      <Card className="mt-3">
        <Card.Header>📄 Vacantes Publicadas</Card.Header>
        <Card.Body>
          {vacantesLoading ? (
            <p>Cargando vacantes...</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {vacantesData.vacantes.map((vacante, index) => (
                  <tr key={vacante.id}>
                    <td>{index + 1}</td>
                    <td>{vacante.titulo}</td>
                    <td>{vacante.descripcion}</td>
                    <td>{vacante.estado}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* 📌 Lista de Postulaciones */}
      <Card className="mt-3">
        <Card.Header>📑 Postulaciones Recibidas</Card.Header>
        <Card.Body>
          {postulacionesLoading ? (
            <p>Cargando postulaciones...</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Candidato</th>
                  <th>Correo</th>
                  <th>Vacante</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {postulacionesData.postulaciones.map((postulacion, index) => (
                  <tr key={postulacion.id}>
                    <td>{index + 1}</td>
                    <td>{postulacion.candidato.nombre}</td>
                    <td>{postulacion.candidato.email}</td>
                    <td>{postulacion.vacante.titulo}</td>
                    <td>{postulacion.estado}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setSelectedPostulacion(postulacion);
                          setShowModal(true);
                        }}
                      >
                        📅 Programar Entrevista
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* 📌 Modal para Programar Entrevista */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>📅 Programar Entrevista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="fechaEntrevista">
              <Form.Label>Seleccionar Fecha</Form.Label>
              <Form.Control
                type="date"
                value={fechaEntrevista}
                onChange={(e) => setFechaEntrevista(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleProgramarEntrevista}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RecruiterPage;
