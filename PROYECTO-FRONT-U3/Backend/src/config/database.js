import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: false, // Desactivar logs de SQL en producción
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a PostgreSQL exitosamente.");
    await sequelize.sync(); // Sincronizar modelos
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

export { sequelize, connectDB };


