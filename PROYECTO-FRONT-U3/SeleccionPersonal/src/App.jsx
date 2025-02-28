import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { Container } from "react-bootstrap";
import { store } from "./store/store.jsx";
import client from "./graphql/apolloClient.jsx"; 
import NavigationBar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import RecruiterPage from "./pages/RecruiterPage.jsx";
import HiringManagerPage from "./pages/HiringManagerPage.jsx";
import InterviewerPage from "./pages/InterviewerPage.jsx";
import CandidatePage from "./pages/CandidatePage.jsx";
import Vacantes from "./pages/Vacantes.jsx";
import Postulacion from "./pages/Postulaciones.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PublicacionVacantes from "./pages/PublicacionVacantes.jsx";
import RequisicionPersonal from "./pages/RequisicionPersonal.jsx";
import GestionCandidatos from "./pages/GestionCandidatos.jsx";
import EvaluacionCandidatos from "./pages/EvaluacionCandidatos.jsx";
import Entrevistas from "./pages/Entrevistas.jsx";
import SeleccionContratacion from "./pages/SeleccionContratacion.jsx";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <NavigationBar />
          <div className="d-flex">
            <Sidebar />
            <Container className="mt-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* 🔹 Rutas para Admin */}
                <Route path="/admin" element={<PrivateRoute roles={["Admin"]}><AdminPage /></PrivateRoute>} />
                <Route path="/requisicion-personal" element={<PrivateRoute roles={["Admin", "Recruiter"]}><RequisicionPersonal /></PrivateRoute>} />
                <Route path="/publicacion-vacantes" element={<PrivateRoute roles={["Admin", "Recruiter"]}><PublicacionVacantes /></PrivateRoute>} />
                <Route path="/gestion-candidatos" element={<PrivateRoute roles={["Admin", "Recruiter"]}><GestionCandidatos /></PrivateRoute>} />
                <Route path="/seleccion-contratacion" element={<PrivateRoute roles={["Admin", "Recruiter", "HiringManager"]}><SeleccionContratacion /></PrivateRoute>} />

                {/* 🔹 Rutas para Recruiter */}
                <Route path="/recruiter" element={<PrivateRoute roles={["Recruiter"]}><RecruiterPage /></PrivateRoute>} />

                {/* 🔹 Rutas para Hiring Manager */}
                <Route path="/hiring-manager" element={<PrivateRoute roles={["HiringManager"]}><HiringManagerPage /></PrivateRoute>} />

                {/* 🔹 Rutas para Interviewer */}
                <Route path="/interviewer" element={<PrivateRoute roles={["Interviewer"]}><InterviewerPage /></PrivateRoute>} />
                <Route path="/evaluacion-candidatos" element={<PrivateRoute roles={["Admin", "Recruiter", "Interviewer"]}><EvaluacionCandidatos /></PrivateRoute>} />
                <Route path="/entrevistas" element={<PrivateRoute roles={["Admin", "Recruiter", "Interviewer"]}><Entrevistas /></PrivateRoute>} />

                {/* 🔹 Rutas para Candidate */}
                <Route path="/candidate" element={<PrivateRoute roles={["Candidate"]}><CandidatePage /></PrivateRoute>} />
                <Route path="/vacantes" element={<PrivateRoute roles={["Candidate"]}><Vacantes /></PrivateRoute>} />
                <Route path="/postulacion" element={<PrivateRoute roles={["Candidate"]}><Postulacion /></PrivateRoute>} />
              </Routes>
            </Container>
          </div>
          <Footer />
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
