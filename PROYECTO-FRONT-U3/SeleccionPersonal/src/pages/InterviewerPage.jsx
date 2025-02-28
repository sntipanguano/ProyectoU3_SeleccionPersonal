import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Table, Button, Modal, Form } from "react-bootstrap";

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
      observaciones
    }
  }
`;

const ACTUALIZAR_ENTREVISTA = gql`
  mutation ActualizarEntrevista($id: ID!, $estado: String!, $observaciones: String) {
    actualizarEntrevista(id: $id, estado: $estado, observaciones: $observaciones) {
      id
      estado
      observaciones
    }
  }
`;

const InterviewerPage = () => {
  const { loading, error, data } = useQuery(GET_ENTREVISTAS);
  const [actualizarEntrevista] = useMutation(ACTUALIZAR_ENTREVISTA);
  const [showModal, setShowModal] = useState(false);
  const [selectedEntrevista, setSelectedEntrevista] = useState(null);
  const [observaciones, setObservaciones] = useState("");

  const handleShowModal = (entrevista) => {
    setSelectedEntrevista(entrevista);
    setObservaciones(entrevista.observaciones || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEntrevista(null);
  };

  const handleActualizarEntrevista = async () => {
    await actualizarEntrevista({
      variables: {
        id: selectedEntrevista.id,
        estado: "Completada",
        observaciones,
      },
    });
    handleCloseModal();
  };

  if (loading) return <p>Cargando entrevistas...</p>;
  if (error) return <p>Error al cargar entrevistas</p>;

  return (
    <div className="container mt-4">
      <h2>Gestión de Entrevistas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Candidato</th>
            <th>Email</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.entrevistas.map((entrevista) => (
            <tr key={entrevista.id}>
              <td>{entrevista.candidato.nombre}</td>
              <td>{entrevista.candidato.email}</td>
              <td>{entrevista.fecha}</td>
              <td>{entrevista.estado}</td>
              <td>
                {entrevista.estado === "Pendiente" && (
                  <Button variant="primary" onClick={() => handleShowModal(entrevista)}>
                    Evaluar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para evaluar entrevista */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Evaluar Entrevista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="success" onClick={handleActualizarEntrevista}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InterviewerPage;
