import { useState } from "react";
import axios from "axios";

function CargarJugador() {
  const [form, setForm] = useState({
    numero: "",
    apellido: "",
    posicion: "",
    minutos: "",
    goles: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Si es arquero, no mandamos goles
    const datos = { ...form };
    if (form.posicion.toLowerCase() === "arquero") {
      delete datos.goles;
    }
    try {
      await axios.post("http://localhost:5000/jugadores", datos); // Cambiar URL si es diferente
      alert("Jugador cargado correctamente");
      setForm({ numero: "", apellido: "", posicion: "", minutos: "", goles: "" });
    } catch (error) {
      alert("Error al cargar jugador");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="numero" placeholder="Número de camiseta" value={form.numero} onChange={handleChange} required />
      <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
      <select name="posicion" value={form.posicion} onChange={handleChange} required>
        <option value="">Seleccione posición</option>
        <option value="arquero">Arquero</option>
        <option value="defensor">Defensor</option>
        <option value="central">Mediocampista</option>
        <option value="delantero">Delantero</option>
      </select>
      <input name="minutos" placeholder="Minutos jugados" value={form.minutos} onChange={handleChange} required />
      {form.posicion !== "arquero" && (
        <input name="goles" placeholder="Goles" value={form.goles} onChange={handleChange} required />
      )}
      <button type="submit">Guardar</button>
    </form>
  );
}

export default CargarJugador;
