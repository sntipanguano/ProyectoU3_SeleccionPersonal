import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Table, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const GET_USERS = gql`
  query ObtenerUsuarios {
    obtenerUsuarios {
      id
      email
      role
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`;

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  useEffect(() => {
    if (!user || user.role !== "Admin") {
      navigate("/unauthorized");
    }
  }, [user, navigate]);

  const handleDelete = async (id) => {
    try {
      await deleteUser({ variables: { id } });
      refetch(); // Refrescar datos después de eliminar
    } catch (error) {
      console.error("Error eliminando usuario", error);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar usuarios</p>;

  return (
    <Container>
      <h2>Panel de Administración</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.obtenerUsuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.email}</td>
              <td>{usuario.role}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(usuario.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPage;
