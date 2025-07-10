/**
 * Página principal del sistema (Home.jsx)
 *
 * Incluye:
 * - Formulario de creación de tareas
 * - Filtro por estado
 * - Lista de tareas
 * - Funcionalidades de IA (resumen, prioridad)
 * - Mensajes visuales con Snackbar y Alert
 */

// src/pages/Home.jsx
import { useState } from 'react';
import { Container, Stack, Button, Snackbar, Alert } from '@mui/material';
import TareaForm from '../components/TareaForm';
import TareaList from '../components/TareaList';
import FiltroEstado from '../components/FiltroEstado';
import { generarResumen, generarPrioridades } from '../api/ia';
import { listarTareas } from '../api/tareas';

function Home() {
  const [recargar, setRecargar] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
  const [tareas, setTareas] = useState([]);

  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipo, setTipo] = useState('info'); // success | error | warning | info

  const recargarTareas = () => setRecargar((r) => !r);

  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje(texto);
    setTipo(tipo);
    setOpen(true);
  };

  const handleResumen = async () => {
    try {
      const resumen = await generarResumen(tareas);
      mostrarMensaje(`🧠 Resumen:\n${resumen}`, 'success');
    } catch (err) {
      mostrarMensaje('❌ Error al generar resumen.', 'error');
    }
  };

  const handlePrioridades = async () => {
    try {
      const sugerencias = await generarPrioridades(tareas);
      const lista = Array.isArray(sugerencias) ? sugerencias : [sugerencias];
      mostrarMensaje(`🔢 Sugerencias:\n${lista.join('\n')}`, 'success');
    } catch (err) {
      mostrarMensaje('❌ Error al sugerir prioridades.', 'error');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <TareaForm onTareaCreada={recargarTareas} />

      <FiltroEstado
        estadoSeleccionado={estadoSeleccionado}
        onCambioEstado={setEstadoSeleccionado}
      />

      <Stack direction="row" spacing={2} sx={{ my: 2 }}>
        <Button variant="outlined" onClick={handleResumen}>
          🧠 Generar Resumen
        </Button>
        <Button variant="outlined" onClick={handlePrioridades}>
          🔢 Sugerir Prioridades
        </Button>
      </Stack>

      <TareaList
        key={recargar}
        estadoSeleccionado={estadoSeleccionado}
        onCargarTareas={setTareas}
      />

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={tipo}
          sx={{ whiteSpace: 'pre-line' }}
        >
          {mensaje}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Home;


