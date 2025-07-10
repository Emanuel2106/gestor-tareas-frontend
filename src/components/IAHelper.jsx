/**
 * Componente IAHelper
 *
 * Este componente permite al usuario interactuar con la API de Gemini (IA de Google)
 * para generar un resumen general de las tareas existentes y sugerencias de prioridad.
 * Los resultados se muestran directamente en pantalla.
 */

import { useEffect, useState } from 'react';
import { Button, Typography, Box, Stack } from '@mui/material';
import { generarResumen, generarPrioridades } from '../api/ia';
import { listarTareas } from '../api/tareas';

function IAHelper() {
  // Estado local para almacenar las tareas, el resumen generado y las prioridades sugeridas
  const [tareas, setTareas] = useState([]);
  const [resumen, setResumen] = useState('');
  const [prioridades, setPrioridades] = useState('');

  // Al montar el componente se cargan las tareas existentes desde la API
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    const data = await listarTareas(); // Llamada al endpoint /api/v1/tarea
    setTareas(data); // Guardar las tareas en estado local
  };

  // Maneja la solicitud para generar un resumen de las tareas usando la IA
  const handleResumen = async () => {
    const texto = await generarResumen(tareas);
    setResumen(texto);
  };

  // Maneja la solicitud para obtener prioridades sugeridas usando la IA
  const handlePrioridades = async () => {
    const texto = await generarPrioridades(tareas);
    setPrioridades(texto);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Asistente de Inteligencia Artificial
      </Typography>

      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" onClick={handleResumen}>
          Generar Resumen
        </Button>
        <Button variant="contained" onClick={handlePrioridades}>
          Sugerir Prioridades
        </Button>
      </Stack>

      {/* Sección de resultados de resumen */}
      {resumen && (
        <Box mb={2}>
          <Typography variant="subtitle1">📋 Resumen generado:</Typography>
          <Typography variant="body1">{resumen}</Typography>
        </Box>
      )}

      {/* Sección de resultados de prioridades */}
      {prioridades && (
        <Box>
          <Typography variant="subtitle1">🎯 Prioridades sugeridas:</Typography>
          <Typography variant="body1">{prioridades}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default IAHelper;
