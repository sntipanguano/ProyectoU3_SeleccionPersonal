import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

// 🔹 Mutación GraphQL para el Registro
const REGISTER_MUTATION = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      role
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
  const [successMessage, setSuccessMessage] = useState("");

  // 🔹 Manejo de cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: formData });
      setSuccessMessage("Registro exitoso. Redirigiendo a Iniciar Sesión...");
      setTimeout(() => {
        navigate("/login"); // 🔹 Redirigir a la página de inicio de sesión
      }, 2000);
    } catch (error) {
      console.error("Error en el registro", error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="mx-auto" style={{ maxWidth: "400px", padding: "20px" }}>
        <h3 className="text-center">📝 Registro</h3>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {error && <Alert variant="danger">Error en el registro: {error.message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </Form>

        <p className="text-center mt-3">
          ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </Card>
    </Container>
  );
};

export default Register;

