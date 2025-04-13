import React, { useState } from 'react';

const obtenerColorPorPosicion = (posicion) => {
  switch (posicion) {
    case 'Arquero': return 'from-green-400 via-green-500 to-green-600';
    case 'Defensor': return 'from-blue-400 via-blue-500 to-blue-600';
    case 'Central': return 'from-yellow-400 via-yellow-500 to-yellow-600';
    case 'Delantero': return 'from-pink-400 via-pink-500 to-pink-600';
    default: return 'from-gray-400 via-gray-500 to-gray-600';
  }
};

const Consultas = ({ jugadores }) => {
  const [posicionFiltro, setPosicionFiltro] = useState('Arquero');
  const jugadoresFiltrados = jugadores.filter(j => j.posicion === posicionFiltro);

  return (
    <div className="space-y-6">
      {/* Selector */}
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Filtrar por posición</h2>
        <select
          value={posicionFiltro}
          onChange={(e) => setPosicionFiltro(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-800 text-white text-lg border border-gray-600 shadow-sm"
        >
          <option value="Arquero">Arquero</option>
          <option value="Defensor">Defensor</option>
          <option value="Central">Mediocampista</option>
          <option value="Delantero">Delantero</option>
        </select>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jugadoresFiltrados.map((j, index) => {
          const gradiente = obtenerColorPorPosicion(j.posicion);

          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${gradiente} p-6 rounded-2xl text-white shadow-xl 
                transform transition duration-300 hover:scale-105 hover:shadow-2xl 
                backdrop-blur-md bg-opacity-80 border border-white/20`}
            >
              <h3 className="font-bold text-2xl capitalize drop-shadow">{j.apellido}</h3>
              <p className="text-lg opacity-90 mb-3">N°{j.numero} - {j.posicion}</p>
              <div className="space-y-2 text-lg">
                {j.posicion !== 'Arquero' && (
                  <p>⚽ <span className="font-semibold">{j.goles}</span> goles</p>
                )}
                <p>⏱️ <span className="font-semibold">{j.minutos}</span> minutos</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Consultas;
