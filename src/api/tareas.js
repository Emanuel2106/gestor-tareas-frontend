/**
 * Módulo de servicios para gestionar tareas a través del backend.
 * Realiza operaciones CRUD y filtrado por estado.
 */

import axios from 'axios';

// URL base del endpoint de tareas
const API_URL = 'http://localhost:8080/api/v1/tarea';

/**
 * Obtiene la lista completa de tareas.
 * 
 * @returns {Promise<Array>} Lista de objetos Tarea
 * @throws {Error} Si la solicitud falla
 */
export const listarTareas = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

/**
 * Obtiene las tareas que pertenecen a un estado específico.
 * 
 * @param {string} estado - Nombre del estado por el cual filtrar (por ejemplo: 'Pendiente')
 * @returns {Promise<Array>} Lista de tareas con el estado especificado
 * @throws {Error} Si la solicitud falla
 */
export const listarTareasPorEstado = async (estado) => {
  const res = await axios.get(`${API_URL}/estado/${estado}`);
  return res.data;
};

/**
 * Crea una nueva tarea en el sistema.
 * 
 * @param {Object} tarea - Objeto con los datos de la tarea (titulo, descripcion, estado)
 * @returns {Promise<Object>} Tarea creada (incluye ID asignado)
 * @throws {Error} Si la solicitud falla
 */
export const crearTarea = async (tarea) => {
  const res = await axios.post(API_URL, tarea);
  return res.data;
};

/**
 * Actualiza los datos de una tarea existente.
 * 
 * @param {number} id - ID de la tarea a actualizar
 * @param {Object} tarea - Objeto con los nuevos datos de la tarea
 * @returns {Promise<Object>} Tarea actualizada
 * @throws {Error} Si la solicitud falla
 */
export const actualizarTarea = async (id, tarea) => {
  const res = await axios.put(`${API_URL}/${id}`, tarea);
  return res.data;
};

/**
 * Elimina una tarea según su ID.
 * 
 * @param {number} id - ID de la tarea a eliminar
 * @returns {Promise<void>} Sin retorno si es exitoso
 * @throws {Error} Si la solicitud falla
 */
export const eliminarTarea = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
