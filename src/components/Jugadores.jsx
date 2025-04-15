const jugadoresData = [
    {
      numero: 1,
      apellido: 'Pérez',
      posicion: 'Arquero',
      minutos: 90
    },
    {
      numero: 4,
      apellido: 'González',
      posicion: 'Defensor',
      goles: 0,
      minutos: 85
    },
    {
      numero: 10,
      apellido: 'Martínez',
      posicion: 'Delantero',
      goles: 2,
      minutos: 90
    },
    {
      numero: 8,
      apellido: 'López',
      posicion: 'Mediocampista',
      goles: 1,
      minutos: 88
    }
  ];
  
  const Jugadores = () => {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Jugadores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {jugadoresData.map((jugador, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">#{jugador.numero} - {jugador.apellido}</h3>
              <p className="text-gray-700">Posición: {jugador.posicion}</p>
              <p className="text-gray-700">Minutos jugados: {jugador.minutos}</p>
              {jugador.posicion !== 'Arquero' && (
                <p className="text-gray-700">Goles: {jugador.goles}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Jugadores;
  