import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';

export default function Insights() {
    const [data, setData] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const res = await fetch('https://power11-form.onrender.com/api/registro/insights');
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error('Error al obtener insights:', err);
            } finally {
                setCargando(false);
            }
        };

        obtenerDatos();
    }, []);

    if (cargando) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!data) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h6" color="error">
                    No se pudieron cargar los datos.
                </Typography>
            </Box>
        );
    }

    const cards = [
        { label: 'Registrados Totales', value: data.totalRegistrados, color: '#1976d2' },
        { label: 'Asistentes', value: data.totalAsistentes, color: '#2e7d32' },
        { label: 'Porcentaje de Asistencia', value: `${data.porcentajeAsistencia}%`, color: '#f57c00' },
        { label: 'Asistentes Nuevos', value: data.nuevosAsistentes, color: '#6a1b9a' },
    ];

    return (
        <Box p={3}>
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                Insights del Evento
            </Typography>
            <Grid container spacing={3}>
                {cards.map((card, i) => (
                    <Grid item xs={12} sm={12} md={3} key={i}>
                        <Card
                            sx={{
                                backgroundColor: card.color,
                                color: '#fff',
                                borderRadius: 3,
                                boxShadow: 3,
                                textAlign: 'center',
                                p: 2,
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6">{card.label}</Typography>
                                <Typography variant="h4" fontWeight="bold">
                                    {card.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
