/**
 * Componente FiltroEstado
 *
 * Este componente renderiza un menú desplegable (`Select`) que permite al usuario
 * filtrar las tareas por estado. Los estados se obtienen desde el backend.
 */

import { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { obtenerEstados } from '../api/estados';

/**
 * @param {Object} props
 * @param {string} props.estadoSeleccionado - Estado actualmente seleccionado en el filtro.
 * @param {Function} props.onCambioEstado - Función que se llama cuando se selecciona un nuevo estado.
 */
function FiltroEstado({ estadoSeleccionado, onCambioEstado }) {
  const [estados, setEstados] = useState([]); // Lista de estados desde la API

  // Se ejecuta una vez al montar el componente para cargar los estados disponibles
  useEffect(() => {
    obtenerEstados().then(setEstados);
  }, []);

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Filtrar por estado</InputLabel>
      <Select
        value={estadoSeleccionado}
        label="Filtrar por estado"
        onChange={(e) => onCambioEstado(e.target.value)}
      >
        <MenuItem value="">Todos</MenuItem>
        {estados.map((estado) => (
          <MenuItem key={estado.id} value={estado.nombre}>
            {estado.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FiltroEstado;
