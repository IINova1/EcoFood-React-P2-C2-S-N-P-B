import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
return (
    <div>
      {/* Navbar opcional */}
      <Outlet /> {/* NECESARIO para que se rendericen las subrutas */}
    </div>
);
}
