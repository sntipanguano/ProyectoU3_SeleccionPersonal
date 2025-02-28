import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Container, Form, Button, Table, Alert } from "react-bootstrap";

// Consulta de requisiciones existentes
const GET_REQUISICIONES = gql`
  query GetRequisiciones {
    requisiciones {
      id
      cargo
      descripcion
      categoriaSalarial
      estado
    }
  }
`;

// Mutación para crear una nueva requisición
const CREAR_REQUISICION = gql`
  mutation CrearRequisicion($cargo: String!, $descripcion: String!, $categoriaSalarial: String!) {
    crearRequisicion(cargo: $cargo, descripcion: $descripcion, categoriaSalarial: $categoriaSalarial) {
      id
      cargo
      estado
    }
  }
`;

const RequisicionPersonal = () => {
  const { loading, error, data, refetch } = useQuery(GET_REQUISICIONES);
  const [crearRequisicion] = useMutation(CREAR_REQUISICION);

  const [formData, setFormData] = useState({ cargo: "", descripcion: "", categoriaSalarial: "" });
  const [successMessage, setSuccessMessage] = useState("");

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearRequisicion({ variables: formData });
      setSuccessMessage("Requisición creada exitosamente.");
      setFormData({ cargo: "", descripcion: "", categoriaSalarial: "" });
      refetch(); // Recargar la lista de requisiciones
    } catch (error) {
      console.error("Error al crear requisición", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>📋 Requisición de Personal</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="cargo">
          <Form.Label>Cargo</Form.Label>
          <Form.Control
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="descripcion" className="mt-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="categoriaSalarial" className="mt-3">
          <Form.Label>Categoría Salarial</Form.Label>
          <Form.Control
            type="text"
            name="categoriaSalarial"
            value={formData.categoriaSalarial}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Enviar Solicitud
        </Button>
      </Form>

      <h3 className="mt-5">📑 Requisiciones Existentes</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al cargar requisiciones</p>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cargo</th>
              <th>Descripción</th>
              <th>Categoría Salarial</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.requisiciones.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.cargo}</td>
                <td>{req.descripcion}</td>
                <td>{req.categoriaSalarial}</td>
                <td>{req.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default RequisicionPersonal;
