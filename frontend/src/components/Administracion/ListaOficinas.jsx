import React from "react";
import "./Administracion.css";
import { Link } from "react-router-dom";

function ListaOficinas({ oficinas }) {
  return (
    <div className="contenedor2">
      <div className="botones">
        <div className="agregar"><Link to="/Agregar">Agregar</Link></div>
        <div className="actualizar"><a href="#">Actualizar</a></div>
        <div className="eliminar"><a href="#">Eliminar</a></div>
      </div>

      <div className="cajas">
        <div>
          <h2>Oficinas Registradas</h2>
          <p>Total Oficinas: {oficinas.length}</p>
          <table>
            <thead>
              <tr>
                <th>Edificio</th>
                <th>Piso</th>
                <th>Oficina</th>
                <th>Arrendatario</th>
                <th>Metros²</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {oficinas.length > 0 ? (
                oficinas.map((oficina, i) => (
                  <tr key={i}>
                    <td>{oficina.edificio}</td>
                    <td>{oficina.numero_piso}</td>
                    <td>{oficina.oficina}</td>
                    <td>{oficina.arrendatario || "Libre"}</td>
                    <td>{oficina.area}</td>
                    <td>{oficina.estado}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No hay oficinas registradas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListaOficinas;
