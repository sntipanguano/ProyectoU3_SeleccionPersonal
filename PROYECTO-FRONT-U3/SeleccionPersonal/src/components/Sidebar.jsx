import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const Sidebar = ({ isOpen }) => {
  return (
    <div
      className={`d-flex flex-column p-3 bg-light ${isOpen ? "" : "d-none"}`}
      style={{ width: "250px", height: "100vh", position: "fixed", boxShadow: "2px 0px 5px rgba(0,0,0,0.1)" }}>
      <h4 className="text-center mb-3">Menú</h4>
      <ListGroup variant="flush">
        <ListGroup.Item className="border-0 py-2">
          <Link to="/" className="text-decoration-none text-dark fw-bold">🏠 Inicio</Link>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 py-2">
          <Link to="/requisicion-personal" className="text-decoration-none text-dark">📄 Requisición de Personal</Link>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 py-2">
          <Link to="/publicacion-vacantes" className="text-decoration-none text-dark">📢 Publicación de Vacantes</Link>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 py-2">
          <Link to="/gestion-candidatos" className="text-decoration-none text-dark">👥 Gestión de Candidatos</Link>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 py-2">
          <Link to="/evaluacion-candidatos" className="text-decoration-none text-dark">📝 Evaluación de Candidatos</Link>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 py-2">
          <Link to="/entrevistas" className="text-decoration-none text-dark">📅 Entrevistas</Link>
        </ListGroup.Item>
        <ListGroup.Item className="border-0 py-2">
          <Link to="/seleccion-contratacion" className="text-decoration-none text-dark">✅ Selección y Contratación</Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;

