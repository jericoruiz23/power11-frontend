import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Html5Qrcode } from 'html5-qrcode';

const qrRegionId = "qr-reader";

export default function Scanner() {
    const [resultado, setResultado] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const qrCodeScanner = useRef(null);
    const isRunning = useRef(false);

    const detenerScanner = useCallback(async () => {
        if (qrCodeScanner.current && isRunning.current) {
            try {
                await qrCodeScanner.current.stop();
                await qrCodeScanner.current.clear();
                isRunning.current = false;
            } catch (err) {
                console.warn("Error al detener escáner:", err);
            }
        }
    }, []);

    const iniciarScanner = useCallback(async () => {
        if (!qrCodeScanner.current) {
            qrCodeScanner.current = new Html5Qrcode(qrRegionId);
        }

        if (!isRunning.current) {
            try {
                await qrCodeScanner.current.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 }
                    },
                    (decodedText) => {
                        detenerScanner(); // Detener inmediatamente al detectar
                        setResultado(decodedText);
                        setOpenDialog(true);
                    },
                    (error) => {
                        // Errores de lectura frecuentes pueden ignorarse
                    }
                );
                isRunning.current = true;
            } catch (err) {
                console.error("Error al iniciar escáner:", err);
            }
        }
    }, [detenerScanner]);

    const manejarCerrarDialogo = () => {
        setOpenDialog(false);
        iniciarScanner(); // Reinicia escaneo al cerrar el resultado
    };

    useEffect(() => {
        iniciarScanner();

        return () => {
            detenerScanner(); // Limpiar cámara al desmontar componente
        };
    }, [iniciarScanner, detenerScanner]);

    return (
        <Box
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Typography variant="h6" gutterBottom>
                Escanea el código QR
            </Typography>

            <Box
                id={qrRegionId}
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: '60vh',
                    border: '2px dashed #1976d2',
                    borderRadius: 2,
                    backgroundColor: '#f5f5f5',
                    mt: 2,
                    '& video': {
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    },
                    '& canvas': {
                        display: 'none',
                    },
                }}
            />

            <Dialog
                open={openDialog}
                onClose={manejarCerrarDialogo}
                aria-labelledby="resultado-qr"
            >
                <DialogTitle id="resultado-qr">Código QR Detectado</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                        {resultado}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={manejarCerrarDialogo} variant="contained" color="primary">
                        Escanear otro usuario
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
