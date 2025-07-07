import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
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
                        console.log("✅ QR detectado:", decodedText);
                        detenerScanner();

                        let token = decodedText;

                        if (decodedText.startsWith("http")) {
                            try {
                                const url = new URL(decodedText);
                                token = url.pathname.split("/").pop();
                                console.log("🎯 Token extraído:", token);
                            } catch (err) {
                                console.error("QR mal formado:", decodedText);
                                setResultado("⚠️ Código QR no válido.");
                                setOpenDialog(true);
                                return;
                            }
                        }

                        const endpoint = `https://power11-form.onrender.com/api/registro/verificar/${token}`;
                        console.log("📡 Consultando:", endpoint);

                        fetch(endpoint, {
                            headers: {
                                'x-app-secret': 'un-secreto-muy-fuerte-que-no-vas-a-compartir'
                            }
                        })
                            .then(res => res.text())
                            .then(html => {
                                console.log("📥 Respuesta recibida:");
                                console.log(html);
                                setResultado(html);
                                setOpenDialog(true);
                            })
                            .catch(err => {
                                console.error("❌ Error en fetch:", err);
                                setResultado('Error al verificar el QR. Intenta nuevamente.');
                                setOpenDialog(true);
                            });
                    },
                    (error) => {
                        // errores frecuentes pueden ignorarse
                    }
                );
                isRunning.current = true;
            } catch (err) {
                console.error("Error al iniciar escáner:", err);
            }
        }
    }, [detenerScanner]);

    const manejarCerrarDialogo = () => {
        console.log("🔄 Reiniciando escaneo");
        setOpenDialog(false);
        iniciarScanner();
    };

    useEffect(() => {
        iniciarScanner();
        return () => {
            detenerScanner();
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
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                    <div
                        dangerouslySetInnerHTML={{ __html: resultado }}
                        style={{
                            fontSize: 16,
                            color: '#222',
                            wordBreak: 'break-word',
                            padding: '12px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '8px',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                            overflowY: 'auto',
                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            lineHeight: 1.5,
                        }}
                    />
                </DialogContent>

                {/* Aquí centramos el botón */}
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={manejarCerrarDialogo} variant="outlined" color="primary">
                        Escanear otro usuario
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
