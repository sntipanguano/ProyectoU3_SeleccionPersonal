import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import typeDefs from "./src/infrastructure/graphql/schema.js";
import resolvers from "./src/infrastructure/graphql/resolvers.js";
import { connectDB } from "./src/config/database.js";
import authenticate from "./src/presentation/apiGateway.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = authenticate(req);
    return { user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(process.env.PORT || 4000, () =>
    console.log(`🚀 Servidor corriendo en http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
