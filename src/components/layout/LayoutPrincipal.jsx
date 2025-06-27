// src/components/layout/LayoutPrincipal.jsx
import { Outlet } from "react-router-dom";
import HeaderAutenticado from "./HeaderAutenticado";
import Sidebar from "./Sidebar";
import './Layout.css'; // Crearemos este archivo de estilos a continuación

export default function LayoutPrincipal() {
  return (
    <div className="layout-container">
      <HeaderAutenticado />
      <div className="main-content">
        <Sidebar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}