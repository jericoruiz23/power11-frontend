import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Html5Qrcode } from 'html5-qrcode';

const qrRegionId = "qr-reader";

export default function Scanner() {
    const [resultado, setResultado] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const scannerRef = useRef(null);
    const qrCodeScanner = useRef(null);

    const iniciarScanner = () => {
        if (!qrCodeScanner.current) {
            qrCodeScanner.current = new Html5Qrcode(qrRegionId);
        }

        qrCodeScanner.current.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            (decodedText) => {
                qrCodeScanner.current.stop().then(() => {
                    setResultado(decodedText);
                    setOpenDialog(true);
                });
            },
            (error) => {
                // puedes loguear errores si quieres
            }
        ).catch((err) => console.error("Error al iniciar escáner", err));
    };

    const manejarCerrarDialogo = () => {
        setOpenDialog(false);
        iniciarScanner(); // Reiniciar escaneo
    };

    useEffect(() => {
        iniciarScanner();

        return () => {
            if (qrCodeScanner.current) {
                qrCodeScanner.current.stop().then(() => {
                    qrCodeScanner.current.clear();
                });
            }
        };
    }, []);

    return (
        <Box
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Typography variant="h6" gutterBottom>
                Escanea tu código QR
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
                }}
            />

            {/* Dialog con el resultado del QR */}
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
