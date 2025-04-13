import React from 'react';

export default function JugadoresCard({ jugador }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        #{jugador.numero} - {jugador.apellido}
      </h2>
      <p className="text-gray-600 mb-1">Posición: {jugador.posicion}</p>
      {jugador.posicion === 'Arquero' ? (
        <p className="text-gray-600 mb-1">Atajadas: {jugador.atajadas}</p>
      ) : (
        <p className="text-gray-600 mb-1">Goles: {jugador.goles}</p>
      )}
      <p className="text-gray-600">Minutos jugados: {jugador.minutos}</p>
    </div>
  );
}
