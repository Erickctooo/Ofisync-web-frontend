import React from "react";
import "./Administracion.css";

function BusquedaOficina({ filtro, handleChange, handleSubmit, handleClear, oficinasFiltradas }) {
  return (
    <div className="contenedor1">
      <h2>Buscar Oficina</h2>
      <div className="buscar">
        <form onSubmit={handleSubmit}>
          <label htmlFor="codigo">Código Oficina:</label>
          <input type="text" name="codigo" value={filtro.codigo} onChange={handleChange} placeholder="Código" />

          <label htmlFor="piso">Piso:</label>
          <input type="number" name="piso" value={filtro.piso} onChange={handleChange} placeholder="N° piso" />

          <label htmlFor="estado">Estado:</label>
          <select name="estado" value={filtro.estado} onChange={handleChange}>
            <option value="">Todos</option>
            <option value="libre">Libre</option>
            <option value="ocupada">Ocupada</option>
            <option value="reservada">Reservada</option>
          </select>

          <label htmlFor="arrendatario">Arrendatario:</label>
          <input type="text" name="arrendatario" value={filtro.arrendatario} onChange={handleChange} placeholder="Nombre" />

          <button type="submit">Buscar</button>
          <button type="button" onClick={handleClear}>Limpiar</button>
        </form>
      </div>

      <div className="tablaBuscar">
        <table>
          <thead>
            <tr>
              <th>Edificio</th>
              <th>Piso</th>
              <th>Código</th>
              <th>Arrendatario</th>
              <th>Metros²</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {oficinasFiltradas.length > 0 ? (
              oficinasFiltradas.map((oficina) => (
                <tr key={oficina.oficina}>
                  <td>{oficina.edificio}</td>
                  <td>{oficina.numero_piso}</td>
                  <td>{oficina.oficina}</td>
                  <td>{oficina.arrendatario || "Libre"}</td>
                  <td>{oficina.area}</td>
                  <td>{oficina.estado}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">No se encontraron oficinas.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BusquedaOficina;
