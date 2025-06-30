import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';

const Excel = () => {
  const [archivo, setArchivo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      setArchivo(file);
      setMensaje('');
    } else {
      setArchivo(null);
      setMensaje('Solo se permiten archivos Excel (.xlsx o .xls)');
    }
  };

  const handleSubir = async () => {
    if (!archivo) {
      setMensaje('Selecciona un archivo válido primero');
      return;
    }

    setCargando(true);
    setMensaje('');

    const formData = new FormData();
    formData.append('archivo', archivo);

    try {
      const response = await fetch('/api/ingesta-excel', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`Archivo procesado correctamente: ${data.registrosProcesados} registros.`);
        setArchivo(null);
      } else {
        setMensaje(data.error || 'Error procesando el archivo');
      }
    } catch (err) {
      setMensaje('Error al subir el archivo.');
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      border="1px dashed #ccc"
      borderRadius="8px"
      maxWidth="400px"
      margin="0 auto"
      textAlign="center"
    >
      <Typography variant="h6" gutterBottom >
        Subir archivo Excel
      </Typography>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleArchivoChange}
        style={{ marginBottom: '16px' }}
      />

      {archivo && <Typography variant="body2">Archivo seleccionado: {archivo.name}</Typography>}

      <Button
        variant="outlined"
        color="error"
        onClick={handleSubir}
        disabled={cargando}
        sx={{ mt: 2 }}
      >
        {cargando ? <CircularProgress size={24} /> : 'Subir archivo'}
      </Button>

      {mensaje && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {mensaje}
        </Typography>
      )}
    </Box>
  );
};

export default Excel;
