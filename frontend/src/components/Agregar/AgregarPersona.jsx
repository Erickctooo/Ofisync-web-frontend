import React, { useState } from "react";
import { agregarPersonaApi } from "../../../services/personaService";
import "./agregar.css";

function AgregarPersona() {
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        rut: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombre || !form.correo || !form.telefono || !form.rut) {
            alert("Faltan campos obligatorios");
            return;
        }
        if (form.telefono.length < 8 || form.telefono.length > 12) {
            alert("El teléfono debe tener entre 8 y 12 dígitos");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(form.correo)) {
            alert("Correo electrónico no válido");
            return;
        }
        if (!/^\d{7,8}-[0-9kK]$/.test(form.rut)) {
            alert("El RUT debe tener el formato 12345678-9");
            return;
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre)) {
            alert("El nombre solo puede contener letras y espacios");
            return;
        }
        
        try {
            const data = await agregarPersonaApi(form);
            if (data.error) throw new Error(data.error);
            alert(`Arrendatario ${data.nombre} agregada correctamente`);
            setForm({ nombre: "", correo: "", telefono: "", rut: "" });
        } catch (err) {
            alert("Error al agregar Arrendatario: " + err.message);
        }
    };

    return (
        <div className="contenedorAgregar">
            <h2>Agregar Arrendatario</h2>
            <form onSubmit={handleSubmit} className="agregar-form">
                <div className="form-group">
                    <label htmlFor="rut_persona">Rut</label>
                    <input id="rut_persona" type="text" name="rut" value={form.rut} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre_persona">Nombre completo</label>
                    <input id="nombre_persona" type="text" name="nombre" value={form.nombre} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="correo_persona">Correo</label>
                    <input id="correo_persona" type="email" name="correo" value={form.correo} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono_persona">Teléfono</label>
                    <input id="telefono_persona" type="number" name="telefono" value={form.telefono} onChange={handleChange} />
                </div>
                <div className="form-group span-full">
                    <button type="submit">Agregar Arrendatario</button>
                </div>
            </form>
        </div>
    );
}
export default AgregarPersona;