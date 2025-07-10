/**
 * Componente TareaForm
 *
 * Permite crear una nueva tarea con título, descripción y estado.
 * Usa IA para autocompletar la descripción si se desea.
 * Llama a la API de backend para guardar la tarea.
 *
 * Props:
 * - onTareaCreada: función a ejecutar luego de crear la tarea (ej. refrescar lista)
 */

import {
    TextField,
    Button,
    Stack,
    MenuItem,
    Typography,
  } from '@mui/material';
  import { useEffect, useState } from 'react';
  import { crearTarea } from '../api/tareas';
  import { obtenerEstados } from '../api/estados';
  import { autocompletarDescripcion } from '../api/ia';
  
  function TareaForm({ onTareaCreada }) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estadoId, setEstadoId] = useState('');
    const [estados, setEstados] = useState([]);
  
    // Obtener estados disponibles desde backend
    useEffect(() => {
      obtenerEstados().then(setEstados);
    }, []);
  
    // Guardar tarea
    const handleCrear = async () => {
      if (!titulo || !estadoId) return;
  
      await crearTarea({
        titulo,
        descripcion,
        estado: { id: estadoId },
      });
  
      // Resetear campos
      setTitulo('');
      setDescripcion('');
      setEstadoId('');
      onTareaCreada();
    };
  
    // Llamar a IA para completar descripción
    const handleAutocompletar = async () => {
      if (!titulo) return;
      const texto = await autocompletarDescripcion(titulo);
      setDescripcion(texto);
    };
  
    return (
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Typography variant="h6">Crear nueva tarea</Typography>
  
        <TextField
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          fullWidth
        />
  
        <Stack direction="row" spacing={1}>
          <TextField
            label="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            fullWidth
          />
          <Button
            variant="outlined"
            onClick={handleAutocompletar}
            disabled={!titulo}
          >
            Autocompletar
          </Button>
        </Stack>
  
        <TextField
          select
          label="Estado"
          value={estadoId}
          onChange={(e) => setEstadoId(e.target.value)}
          fullWidth
        >
          {estados.map((estado) => (
            <MenuItem key={estado.id} value={estado.id}>
              {estado.nombre}
            </MenuItem>
          ))}
        </TextField>
  
        <Button variant="contained" onClick={handleCrear}>
          Crear tarea
        </Button>
      </Stack>
    );
  }
  
  export default TareaForm;
  