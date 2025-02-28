import React, { useEffect, useState } from "react";
import { Container, Card, Button, ListGroup } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { GET_VACANTES, POSTULAR_VACANTE } from "../graphql/queries";
import { useSelector } from "react-redux";

const Vacantes = () => {
  const { loading, error, data } = useQuery(GET_VACANTES);
  const [postular] = useMutation(POSTULAR_VACANTE);
  const user = useSelector((state) => state.auth.user);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (error) {
      console.error("Error al obtener vacantes", error);
    }
  }, [error]);

  const handlePostular = async (vacanteId) => {
    try {
      const response = await postular({
        variables: { vacanteId, userId: user.id },
      });
      setMensaje("Postulación exitosa!");
    } catch (error) {
      console.error("Error al postular", error);
      setMensaje("Error al postular, intenta nuevamente.");
    }
  };

  if (loading) return <p>Cargando vacantes...</p>;
  if (error) return <p>Error al cargar vacantes</p>;

  return (
    <Container>
      <h2 className="my-4">Vacantes Disponibles</h2>
      {mensaje && <p className="alert alert-info">{mensaje}</p>}
      {data.vacantes.length === 0 ? (
        <p>No hay vacantes disponibles.</p>
      ) : (
        data.vacantes.map((vacante) => (
          <Card key={vacante.id} className="mb-3">
            <Card.Body>
              <Card.Title>{vacante.cargo}</Card.Title>
              <Card.Text>{vacante.descripcion}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item><strong>Salario:</strong> {vacante.salario}</ListGroup.Item>
                <ListGroup.Item><strong>Ubicación:</strong> {vacante.ubicacion}</ListGroup.Item>
              </ListGroup>
              {user && user.role === "Candidate" && (
                <Button onClick={() => handlePostular(vacante.id)} className="mt-2">Postular</Button>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Vacantes;