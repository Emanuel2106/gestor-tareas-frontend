/**
 * Componente TareaCard
 *
 * Muestra los detalles de una tarea en una tarjeta visual.
 * Incluye título, descripción y estado (con color).
 *
 * Props:
 * - tarea: objeto con las propiedades { titulo, descripcion, estado.nombre }
 */

import { Card, CardContent, Typography, Chip } from '@mui/material';

function TareaCard({ tarea }) {
  return (
    <Card variant="outlined">
      <CardContent>
        {/* Título de la tarea */}
        <Typography variant="h6">{tarea.titulo}</Typography>

        {/* Descripción de la tarea */}
        <Typography variant="body2" color="textSecondary">
          {tarea.descripcion}
        </Typography>

        {/* Estado visualizado como etiqueta (Chip) */}
        <Chip
          label={tarea.estado?.nombre}
          color={
            tarea.estado?.nombre === 'completada'
              ? 'success'
              : tarea.estado?.nombre === 'en progreso'
              ? 'warning'
              : 'default'
          }
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
}

export default TareaCard;
