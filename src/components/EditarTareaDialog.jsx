/**
 * Componente EditarTareaDialog
 *
 * Este componente muestra un diálogo modal que permite al usuario editar
 * los campos `título` y `descripción` de una tarea existente.
 */

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  
  /**
   * @param {Object} props
   * @param {boolean} props.open - Controla si el diálogo está abierto o cerrado.
   * @param {Function} props.onClose - Función que se ejecuta al cerrar el diálogo.
   * @param {Object} props.tarea - Objeto de la tarea que se desea editar.
   * @param {Function} props.onGuardar - Función que se ejecuta al guardar los cambios, recibe la tarea actualizada.
   */
  function EditarTareaDialog({ open, onClose, tarea, onGuardar }) {
    // Estados locales para los campos del formulario
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
  
    /**
     * Efecto que actualiza los campos cuando se cambia la tarea seleccionada.
     */
    useEffect(() => {
      if (tarea) {
        setTitulo(tarea.titulo || '');
        setDescripcion(tarea.descripcion || '');
      }
    }, [tarea]);
  
    /**
     * Maneja la acción de guardar y retorna la tarea actualizada al componente padre.
     */
    const handleGuardar = () => {
      const tareaActualizada = {
        ...tarea,
        titulo,
        descripcion,
      };
      onGuardar(tareaActualizada);
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Editar Tarea</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            fullWidth
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Descripción"
            fullWidth
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleGuardar} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default EditarTareaDialog;
  