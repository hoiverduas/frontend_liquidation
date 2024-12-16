import Home from "../pages/Home";
import Login from "../pages/Login";
import Estadisticas from "../pages/Estadisticas";
import Historial from "../pages/Historial";
import Calculo from "../pages/Calculo";
import Registro from "../pages/Registro";
import Resultado from "../pages/Resultado";
import Empleados from "../pages/Empleados";
import RegistrarNuevo from "../pages/RegistrarNuevo";


export let router = [ 
    {
        path: '/',   //la ruta principal es el / solo, osea el home es la ruta principal//
        element: <Login />
    },
    {
        path: '/home',
        element:  <Home />
    },
    {
        path: '/estadisticas',
        element: <Estadisticas />
    },
    {
        path: '/historial',
        element: <Historial />
    },
    {
        path: '/calculo',
        element: <Calculo />
    },
    {
        path: '/registro',
        element: <Registro />
    },
    {
        path: '/resultado',
        element: <Resultado />
    },
    {
        path:'/empleados',
        element: <Empleados />
    },
    {
        path: '/registrarNuevo',
        element: <RegistrarNuevo />
    },
  
]
