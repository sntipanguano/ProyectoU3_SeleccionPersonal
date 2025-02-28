const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/UserRepository");

class AuthUseCase {
  async login(email, password) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Contraseña incorrecta");
    }

    // Generar Token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, user };
  }
}

module.exports = new AuthUseCase();
