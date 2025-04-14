import { useEffect, useState } from "react";
import axios from "axios";

function ConsultarJugadores() {
  const [jugadores, setJugadores] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/jugadores")
      .then(res => setJugadores(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Lista de Jugadores</h2>
      <ul>
        {jugadores.map((jug, i) => (
          <li key={i}>
            N°{jug.numero} - {jug.apellido} ({jug.posicion}) - {jug.minutos} min
            {jug.goles !== undefined && ` - ${jug.goles} goles`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConsultarJugadores;
