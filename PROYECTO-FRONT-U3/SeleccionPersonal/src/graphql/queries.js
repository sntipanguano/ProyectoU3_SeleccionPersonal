import { gql } from "@apollo/client";

export const GET_VACANTES = gql`
  query GetVacantes {
    vacantes {
      id
      cargo
      descripcion
      salario
      ubicacion
    }
  }
`;

export const POSTULAR_VACANTE = gql`
  mutation PostularVacante($vacanteId: ID!, $userId: ID!) {
    postularVacante(vacanteId: $vacanteId, userId: $userId) {
      id
      estado
    }
  }
`;


export const GET_POSTULACIONES = gql`
  query GetPostulaciones($userId: ID!) {
    postulaciones(userId: $userId) {
      id
      estado
      fecha
      vacante {
        id
        cargo
      }
    }
  }
`;
