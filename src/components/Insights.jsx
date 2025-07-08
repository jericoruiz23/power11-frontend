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
                    marginTop: 2,
                }}
            >
                {/* Widget 1 */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '48%' }, // 1 por fila móvil, 2 por fila escritorio
                        height: 180,
                    }}
                >
                    <CWidgetStatsB
                        className="mb-4 custom-progress-blue"
                        progress={{ value: 60 }}
                        text="Usuarios nuevos"
                        title="Progreso del día"
                        value="73.2%"
                        style={{ height: '100%' }}
                    />
                </Box>

                {/* Widget 2 */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '48%' },
                        height: 180,
                    }}
                >
                    <CWidgetStatsB
                        className="mb-4 custom-inverse-blue"
                        inverse
                        progress={{ value: 60 }}
                        text="Usuarios que ingresaron"
                        title="Porcentaje asistentes"
                        value="73.2%"
                        style={{ height: '100%' }}
                    />
                </Box>

                {/* Widget 3 */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '48%' },
                        height: 180,
                    }}
                >
                    <CWidgetStatsB
                        className="mb-4 custom-inverse-blue"
                        inverse
                        progress={{ value: 60 }}
                        text="Usuarios que ingresaron"
                        title="Porcentaje asistentes"
                        value="73.2%"
                        style={{ height: '100%' }}
                    />
                </Box>

                {/* Widget 4 */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '48%' },
                        height: 180,
                    }}
                >
                    <CWidgetStatsB
                        className="mb-4 custom-progress-blue"
                        progress={{ value: 60 }}
                        text="Usuarios nuevos"
                        title="Progreso del día"
                        value="73.2%"
                        style={{ height: '100%' }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
