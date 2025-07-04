import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Box, Typography, Paper } from '@mui/material';

export default function Scanner() {
    const qrRegionId = 'reader';
    const [resultado, setResultado] = useState('');
    const scannerRef = useRef(null);

    useEffect(() => {
        const html5QrCode = new Html5Qrcode(qrRegionId);
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        html5QrCode
            .start(
                { facingMode: 'environment' },
                config,
                (decodedText) => {
                    setResultado(decodedText);
                    html5QrCode.stop().then(() => {
                        console.log('Escaneo detenido');
                        // Aquí puedes hacer fetch a tu API con tu secret key
                    });
                },
                (errorMessage) => {
                    // console.warn(`QR no detectado: ${errorMessage}`);
                }
            )
            .catch((err) => {
                console.error('No se pudo iniciar el escáner', err);
            });

        scannerRef.current = html5QrCode;

        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch((err) => console.log('Error al detener', err));
            }
        };
    }, []);

    return (
        <Box p={3} display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Paper
                elevation={4}
                sx={{
                    padding: 4,
                    borderRadius: 3,
                    maxWidth: 500,
                    width: '100%',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(6px)',
                }}
            >
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Escanea tu código QR
                </Typography>

                <Box
                    id={qrRegionId}
                    sx={{
                        width: '100%',
                        border: '2px dashed #0033cc',
                        borderRadius: 2,
                        mt: 2,
                        mb: 2,
                        aspectRatio: '1 / 1', // Mantener cuadrado
                        backgroundColor: '#f9f9f9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                />

                {resultado && (
                    <Typography variant="body1" color="green" mt={2}>
                        ✅ QR Detectado: <strong>{resultado}</strong>
                    </Typography>
                )}
            </Paper>
        </Box>
    );
}
