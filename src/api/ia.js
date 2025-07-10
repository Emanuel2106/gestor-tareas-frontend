import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/ia';

export const generarResumen = async (tareas) => {
  const res = await axios.post(`${API_URL}/resumen`, tareas);
  return res.data;
};

export const generarPrioridades = async (tareas) => {
  const res = await axios.post(`${API_URL}/prioridades`, tareas);
  return res.data;
};

export const autocompletarDescripcion = async (titulo) => {
  const res = await axios.get(`${API_URL}/autocompletar`, {
    params: { titulo },
  });
  return res.data;
};
