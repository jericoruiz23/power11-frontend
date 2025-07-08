import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
} from '@mui/material';

import Widget from './Widget1'
import Widget2 from './Widget2'

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
        { label: 'Registrados Totales', value: data.totalRegistrados },
        { label: 'Asistentes', value: data.totalAsistentes },
        { label: 'Porcentaje de Asistencia', value: `${data.porcentajeAsistencia}%` },
        { label: 'Asistentes Nuevos', value: data.nuevosAsistentes },
    ];

    return (
        <Box p={{ xs: 2, md: 4 }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                textAlign="center"
                sx={{ fontFamily: 'Arial, sans-serif' }}
            >
                Estadísticas
            </Typography>
            <Grid item xs={12} sm={6} md={3}>
                <Widget />
                {/* <Widget2 /> */}

            </Grid>
        </Box>
    );
}
