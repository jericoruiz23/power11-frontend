import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import * as XLSX from 'xlsx';

const Excel = () => {
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];

    if (file && (file.type.includes('spreadsheetml') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))) {
      setArchivo(file);
      setMensaje('');
      leerExcel(file); // 👉 Leer y mostrar vista previa automáticamente
    } else {
      setArchivo(null);
      setVistaPrevia([]);
      setMensaje('Solo se permiten archivos Excel (.xlsx o .xls)');
    }
  };

  const leerExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const hoja = workbook.Sheets[workbook.SheetNames[0]];
      const registros = XLSX.utils.sheet_to_json(hoja);

      setVistaPrevia(registros);
    };
    reader.readAsArrayBuffer(file);
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
        setMensaje(`✅ Archivo procesado correctamente: ${data.registrosProcesados} registros.`);
        setArchivo(null);
        setVistaPrevia([]);
      } else {
        setMensaje(data.error || '❌ Error procesando el archivo');
      }
    } catch (err) {
      setMensaje('❌ Error al subir el archivo.');
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
      maxWidth="700px"
      margin="0 auto"
      textAlign="center"
    >
      <Typography variant="h6" gutterBottom>
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
        disabled={cargando || !archivo}
        sx={{ mt: 2 }}
      >
        {cargando ? <CircularProgress size={24} /> : 'Subir archivo'}
      </Button>

      {mensaje && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {mensaje}
        </Typography>
      )}

      {/* Vista previa de la tabla */}
      {vistaPrevia.length > 0 && (
        <Box mt={4} width="100%" overflow="auto">
          <Typography variant="h6" gutterBottom>
            Vista previa del archivo
          </Typography>
          <Box
            component="table"
            sx={{
              width: '100%',
              borderCollapse: 'collapse',
              '& th, & td': {
                border: '1px solid #ccc',
                padding: '8px',
                textAlign: 'left',
              },
              '& th': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <thead>
              <tr>
                {Object.keys(vistaPrevia[0]).map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vistaPrevia.slice(0, 10).map((fila, i) => (
                <tr key={i}>
                  {Object.values(fila).map((valor, j) => (
                    <td key={j}>{valor}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Box>
          <Typography variant="body2" mt={1}>
            Mostrando los primeros {Math.min(10, vistaPrevia.length)} de {vistaPrevia.length} registros.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Excel;
