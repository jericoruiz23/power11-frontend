import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { CWidgetStatsB } from '@coreui/react';

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

    // Calcular progreso en unidades absolutas
    const totalEsperado = data.totalRegistrados + data.nuevos;
    const progresoAsistentes = totalEsperado > 0
        ? Math.round((data.totalAsistentes / totalEsperado) * 100)
        : 0;

    return (
        <Box p={{ xs: 2, md: 4 }} mt={-2}>
            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                textAlign="center"
                sx={{ fontFamily: 'Arial, sans-serif' }}
            >
                Estadísticas
            </Typography>

            {/* Contenedor flex para todos los widgets */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    justifyContent: 'flex-start',
                    marginTop: 4,
                }}
            >
                {/* Widget 2: Total Asistentes (barra proporcional al total esperado) */}
                <Box sx={{ width: { xs: '100%', md: '48%' }, height: 180 , mt:1, mb:-2 }}>
                    <CWidgetStatsB
                        className="mb-4 custom-progress-blue"
                        progress={{ value: progresoAsistentes }}
                        text={`De un total esperado de ${totalEsperado}`}
                        title="Total Asistentes"
                        value={`${data.totalAsistentes}`}
                        style={{ height: '80%' }}
                    />
                </Box>

                {/* Widget 3: Porcentaje asistencia */}
                <Box sx={{ width: { xs: '100%', md: '48%'}, height: 180 , mt:1}}>
                    <CWidgetStatsB
                        className="mb-4 custom-inverse-blue"
                        inverse
                        progress={{ value: data.porcentajeAsistencia }}
                        text="Porcentaje asistencia"
                        title="Porcentaje asistencia"
                        value={`${data.porcentajeAsistencia}%`}
                        style={{ height: '80%' }}
                    />
                </Box>

                {/* Widget 1: Total Registrados */}
                <Box sx={{ width: { xs: '100%', md: '48%' }, height: 180 , mt:-2 }}>
                    <CWidgetStatsB
                        className="mb-4 custom-inverse-blue"
                        inverse
                        progress={{ value: 100 }}
                        text="Forms"
                        title="Registros"
                        value={`${data.totalRegistrados}`}
                        style={{ height: '80%' }}
                    />
                </Box>
                

                {/* Widget 4: Registros Nuevos */}
                <Box sx={{ width: { xs: '100%', md: '48%'}, height: 180, mt:-2  }}>
                    <CWidgetStatsB
                        className="mb-4 custom-progress-blue"
                        progress={{ value: data.nuevos === 0 ? 0 : 100 }}
                        text="App"
                        title="Registros"
                        value={`${data.nuevos}`}
                        style={{ height: '80%' }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
