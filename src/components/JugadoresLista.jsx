import React from 'react';

const JugadoresLista = ({ jugadores }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 animate-fade-in duration-500">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Listado de Jugadores
      </h2>
      {jugadores.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No hay jugadores cargados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">N° Camiseta</th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">Apellido</th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">Posición</th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">Minutos Jugados</th>
                <th className="px-4 py-2 border-b border-gray-300 dark:border-gray-600">Goles</th>
              </tr>
            </thead>
            <tbody>
              {jugadores.map((jugador) => (
                <tr
                  key={jugador.numero}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                >
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{jugador.numero}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{jugador.apellido}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
  {jugador.posicion === 'Central' ? 'Mediocampista' : jugador.posicion}
</td>

                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">{jugador.minutos}</td>
                  <td className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    {jugador.goles !== undefined ? jugador.goles : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JugadoresLista;
