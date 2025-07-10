/**
 * Componente AccionesIA
 * 
 * Este componente permite al usuario interactuar con los servicios de IA
 * para generar un resumen de las tareas o sugerencias de prioridades
 * usando llamadas a la API Gemini desde el backend.
 */

import { Button, Stack } from '@mui/material';
import { generarResumen, generarPrioridades } from '../api/ia';

/**
 * Componente funcional que muestra botones para ejecutar acciones con IA.
 * 
 * @param {Object} props
 * @param {Array} props.tareas - Lista de tareas que se enviarán a los servicios de IA
 */
function AccionesIA({ tareas }) {
  /**
   * Llama al servicio de IA para generar un resumen de las tareas y lo muestra en un alert.
   */
  const handleResumen = async () => {
    const resumen = await generarResumen(tareas);
    alert(`🧠 Resumen:\n\n${resumen}`);
  };

  /**
   * Llama al servicio de IA para generar sugerencias de prioridades y las muestra en un alert.
   */
  const handlePrioridades = async () => {
    const sugerencias = await generarPrioridades(tareas);
    const lista = Array.isArray(sugerencias) ? sugerencias : [sugerencias];
    alert(`🔢 Sugerencias de prioridad:\n\n${lista.join('\n')}`);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ my: 2 }}>
      <Button variant="outlined" onClick={handleResumen}>
        🧠 Generar Resumen
      </Button>
      <Button variant="outlined" onClick={handlePrioridades}>
        🔢 Sugerir Prioridades
      </Button>
    </Stack>
  );
}

export default AccionesIA;
