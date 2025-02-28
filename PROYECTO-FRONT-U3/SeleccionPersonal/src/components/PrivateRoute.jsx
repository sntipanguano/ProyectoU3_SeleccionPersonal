import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  // Monitorea cambios en el localStorage para actualizar estados
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setUserRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no está autorizado, redirigir a página de acceso denegado
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Si todo está correcto, renderizar el contenido protegido
  return children;
};

export default PrivateRoute;





