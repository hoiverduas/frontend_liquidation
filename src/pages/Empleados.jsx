import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Swal from 'sweetalert2';
import './Empleados.css';

const Empleados = () => {
  const [employees, setEmployees] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error al traer los empleados:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
            method: "DELETE"
          });
          if (response.ok) {
            Swal.fire(
              'Eliminado',
              'El empleado ha sido eliminado',
              'success'
            );
            fetchEmployees(); // Actualiza la lista de empleados
          } else {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el empleado',
              'error'
            );
          }
        } catch (error) {
          console.error("Error al eliminar empleado:", error);
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar el empleado',
            'error'
          );
        }
      }
    });
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setEditModalVisible(true);
  };

  const handleModalClose = () => {
    setEditModalVisible(false);
    setSelectedEmployee(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee({ ...selectedEmployee, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employees", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(selectedEmployee)
      });
      if (response.ok) {
        Swal.fire({
          title: 'Guardado',
          text: "El empleado ha sido editado con éxito",
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        fetchEmployees(); // Actualiza la lista de empleados
        setEditModalVisible(false);
      } else {
        Swal.fire(
          'Error',
          'Hubo un problema al editar el empleado',
          'error'
        );
      }
    } catch (error) {
      console.error("Error al editar el empleado:", error);
      Swal.fire(
        'Error',
        'Hubo un problema al editar el empleado',
        'error'
      );
    }
  };

  return (
    <div>
      <Header />
      <h1 className="smokemonster">Empleados de Suramericana</h1>
      <table>
        <thead>
          <tr>
            <th>Nombres y Apellidos</th>
            <th>Cargo</th>
            <th>Salario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.fullName}</td>
              <td>{employee.cargo}</td>
              <td>{employee.salary}</td>
              <td>
                <button className='editar' onClick={() => handleEdit(employee)}>Editar</button>
                <button className='eliminar' onClick={() => handleDelete(employee.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editModalVisible && selectedEmployee && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Editar Empleado</h2>
            <form>
              <label htmlFor="fullName">Nombre Completo:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={selectedEmployee.fullName}
                onChange={handleInputChange}
                className="input"
              />

              <label htmlFor="phone">Teléfono:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={selectedEmployee.phone}
                onChange={handleInputChange}
                className="input"
              />

              <label htmlFor="cargo">Cargo:</label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                value={selectedEmployee.cargo}
                onChange={handleInputChange}
                className="input"
              />

              <label htmlFor="salary">Salario:</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={selectedEmployee.salary}
                onChange={handleInputChange}
                className="input"
              />

              <button type="button" onClick={handleSave} className="btn-save">Guardar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;
