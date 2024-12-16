import React, { useState } from "react";
import Header from "../components/Header";
import Swal from "sweetalert2";
import './Registro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    cargo: "",
    salario: "",
    numIdentification: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.nombre,
      phone: formData.telefono,
      cargo: formData.cargo,
      salary: parseFloat(formData.salario),
      numIdentification: formData.numIdentification
    };

    try {
      const response = await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        Swal.fire({
          title: '¡Registro Exitoso!',
          text: 'El empleado ha sido registrado correctamente.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        setFormData({ nombre: "", telefono: "", cargo: "", salario: "", numIdentification: "" }); // Reset form
      } else if (response.status === 400) {
        Swal.fire({
          title: 'Error',
          text: 'El empleado con esta identificación ya existe.',
          icon: 'error'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar el empleado.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error("Error al registrar el empleado:", error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al conectar con el servidor.',
        icon: 'error'
      });
    }
  };

  return (
    <section>
      <Header />
      <div className="contenedorPrincipal">
        <div className="container">
          <h2>Registrar nuevo Empleado</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombres y Apellidos</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="telefono">Teléfono</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cargo">Cargo</label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="salario">Salario</label>
              <input
                type="number"
                id="salario"
                name="salario"
                value={formData.salario}
                onChange={handleInputChange}
                required
              />
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

export default Registro;

