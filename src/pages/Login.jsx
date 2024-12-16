import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const [getUsername, setUsername] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getUsers, setUsers] = useState([]);
  let redireccion = useNavigate();

  async function iniciarSesion() {
    try {
      // Imprimir valores antes de enviarlos al backend
      console.log("Datos enviados al backend:");
      console.log("Username:", getUsername);
      console.log("Password:", getPassword);

      const response = await fetch("http://localhost:8080/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: getUsername,
          password: getPassword,
        }),
      });

      if (response.ok) {
        console.log("Respuesta del servidor: Login exitoso");
        Swal.fire({
          title: "¡Inicio de sesión exitoso!",
          text: "Redirigiendo...",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            redireccion("/home");
          },
        });
      } else {
        console.log("Respuesta del servidor: Error en las credenciales");
        Swal.fire({
          title: "Error",
          text: "Credenciales inválidas",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al conectar con el servidor",
        icon: "error",
      });
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <img
          src="/imagenes/iconoSura-removebg-preview.png"
          alt="Logo Sura"
          className="logo"
        />
        <h1 className="title">Iniciar Sesión</h1>
        <input
          type="text"
          className="input"
          placeholder="Usuario o Correo"
          value={getUsername}
          onChange={(e) => {
            setUsername(e.target.value);
            console.log("Username actualizado:", e.target.value); // Log para verificar cambios
          }}
        />
        <input
          type="password"
          className="input"
          placeholder="Contraseña"
          value={getPassword}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log("Password actualizado:", e.target.value); // Log para verificar cambios
          }}
        />
        <button id="btnIniciar" className="btn" onClick={iniciarSesion}>
          Ingresar
        </button>
        <button className="btn">
          <Link to="/registrarNuevo" className="btn">
            <b>Registrar</b>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
