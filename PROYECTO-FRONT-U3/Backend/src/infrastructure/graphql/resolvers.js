import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository.js";

const SECRET_KEY = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    obtenerUsuarios: async (_, __, { user }) => {
      if (!user || user.role !== "Admin") throw new Error("No autorizado");
      return await UserRepository.getAllUsers();
    },
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserRepository.createUser(email, hashedPassword, "Candidate");

      const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET_KEY, { expiresIn: "1h" });

      return { token, role: newUser.role };  // Ahora devuelve AuthPayload correctamente
    },
    login: async (_, { email, password }) => {
      const user = await UserRepository.getUserByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Credenciales inválidas");
      }

      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

      return { token, role: user.role };  // Ahora devuelve AuthPayload correctamente
    },
  },
};

export default resolvers;




