import React, { useState } from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {QrScanner} from 'react-qr-scanner';

export default function EscanerQR() {
    const [resultado, setResultado] = useState('');
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    const handleScan = async (data) => {
        if (data) {
            setCargando(true);
            setResultado('');
            setError('');
            try {
                // data.text contiene la URL escaneada
                const res = await fetch(data.text);
                const json = await res.json();

                if (res.ok) {
                    setResultado(json.mensaje || 'Acceso registrado correctamente');
                    toast.success(json.mensaje || 'Acceso registrado correctamente');
                } else {
                    setResultado('');
                    setError(json.mensaje || 'Error al verificar QR');
                    toast.error(json.mensaje || 'Error al verificar QR');
                }
            } catch (e) {
                setResultado('');
                setError('Error conectando con el servidor');
                toast.error('Error conectando con el servidor');
            }
            setCargando(false);
        }
    };

    const handleError = (err) => {
        console.error(err);
        setError('Error con la cámara o lectura del QR');
        toast.error('Error con la cámara o lectura del QR');
    };

    return (
        <Box p={3} maxWidth={600} mx="auto" textAlign="center">
            <Typography variant="h5" gutterBottom>
                Escáner de Código QR
            </Typography>

            <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />

            {cargando && <CircularProgress sx={{ mt: 2 }} />}

            {resultado && <Alert severity="success" sx={{ mt: 2 }}>{resultado}</Alert>}

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <ToastContainer position="bottom-left" autoClose={3000} />
        </Box>
    );
}
