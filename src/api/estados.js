/**
 * Módulo de servicios para consumir el API de Estados desde el backend.
 * Utiliza axios para realizar peticiones HTTP a la URL base definida.
 */

import axios from 'axios';

// URL base del endpoint de estados
const API = 'http://localhost:8080/api/v1/estado';

/**
 * Obtiene la lista completa de estados disponibles desde el backend.
 * 
 * @returns {Promise<Array>} Un array de objetos Estado con formato:
 *                           [{ id: number, nombre: string, descripcion: string }]
 * @throws {Error} En caso de error de red o fallo en el servidor
 */
export const obtenerEstados = async () => {
  const res = await axios.get(API);
  return res.data;
};
