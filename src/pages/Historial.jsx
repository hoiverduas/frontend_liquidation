import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const Historial = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error al traer los empleados:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <section>
      <Header />
      <h1>Historial de Liquidaciones</h1>
      <table>
        <thead>
          <tr>
            <th>Fecha de liquidación</th>
            <th>Nombres y Apellidos</th>
            <th>Cargo</th>
            <th>Liquidación</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            employee.liquidationDTOS.map(liquidation => (
              <tr key={liquidation.id}>
                <td>{new Date(liquidation.dateLiquidation).toLocaleDateString()}</td>
                <td>{employee.fullName}</td>
                <td>{employee.cargo}</td>
                <td>${liquidation.liquidationProportional.toLocaleString()}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Historial;
