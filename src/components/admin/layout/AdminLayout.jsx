import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";

export default function AdminLayout() {
  const { usuario, logout } = useAuth();

  useEffect(() => {
    document.title = "Panel de Administración - EcoFood";
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-700 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">EcoFood Admin</h1>
          <nav className="flex flex-col gap-4">
            <Link to="/admin/clientes" className="hover:text-gray-200">📋 Clientes</Link>
            <Link to="/admin/empresas" className="hover:text-gray-200">🏢 Empresas</Link>
            <Link to="/admin/registro" className="hover:text-gray-200">🧑‍💼 Registrar Admin</Link>
          </nav>
        </div>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 mt-4 py-2 px-4 rounded"
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
