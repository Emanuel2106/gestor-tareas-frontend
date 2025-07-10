/**
 * NotFound.jsx
 * 
 * Página de error 404 - Ruta no encontrada.
 * Se muestra cuando el usuario intenta acceder a una URL no válida.
 */
import { Container, Typography } from '@mui/material';

function NotFound() {
  return (
    <Container>
      <Typography variant="h4" color="error">
        404 - Página no encontrada
      </Typography>
    </Container>
  );
}

export default NotFound;
