/**
 * Componente IaPanel
 *
 * Este componente permite al usuario interactuar con tres funciones IA:
 * - Generar resumen general de tareas
 * - Sugerir prioridades de tareas
 * - Autocompletar la descripción de una tarea a partir de su título
 *
 * Tecnologías:
 * - React
 * - Material UI
 * - API de Gemini (Google AI)
 */

import { useState } from 'react';
import {
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import {
  generarResumen,
  generarPrioridades,
  autocompletarDescripcion,
} from '../api/ia';
import { listarTareas } from '../api/tareas';

function IaPanel() {
  // Estados locales
  const [resultado, setResultado] = useState('');
  const [titulo, setTitulo] = useState('');

  // Maneja la generación de resumen de tareas
  const handleResumen = async () => {
    const tareas = await listarTareas();
    const texto = await generarResumen(tareas);
    setResultado(texto);
  };

  // Maneja la sugerencia de prioridades
  const handlePrioridades = async () => {
    const tareas = await listarTareas();
    const texto = await generarPrioridades(tareas);
    setResultado(texto);
  };

  // Maneja la autocompletación de descripción por título
  const handleAutocompletar = async () => {
    const texto = await autocompletarDescripcion(titulo);
    setResultado(texto);
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Herramientas de IA
      </Typography>

      {/* Botones de resumen y prioridad */}
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" onClick={handleResumen}>
          Generar Resumen
        </Button>
        <Button variant="contained" onClick={handlePrioridades}>
          Sugerir Prioridades
        </Button>
      </Stack>

      {/* Entrada para autocompletar descripción */}
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Título de la tarea"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          fullWidth
        />
        <Button variant="outlined" onClick={handleAutocompletar}>
          Autocompletar
        </Button>
      </Stack>

      {/* Resultado del procesamiento IA */}
      {resultado && (
        <Paper elevation={2} sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
          <Typography variant="subtitle1">Resultado:</Typography>
          <Typography>{resultado}</Typography>
        </Paper>
      )}
    </Paper>
  );
}

export default IaPanel;
