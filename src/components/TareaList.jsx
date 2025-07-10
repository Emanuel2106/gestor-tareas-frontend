/**
 * Componente TareaList
 *
 * Lista las tareas desde el backend y permite:
 * - Eliminar tareas
 * - Editar título y descripción (con modal)
 * - Cambiar el estado de la tarea desde un dropdown
 *
 * Props:
 * - estadoSeleccionado: string (opcional) → filtra las tareas por estado
 * - onCargarTareas: function (opcional) → callback al cargar tareas
 */

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  eliminarTarea,
  listarTareas,
  listarTareasPorEstado,
  actualizarTarea,
} from '../api/tareas';
import { obtenerEstados } from '../api/estados';
import EditarTareaDialog from './EditarTareaDialog';

function TareaList({ estadoSeleccionado, onCargarTareas }) {
  const [tareas, setTareas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [tareaEditar, setTareaEditar] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [estadoSeleccionado]);

  const cargarDatos = async () => {
    const tareasData = estadoSeleccionado
      ? await listarTareasPorEstado(estadoSeleccionado)
      : await listarTareas();

    const estadosData = await obtenerEstados();
    setTareas(tareasData);
    setEstados(estadosData);

    if (typeof onCargarTareas === 'function') {
      onCargarTareas(tareasData);
    }
  };

  const handleEliminar = async (id) => {
    await eliminarTarea(id);
    cargarDatos();
  };

  const handleEstadoChange = async (tarea, nuevoEstadoId) => {
    const tareaActualizada = {
      ...tarea,
      estado: { id: nuevoEstadoId },
    };
    await actualizarTarea(tarea.id, tareaActualizada);
    cargarDatos();
  };

  const handleAbrirModal = (tarea) => {
    setTareaEditar(tarea);
    setOpenModal(true);
  };

  const handleGuardarEdicion = async (tareaActualizada) => {
    await actualizarTarea(tareaActualizada.id, tareaActualizada);
    setOpenModal(false);
    cargarDatos();
  };

  return (
    <>
      <Grid container spacing={2}>
        {tareas.map((tarea) => (
          <Grid item xs={12} sm={6} md={4} key={tarea.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 1,
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  minHeight: 200,
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                    {tarea.titulo}
                  </Typography>
                  <Stack direction="row">
                    <IconButton onClick={() => handleAbrirModal(tarea)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEliminar(tarea.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2, minHeight: 40, lineHeight: 1.4 }}
                >
                  {tarea.descripcion}
                </Typography>

                <Select
                  value={tarea.estado.id}
                  onChange={(e) => handleEstadoChange(tarea, e.target.value)}
                  fullWidth
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado.id} value={estado.id}>
                      {estado.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <EditarTareaDialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        tarea={tareaEditar}
        onGuardar={handleGuardarEdicion}
      />
    </>
  );
}

export default TareaList;
