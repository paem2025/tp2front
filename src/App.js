import React, { useState, useEffect } from 'react';
import JugadoresLista from './components/JugadoresLista';
import Consultas from './components/Consultas';
import { getJugadores, postJugador } from './api';
import './styles/tailwind.css';
import { toast, Toaster } from 'react-hot-toast';

function App() {
  const [verJugadores, setVerJugadores] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [jugadores, setJugadores] = useState([]);

  const [nuevoJugador, setNuevoJugador] = useState({
    numero: '',
    apellido: '',
    posicion: 'Delantero',
    goles: '',
    minutos: '',
  });

  useEffect(() => {
    toast.loading('Cargando jugadores...', { id: 'loading' });

    getJugadores()
      .then((res) => {
        setJugadores(res);
        toast.success('Jugadores cargados exitosamente!', { id: 'loading' });
      })
      .catch((err) => {
        console.error('Error al obtener jugadores:', err);
        toast.error('Error al cargar jugadores!');
      });
  }, []);

  const handleChange = (e) => {
    setNuevoJugador({ ...nuevoJugador, [e.target.name]: e.target.value });
  };

  const agregarJugador = async (e) => {
    e.preventDefault();

    const nuevo = {
      numero: parseInt(nuevoJugador.numero),
      apellido: nuevoJugador.apellido,
      posicion: nuevoJugador.posicion,
      minutos: parseInt(nuevoJugador.minutos),
      ...(nuevoJugador.posicion !== 'Arquero' && {
        goles: Number(nuevoJugador.goles) || 0,
      }),
    };

    try {
      const jugadorGuardado = await postJugador(nuevo);
      setJugadores((prev) => [...prev, jugadorGuardado]);
      toast.success('Jugador agregado correctamente!');

      setNuevoJugador({
        numero: '',
        apellido: '',
        posicion: 'Delantero',
        goles: '',
        minutos: '',
      });
    } catch (error) {
      console.error('Error al agregar jugador:', error);
      toast.error('Error al agregar jugador!');
    }
  };

  return (
    <div className={`${modoOscuro ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center p-4 transition-colors duration-500">
        <Toaster position="top-center" reverseOrder={false} />

        <button
          onClick={() => setModoOscuro(!modoOscuro)}
          className="absolute top-4 right-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition hover:scale-105 transform"
        >
          {modoOscuro ? 'Modo Claro' : 'Modo Oscuro'}
        </button>

        {verJugadores === false ? (
          <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center transition-transform scale-110">
            <h1 className="text-3xl font-extrabold mb-4 text-indigo-600 dark:text-indigo-400">
              ¡Datos de mi equipo!
            </h1>
            <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
              estadísticas de jugadores.
            </p>
            <div className="flex flex-col gap-5">
              <button
                onClick={() => setVerJugadores(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-medium rounded-xl shadow-md hover:scale-105 transform transition flex items-center justify-center gap-2"
              >
                👥 Ver jugadores
              </button>

              <button
                onClick={() => setVerJugadores('consultas')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg font-medium rounded-xl shadow-md hover:scale-105 transform transition flex items-center justify-center gap-2"
              >
                📊 Consultas
              </button>
            </div>
          </div>
        ) : verJugadores === 'consultas' ? (
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Consultas</h1>
              <button
                onClick={() => setVerJugadores(false)}
                className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg transition hover:scale-105 transform"
              >
                Volver al inicio
              </button>
            </div>
            <Consultas jugadores={jugadores} />
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Jugadores</h1>
              <button
                onClick={() => setVerJugadores(false)}
                className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-lg transition hover:scale-105 transform"
              >
                Volver al inicio
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Agregar nuevo jugador</h2>
              <form onSubmit={agregarJugador} className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <input
                  type="number"
                  name="numero"
                  placeholder="Número de camiseta"
                  value={nuevoJugador.numero}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded col-span-1 bg-white dark:bg-gray-700 dark:border-gray-600"
                />
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={nuevoJugador.apellido}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded col-span-1 bg-white dark:bg-gray-700 dark:border-gray-600"
                />
                <select
                  name="posicion"
                  value={nuevoJugador.posicion}
                  onChange={handleChange}
                  className="border p-2 rounded col-span-1 sm:col-span-2 bg-white dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="Arquero">Arquero</option>
                  <option value="Defensor">Defensor</option>
                  <option value="Central">Mediocampista</option>
                  <option value="Delantero">Delantero</option>
                </select>

                {nuevoJugador.posicion !== 'Arquero' && (
                  <input
                    type="number"
                    name="goles"
                    placeholder="Goles"
                    value={nuevoJugador.goles}
                    onChange={handleChange}
                    className="border p-2 rounded col-span-1 bg-white dark:bg-gray-700 dark:border-gray-600"
                  />
                )}

                <input
                  type="number"
                  name="minutos"
                  placeholder="Minutos jugados"
                  value={nuevoJugador.minutos}
                  onChange={handleChange}
                  required
                  className="border p-2 rounded col-span-1 bg-white dark:bg-gray-700 dark:border-gray-600"
                />

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 text-lg rounded-xl shadow-md hover:scale-105 transform transition"
                  >
                    Agregar jugador
                  </button>
                </div>
              </form>
            </div>

            <JugadoresLista jugadores={jugadores} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;