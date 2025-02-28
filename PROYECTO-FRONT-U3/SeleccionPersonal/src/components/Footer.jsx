import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3" style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <Container>
        <p>&copy; {new Date().getFullYear()} Selección de Personal. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
};

export default Footer;