import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./Calculo.css";

const Calculo = () => {
  const [formData, setFormData] = useState({
    salario: "",
    diasTrabajados: "",
    vacacionesPendientes: "",
    prima: "",
    indemnizacion: "",
    userId: ""
  });

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Maneja el cambio de los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja la selección de un trabajador
  const handleUserChange = (e) => {
    const selectedUser = users.find(user => user.fullName === e.target.value);
    if (selectedUser) {
      setFormData({
        ...formData,
        salario: selectedUser.salary,
        userId: selectedUser.id
      });
    } else {
      setFormData({ ...formData, salario: "", userId: "" });
    }
  };

  // Trae los datos de los empleados desde el backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error al traer los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const calcularLiquidacion = async () => {
    const payload = {
      dayWorking: formData.diasTrabajados,
      remainingVacationDays: formData.vacacionesPendientes,
      compensation: formData.indemnizacion,
      bonus: formData.prima,
      userId: formData.userId
    };

    try {
      const response = await fetch("http://localhost:8080/api/liquidation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const result = await response.json();
      console.log("Resultado del cálculo:", result);
      // Redirigir a Resultado con los datos del cálculo
      navigate("/resultado", {
        state: {
          sueldoProporcional: result.salaryProportional,
          vacacionesProporcionales: result.vacationProportional,
          prima: result.bonus,
          indemnizacion: result.compensation,
          totalLiquidacion: result.liquidationProportional
        }
      });
    } catch (error) {
      console.error("Error al realizar el cálculo:", error);
      alert("Hubo un error al realizar el cálculo.");
    }
  };

  return (
    <>
      <Header />
      <section>
        <div className="tabla-centro">
          <form>
            <label htmlFor="trabajadores">Selecciona un trabajador:</label>
            <select id="trabajadores" name="trabajadores" onChange={handleUserChange}>
              <option value="">Seleccione un trabajador</option>
              {users.map((user) => (
                <option key={user.id} value={user.fullName}>
                  {user.fullName}
                </option>
              ))}
            </select>

            <label htmlFor="salario">Salario:</label>
            <input
              type="number"
              id="salario"
              name="salario"
              placeholder="Ingrese el salario"
              value={formData.salario}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="diasTrabajados">Días trabajados:</label>
            <input
              type="number"
              id="diasTrabajados"
              name="diasTrabajados"
              placeholder="Ingrese los días trabajados"
              value={formData.diasTrabajados}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="vacacionesPendientes">Vacaciones pendientes:</label>
            <input
              type="number"
              id="vacacionesPendientes"
              name="vacacionesPendientes"
              placeholder="Ingrese días de vacaciones pendientes"
              value={formData.vacacionesPendientes}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="prima">Prima:</label>
            <input
              type="number"
              id="prima"
              name="prima"
              step="0.01"
              placeholder="Ingrese la prima"
              value={formData.prima}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="indemnizacion">Indemnización:</label>
            <input
              type="number"
              id="indemnizacion"
              name="indemnizacion"
              step="0.01"
              placeholder="Ingrese la indemnización"
              value={formData.indemnizacion}
              onChange={handleInputChange}
              required
            />

            <button type="button" id="btnCalcular" onClick={calcularLiquidacion}>
              Calcular
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Calculo;
