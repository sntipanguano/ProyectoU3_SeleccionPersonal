import { gql } from "apollo-server-express";

const typeDefs = gql`
  type AuthPayload {
    token: String!
    role: String! 
  }

  type User {
    id: ID!
    email: String!
    role: String!
  }

  type Query {
    obtenerUsuarios: [User]
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload  # Cambiamos a AuthPayload
    register(email: String!, password: String!): AuthPayload
  }
`;

export default typeDefs;


