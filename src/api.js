import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:5000/jugadores'; // Cambiá esto si el backend está en otra URL o puerto

// Obtener la lista completa de jugadores
export const getJugadores = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener jugadores:', error);
    toast.error('Error al cargar jugadores');
    return [];
  }
};

// Agregar un nuevo jugador
export const postJugador = async (jugador) => {
  try {
    const response = await axios.post(API_URL, jugador);
    toast.success('✅ Jugador agregado correctamente');
    return response.data;
  } catch (error) {
    console.error('❌ Error al agregar jugador:', error);
    toast.error('Error al agregar jugador');
    return null;
  }
};
