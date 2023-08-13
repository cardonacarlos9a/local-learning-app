import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import Login from './pages/Login.jsx';
import ProductosLista from './pages/Productos.jsx';
import Dictado from './pages/Dictado.jsx';

import './index.css'
import CrearProducto from './pages/CrearProducto.jsx';
import Carro from './pages/Carro.jsx';
import ProductContextProvider from './services/ProductContext.jsx'
import Designer from './pages/Designer.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/productos",
    element: <ProductosLista />,
  },
  {
    path: "/crear-producto",
    element: <CrearProducto />,
  },
  {
    path: "/dictado",
    element: <Dictado/>,
  },
  {
    path: "/carro",
    element: <Carro />,
  },
  {
    path: "/designer",
    element: <Designer />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductContextProvider> 
    {() => (
        <RouterProvider router={router}/>
      )}
    </ProductContextProvider>
  </React.StrictMode>,
)
