import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/Inicio">Inicio</Link></li>
        <li><a href="">Dashboard</a></li>
        <li><Link to="/Administracion">Administracion</Link></li>
        <li><a href="">Cuentas</a></li>
        <li><Link to="/GastoComun">Gasto Comun</Link></li>
        <li><a href="">Informacion</a></li>
        <div className="logout">
            <img src="/img/logout.jpg" alt="" />
            <li><a href="">Cerrar Sección</a></li>
        </div>
      </ul>
    </aside>
  );
}

export default Sidebar;
