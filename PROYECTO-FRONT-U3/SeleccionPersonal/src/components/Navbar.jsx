import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../store/authSlice.jsx";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Obtener el usuario desde Redux

  const handleLogout = () => {
    dispatch(logoutUser()); // Cerrar sesión en Redux
    navigate("/"); // Redirigir al inicio después de cerrar sesión
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Selección de Personal</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Admin: Puede acceder a toda la gestión del sistema */}
            {user?.role === "Admin" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/admin">Admin Panel</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/gestion-candidatos">Gestión de Candidatos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/requisicion-personal">Requisiciones de Personal</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/seleccion-contratacion">Selección y Contratación</Link></li>
              </>
            )}
            {/* Recruiter: Publicar vacantes, gestionar entrevistas y evaluar candidatos */}
            {user?.role === "Recruiter" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/publicacion-vacantes">Publicar Vacantes</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/evaluacion-candidatos">Evaluar Candidatos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/entrevistas">Gestionar Entrevistas</Link></li>
              </>
            )}
            {/* Hiring Manager: Solo acceso a la selección y contratación final */}
            {user?.role === "HiringManager" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/seleccion-contratacion">Selección y Contratación</Link></li>
              </>
            )}
            {/* Interviewer: Acceso solo a entrevistas */}
            {user?.role === "Interviewer" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/entrevistas">Entrevistas</Link></li>
              </>
            )}
            {/* Candidate: Solo puede ver vacantes y sus postulaciones */}
            {user?.role === "Candidate" && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/vacantes">Vacantes Disponibles</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/postulaciones">Mis Postulaciones</Link></li>
              </>
            )}
          </ul>

          <div className="d-flex">
            {user ? (
              <>
                <span className="navbar-text text-light me-3">Rol: {user.role}</span>
                <button className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary">Iniciar Sesión</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;





