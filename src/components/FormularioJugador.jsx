import React, { useState } from 'react';

export default function FormularioJugador({ agregarJugador }) {
  const [formData, setFormData] = useState({
    numero: '',
    apellido: '',
    posicion: 'Delantero',
    minutos: '',
    goles: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoJugador = {
      numero: parseInt(formData.numero),
      apellido: formData.apellido,
      posicion: formData.posicion,
      minutos: parseInt(formData.minutos),
    };

    if (formData.posicion !== 'Arquero') {
      nuevoJugador.goles = parseInt(formData.goles) || 0;
    }

    agregarJugador(nuevoJugador);

    // Reiniciar formulario
    setFormData({
      numero: '',
      apellido: '',
      posicion: 'Delantero',
      minutos: '',
      goles: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          name="numero"
          placeholder="Número de camiseta"
          value={formData.numero}
          onChange={handleChange}
          required
          className="p-2 border rounded"
          min="1"
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <select
          name="posicion"
          value={formData.posicion}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Arquero">Arquero</option>
          <option value="Defensor">Defensor</option>
          <option value="Central">Mediocampista</option>
          <option value="Delantero">Delantero</option>
        </select>
        <input
          type="number"
          name="minutos"
          placeholder="Minutos jugados"
          value={formData.minutos}
          onChange={handleChange}
          className="p-2 border rounded"
          required
          min="0"
        />
        {formData.posicion !== 'Arquero' && (
          <input
            type="number"
            name="goles"
            placeholder="Goles"
            value={formData.goles}
            onChange={handleChange}
            className="p-2 border rounded"
            min="0"
          />
        )}
      </div>
      <button
        type="submit"
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Agregar jugador
      </button>
    </form>
  );
}
