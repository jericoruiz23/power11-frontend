import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import * as XLSX from 'xlsx';

const Excel = () => {
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState([]);
  const [duplicadosEmail, setDuplicadosEmail] = useState([]);
  const [duplicadosCedula, setDuplicadosCedula] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  
  const contarDuplicados = (data, campo) => {
    const conteo = new Map();

    data.forEach((fila) => {
      const valor = fila[campo];
      if (!valor) return;
      conteo.set(valor, (conteo.get(valor) || 0) + 1);
    });

    // Filtrar solo los que se repiten 2 o más veces
    const duplicados = [];
    conteo.forEach((cantidad, valor) => {
      if (cantidad > 1) {
        duplicados.push({ valor, cantidad });
      }
    });

    return duplicados;
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];

    if (file && (file.type.includes('spreadsheetml') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))) {
      setArchivo(file);
      setMensaje('');
      leerExcel(file);
    } else {
      setArchivo(null);
      setVistaPrevia([]);
      setDuplicadosEmail([]);
      setDuplicadosCedula([]);
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

      const duplicadosEmail = contarDuplicados(registros, 'EMAIL');
      const duplicadosCedula = contarDuplicados(registros, 'CEDULA');

      setVistaPrevia(registros);
      setDuplicadosEmail(duplicadosEmail);
      setDuplicadosCedula(duplicadosCedula);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubir = async () => {
    if (!vistaPrevia.length) {
      setMensaje('No hay registros para subir.');
      return;
    }

    setCargando(true);
    setMensaje('');

    try {
      const response = await fetch('https://power11-form.onrender.com/api/registro/registro/masivo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          vistaPrevia.map((fila) => ({
            nombre: `${fila['NOMBRE'] || ''} ${fila['APELLIDO'] || ''}`.trim(),
            email: fila['EMAIL'],
            cedula: fila['CEDULA'],
            empresa: fila['EMPRESA'],
            celular: fila['CELULAR'],
            cargo: fila['CARGO'],
            partner: fila['PARTNER']
          }))
        ),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`✅ Insertados: ${data.insertados}. Duplicados locales: ${data.duplicadosLocales.length}, en BD: ${data.duplicadosEnBD.length}`);
        setArchivo(null);
        setVistaPrevia([]);
        setDuplicadosEmail([]);
        setDuplicadosCedula([]);
      } else {
        setMensaje(data.error || '❌ Error procesando los datos');
      }
    } catch (err) {
      console.error('❌ Error de red:', err);
      setMensaje('❌ Error al subir los registros.');
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
      sx={{
        backgroundColor: 'white',
        borderRadius: 1, // opcional para bordes redondeados
      }}
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
        disabled={cargando || !archivo || duplicadosEmail.length > 0 || duplicadosCedula.length > 0}
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
        <Box mt={4} width="100%" overflow="auto" textAlign="left">
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

          {(duplicadosEmail.length > 0 || duplicadosCedula.length > 0) && (
            <Box mt={3} color="error.main">
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                ⚠️ Se encontraron valores duplicados en el archivo:
              </Typography>

              {duplicadosEmail.length > 0 && (
                <>
                  <Typography variant="subtitle2" fontWeight="bold">Emails duplicados:</Typography>
                  <ul>
                    {duplicadosEmail.map((item, i) => (
                      <li key={i}>
                        {item.valor} — {item.cantidad} {item.cantidad > 1 ? 'veces' : 'vez'}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {duplicadosCedula.length > 0 && (
                <>
                  <Typography variant="subtitle2" fontWeight="bold">Cédulas duplicadas:</Typography>
                  <ul>
                    {duplicadosCedula.map((item, i) => (
                      <li key={i}>
                        {item.valor} — {item.cantidad} {item.cantidad > 1 ? 'veces' : 'vez'}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <Typography variant="body2" fontWeight="bold" mt={1}>
                Corrige estos valores antes de subir el archivo.
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Excel;
