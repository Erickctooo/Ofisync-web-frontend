import React, { useState, useEffect } from "react";
import { calcularGastoComunApi } from "../../services/gastoComunService";
import { getEdificios } from "../../services/edificioService";

function CalcularGastoComun() {
  const [edificios, setEdificios] = useState([]);
  const [form, setForm] = useState({
    edificio_id: "",
    mes: "",
    total: "",
    descripcion: "",
  });

  useEffect(() => {
    getEdificios()
      .then((data) => setEdificios(data))
      .catch((err) => console.error("Error al cargar edificios:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.edificio_id || !form.mes || !form.total) {
      alert("Debe completar los campos obligatorios");
      return;
    }

    try {
      const data = await calcularGastoComunApi({
        edificio_id: parseInt(form.edificio_id),
        mes: form.mes,
        total: parseFloat(form.total),
        descripcion: form.descripcion,
      });

      if (data.error) throw new Error(data.error);

      alert(
        `${data.mensaje}\n💵 Gasto por m²: $${data.gasto_por_m2}`
      );

      setForm({ edificio_id: "", mes: "", total: "", descripcion: "" });
    } catch (err) {
      alert("Error al calcular gasto común: " + err.message);
    }
  };

  return (
    <div className="contenedorAgregar">
      <h2>Calcular Gasto Común</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="edificio_id">Edificio:</label>
        <select
          id="edificio_id"
          name="edificio_id"
          value={form.edificio_id}
          onChange={handleChange}
        >
          <option value="">Seleccione un edificio</option>
          {edificios.map((edificio) => (
            <option key={edificio.id} value={edificio.id}>
              {edificio.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="mes">Mes:</label>
        <input
          id="mes"
          type="text"
          name="mes"
          value={form.mes}
          onChange={handleChange}
          placeholder="Ej: Octubre 2025"
        />

        <label htmlFor="total">Total de gastos ($):</label>
        <input
          id="total"
          type="number"
          name="total"
          value={form.total}
          onChange={handleChange}
        />

        <label htmlFor="descripcion">Descripción (opcional):</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
        />

        <button type="submit">Calcular</button>
      </form>
    </div>
  );
}

export default CalcularGastoComun;