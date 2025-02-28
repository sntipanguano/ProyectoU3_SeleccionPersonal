import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("Admin", "Recruiter", "HiringManager", "Interviewer", "Candidate"),
    defaultValue: "Candidate",
  },
});

export default User;
