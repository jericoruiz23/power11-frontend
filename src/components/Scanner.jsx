import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Box, Typography } from '@mui/material';

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
        <Box p={3}>
            <Typography variant="h6" gutterBottom>
                Escanea tu código QR
            </Typography>
            <div id={qrRegionId} style={{ width: '100%' }} />
            {resultado && (
                <Typography variant="body1" mt={2}>
                    QR Detectado: {resultado}
                </Typography>
            )}
        </Box>
    );
}
