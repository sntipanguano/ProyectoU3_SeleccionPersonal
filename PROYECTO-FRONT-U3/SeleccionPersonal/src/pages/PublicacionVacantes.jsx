import React from "react";
import { Container, Card, Button } from "react-bootstrap";

const PublicacionVacantes = () => {
  return (
    <Container className="mt-4">
      <h1>Publicación de Vacantes</h1>
      <p>Administra y publica vacantes en la intranet y portales externos.</p>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Vacante: Desarrollador Frontend</Card.Title>
          <Card.Text>
            Requisitos: Experiencia en React, JavaScript, y Bootstrap.
          </Card.Text>
          <Button variant="primary">Publicar Vacante</Button>
        </Card.Body>
      </Card>

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Vacante: Ingeniero DevOps</Card.Title>
          <Card.Text>
            Requisitos: Experiencia en CI/CD, Docker, Kubernetes.
          </Card.Text>
          <Button variant="primary">Publicar Vacante</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PublicacionVacantes;
