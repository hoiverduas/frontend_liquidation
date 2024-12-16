import { Link } from "react-router-dom"; //debe de ser el Link con la L mayuscula//
import './Header.css'
const Header = () => {
    return(
      <header className="cabecera">
      <div className="logo">
        <img src="/imagenes/logoConTrigre.png" alt="Logo" />
      </div>
      <nav className="menu">
        <ul>
          <li className="linkBarra">
            <Link to="/home">
              <b>Home</b>
            </Link>
          </li>
          <li>
            <Link to="/calculo">
              <b>Liquidación</b>
            </Link>
          </li>
          <li>
            <Link to="/registro">
              <b>Registro</b>
            </Link>
          </li>
          <li>
            <Link to="/historial">
              <b>Historial</b>
            </Link>
          </li>
          <li>
            <Link to="/estadisticas" >
              <b>Estadísticas</b>
            </Link>
          </li>
          <li>
            <Link to="/empleados">
            <b>Empleados</b>
            </Link>
          </li>
          <li>
            <Link to="/resultado">
              <b>Resultado</b>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;