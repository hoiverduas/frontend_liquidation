import { StrictMode } from 'react'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { router } from './routes/routerPrincipal.jsx';
import { createRoot } from 'react-dom/client';

let rutas = createBrowserRouter(router)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rutas} />
  </StrictMode>
);
