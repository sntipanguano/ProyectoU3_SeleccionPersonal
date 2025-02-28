import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import API_BASE_URL from "../config.js"; // Asegúrate de que config.js existe

// Configurar enlace HTTP para GraphQL
const httpLink = createHttpLink({
  uri: API_BASE_URL, // URL del backend GraphQL
});

// Middleware para añadir el token de autorización a las solicitudes
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Configurar Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client; // Exportar como default

