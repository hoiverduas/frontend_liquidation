import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import './RegistrarNuevo.css';

const RegistrarNuevo = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
    phone: "",
    areaOfResponsibility: "",
    numIdentification: ""
  });

  const navigate = useNavigate(); // Hook para redireccionar
  const areas = ["MARKETING", "FINANCE", "OPERATIONS", "INSURANCE", "SALES", "IT"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      areaOfResponsibility: formData.areaOfResponsibility.toUpperCase()  // Enviar en mayúsculas
    };

    try {
      const response = await fetch("http://localhost:8080/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'El administrador ha sido registrado correctamente.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            navigate("/"); // Redirige a la página de inicio
          }
        });
        setFormData({ email: "", password: "", fullName: "", username: "", phone: "", areaOfResponsibility: "", numIdentification: "" }); // Reset form
      } else if (response.status === 400) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar lo administrador',
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar el administrador.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error("Error al registrar el administrador:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al conectar con el servidor.',
        icon: 'error'
      });
    }
  };

  return (
    <section>
      <div className="contenedorPrincipal">
        <div className="container">
          <h2>Registrar</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="fullName">Nombres y Apellidos</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="areaOfResponsibility">Cargo</label>
              <select
                id="areaOfResponsibility"
                name="areaOfResponsibility"
                value={formData.areaOfResponsibility}
                onChange={handleInputChange}
                required
                className="input"
              >
                <option value="" disabled>Seleccione cargo del empleado</option>
                {areas.map(area => (
                  <option key={area} value={area.toUpperCase()}>
                    {area.toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="numIdentification">Número de Identificación</label>
              <input
                type="text"
                id="numIdentification"
                name="numIdentification"
                value={formData.numIdentification}
                onChange={handleInputChange}
                required
                className="input"
              />
            </div>

            <button type="submit" className="btn-register">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrarNuevo;

