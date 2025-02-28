import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice.jsx";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      role
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_MUTATION);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: formData });

      if (data?.login?.token) {
        dispatch(loginUser({ token: data.login.token, role: data.login.role }));
        navigate("/"); // Redirigir al inicio o al Dashboard según el rol
      }
    } catch (error) {
      console.error("Error en el login:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Iniciar Sesión</h2>
      {error && <p className="text-danger">Credenciales incorrectas</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">¿No tienes cuenta? <a href="/register">Regístrate</a></p>
    </div>
  );
};

export default Login;

