// npm install -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p
//
// Routing -> React Router DOM
// npm install react-router-dom
//
// Install json-server:
// https://www.npmjs.com/package/json-server
//
// npm install -g json-server
// json-server --watch db.json

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// createBrowserRouter: Definir un router por medio de un objeto principal 
// RouterProvider: centro de la aplicación donde comienza a fluir los datos hacia los demás componentes de la aplicación
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente';
import Index, {loader as clientesLoader } from './pages/Index';
import ErrorPage from './components/ErrorPage';
import EditarCliente, { loader as editarClienteLoader, action as editarClienteAction } from './pages/EditarCliente';
import { action as eliminarClienteAction } from './components/Cliente';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,  // indica que este objeto se tiene que renderizar. Se va a cargar cuando visitemos la página principal (path: '/')
        element: <Index />,
        loader: clientesLoader, // loader: Para obtener datos de una API o de un objeto (similiar a un state)
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,  // action: Para procesar la entrada de datos en un Form
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente/>,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: eliminarClienteAction
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider 
      router={router}/>
  </React.StrictMode>,
)
