import User from "../../domain/entities/User.js";

const UserRepository = {
  createUser: async (email, password, role) => {
    return await User.create({ email, password, role });
  },

  getUserByEmail: async (email) => {
    return await User.findOne({
      where: { email },
      attributes: ["id", "email", "password", "role"],
    });
  },

  getAllUsers: async () => {
    return await User.findAll({
      attributes: ["id", "email", "role"],
    });
  },
};

export default UserRepository;
