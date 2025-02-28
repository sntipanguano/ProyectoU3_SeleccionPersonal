import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { Container, Card, Button, ListGroup } from "react-bootstrap";

const GET_VACANTES = gql`
  query GetVacantes {
    vacantes {
      id
      titulo
      descripcion
      ubicacion
      estado
    }
  }
`;

const POSTULAR_VACANTE = gql`
  mutation PostularVacante($vacanteId: ID!) {
    postularVacante(vacanteId: $vacanteId) {
      id
      estado
    }
  }
`;

const GET_POSTULACIONES = gql`
  query GetPostulaciones {
    postulaciones {
      id
      vacante {
        titulo
      }
      estado
    }
  }
`;

const CandidatePage = () => {
  const { user } = useSelector((state) => state.auth);
  const { loading, error, data } = useQuery(GET_VACANTES);
  const { loading: loadingPost, data: postulacionesData } = useQuery(GET_POSTULACIONES);
  const [postular] = useMutation(POSTULAR_VACANTE, {
    refetchQueries: [{ query: GET_POSTULACIONES }],
  });

  if (!user || user.role !== "Candidate") {
    return <p>No tienes acceso a esta sección.</p>;
  }

  if (loading || loadingPost) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar las vacantes.</p>;

  return (
    <Container>
      <h2>Vacantes Disponibles</h2>
      <ListGroup>
        {data.vacantes.map((vacante) => (
          <Card key={vacante.id} className="mb-3">
            <Card.Body>
              <Card.Title>{vacante.titulo}</Card.Title>
              <Card.Text>{vacante.descripcion}</Card.Text>
              <Card.Text>Ubicación: {vacante.ubicacion}</Card.Text>
              <Button onClick={() => postular({ variables: { vacanteId: vacante.id } })}>
                Postularse
              </Button>
            </Card.Body>
          </Card>
        ))}
      </ListGroup>

      <h2 className="mt-4">Mis Postulaciones</h2>
      <ListGroup>
        {postulacionesData.postulaciones.map((postulacion) => (
          <ListGroup.Item key={postulacion.id}>
            {postulacion.vacante.titulo} - Estado: {postulacion.estado}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default CandidatePage;
