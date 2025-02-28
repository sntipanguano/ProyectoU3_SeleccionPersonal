import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_POSTULACIONES } from "../graphql/queries";
import { useSelector } from "react-redux";

const Postulaciones = () => {
  const user = useSelector((state) => state.auth.user);
  const { loading, error, data } = useQuery(GET_POSTULACIONES, {
    variables: { userId: user.id },
  });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (error) {
      console.error("Error al obtener postulaciones", error);
      setMensaje("Error al cargar postulaciones.");
    }
  }, [error]);

  if (loading) return <p>Cargando postulaciones...</p>;
  if (error) return <p>{mensaje}</p>;

  return (
    <Container>
      <h2 className="my-4">Mis Postulaciones</h2>
      {data.postulaciones.length === 0 ? (
        <p>No tienes postulaciones activas.</p>
      ) : (
        data.postulaciones.map((postulacion) => (
          <Card key={postulacion.id} className="mb-3">
            <Card.Body>
              <Card.Title>{postulacion.vacante.cargo}</Card.Title>
              <Card.Text>
                <strong>Estado:</strong> {postulacion.estado}
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Fecha de postulación:</strong> {new Date(postulacion.fecha).toLocaleDateString()}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Postulaciones;
