import React, { useEffect, useState } from 'react';
import {
    Box, TextField, useMediaQuery, useTheme, IconButton, Menu, MenuItem, Button, Typography, DialogContent, DialogTitle, Dialog, DialogActions, CircularProgress 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MenuIcon from '@mui/icons-material/Menu';
import { CheckCircle, Cancel, MoreVert } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExportarCSV from './Export';

const BASE_URL = 'https://power11-form.onrender.com/api/registro';

export default function DashboardRegistros() {
    const [registros, setRegistros] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [cargando, setCargando] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [qrDialogOpen, setQrDialogOpen] = useState(false);
    const [qrImage, setQrImage] = useState('');
    const [enviando, setEnviando] = useState(false);
    const theme = useTheme();
    const esMovil = useMediaQuery(theme.breakpoints.down('sm'));
    const [menuAnchorEl, setMenuAnchorEl] = useState(null); // nuevo estado para el menú

    const abrirMenu = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const cerrarMenu = () => {
        setMenuAnchorEl(null);
    };

    useEffect(() => {
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                setRegistros(data);
                setCargando(false);
            })
            .catch((err) => {
                console.error('Error al cargar registros:', err);
                setCargando(false);
            });
    }, []);

    // Función para mostrar el toast con confirmación
    const mostrarConfirmacionToast = () => {
        const ToastConfirm = ({ closeToast }) => (
            <div style={{ width: 600, padding: '16px' }}>
                <Typography variant="body1" gutterBottom>
                    Se enviará un correo con el código QR únicamente a los usuarios registrados <strong>que aún no han recibido su invitación</strong>.<br />
                    ¿Deseas continuar con el envío?
                </Typography>
                <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => closeToast()}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                            closeToast();
                            confirmarEnvioMasivo();
                        }}
                        disabled={enviando}
                    >
                        Enviar
                    </Button>
                </Box>
            </div>
        );


        toast.info(<ToastConfirm />, {
            position: "bottom-left",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false,
            style: { minWidth: '600px', maxWidth: '700px' },
        });
    };

    // Reemplaza el handler original para que muestre el toast
    const handleEnvioMasivo = () => {
        mostrarConfirmacionToast();
    };

    // Función para enviar correos masivo
    const confirmarEnvioMasivo = async () => {
        setEnviando(true);
        try {
            const response = await fetch('https://power11-form.onrender.com/api/registro/registro/enviar-masivo', {
                method: 'POST',
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(`${data.mensaje}`);
            } else {
                toast.error(`${data.error || 'No se pudo enviar los correos.'}`);
            }
        } catch (error) {
            console.error('Error en el envío masivo:', error);
            toast.error(`${error.message || 'Error al enviar los QR.'}`);
        } finally {
            setEnviando(false);
        }
    };

    const handleMenuClick = (event, registro) => {
        setAnchorEl(event.currentTarget);
        setRegistroSeleccionado(registro);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setRegistroSeleccionado(null);
    };

    const mostrarQR = async () => {
        if (!registroSeleccionado?.token) return;

        try {
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=https://power11-form.onrender.com/api/registro/verificar/${registroSeleccionado.token}&size=200x200`;
            setQrImage(qrUrl);
            setQrDialogOpen(true);
        } catch (error) {
            alert('Error generando QR');
        } finally {
            handleMenuClose();
        }
    };

    const eliminarRegistro = async () => {
        try {
            await fetch(`${BASE_URL}/${registroSeleccionado._id}`, {
                method: 'DELETE',
            });
            setRegistros((prev) => prev.filter((r) => r._id !== registroSeleccionado._id));
        } catch (error) {
            alert('Error al eliminar registro');
        } finally {
            handleMenuClose();
        }
    };

    const columnasBase = [
        { field: 'nombre', headerName: 'Nombre', flex: .8 },
        { field: 'empresa', headerName: 'Empresa', flex: .7 },
    ];

    const columnasExtras = [
        { field: 'email', headerName: 'Email', flex: 1.3 },
        { field: 'cedula', headerName: 'Cédula', flex: .6 },
        { field: 'cargo', headerName: 'Cargo', flex: .8 },
        { field: 'partner', headerName: 'B Partner', flex: .8 },
        {
            field: 'correoEnviado',
            headerName: 'QR Enviado',
            flex: 0.55,
            renderCell: (params) => (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%" // 🔥 esto asegura el centrado vertical
                >
                    {params.value ? (
                        <CheckCircle style={{ color: 'green' }} titleAccess="Correo enviado" />
                    ) : (
                        <Cancel style={{ color: 'red' }} titleAccess="No enviado" />
                    )}
                </Box>
            ),
        },
        {
            field: 'estado',
            headerName: 'Ingreso',
            flex: 0.4,
            renderCell: (params) => (
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="100%"
                >
                    {params.value === 'inactivo' ? (
                        <CheckCircle style={{ color: 'green' }} />
                    ) : (
                        <Cancel style={{ color: 'red' }} />
                    )}
                </Box>
            ),
        },
    ];

    const columnaAcciones = {
        field: 'acciones',
        headerName: '',
        width: 80,
        renderCell: (params) => (
            <IconButton onClick={(e) => handleMenuClick(e, params.row)}>
                <MoreVert />
            </IconButton>
        ),
        sortable: false,
        filterable: false,
    };

    const columnas = esMovil
        ? [...columnasBase, columnaAcciones]
        : [...columnasBase, ...columnasExtras, columnaAcciones];

    const registrosFiltrados = registros.filter((r) => {
        const texto = filtro.toLowerCase();
        return (
            r.nombre?.toLowerCase().includes(texto) ||
            r.email?.toLowerCase().includes(texto) ||
            r.cedula?.toLowerCase().includes(texto) ||
            r.empresa?.toLowerCase().includes(texto) ||
            r.cargo?.toLowerCase().includes(texto) ||
            r.partner?.toLowerCase().includes(texto) ||
            r.estado?.toLowerCase().includes(texto)
        );
    });

    return (
        <Box
            p={{ xs: 2, sm: 3 }}
            // pt={{ xs: 10, sm: 12 }} // espacio para el navbar flotante
            minHeight="100vh"
            display="flex"
            flexDirection="column"
        >

            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                gap={1}
            >
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    sx={{
                        flexGrow: 1,
                        maxWidth: esMovil ? '100%' : 400,
                    }}
                />

                {esMovil ? (
                    <>
                        <IconButton onClick={abrirMenu}>
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            anchorEl={menuAnchorEl}
                            open={Boolean(menuAnchorEl)}
                            onClose={cerrarMenu}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                                sx: {
                                    background: 'rgb(255, 255, 255)',
                                    WebkitBackdropFilter: 'blur(10px)',
                                    borderRadius: 2,
                                    color: '#000',
                                    minWidth: 200,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    py: 1,
                                },
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    cerrarMenu();
                                    handleEnvioMasivo();
                                }}
                                sx={{
                                    justifyContent: 'center', // centra el texto
                                    width: '100%',
                                }}
                            >
                                {enviando ? 'Enviando...' : 'Enviar QR'}
                            </MenuItem>

                            <MenuItem
                                onClick={cerrarMenu}
                                sx={{
                                    justifyContent: 'center',
                                    width: '100%',
                                }}
                            >
                                <ExportarCSV tablaData={registrosFiltrados} enviando={enviando} asMenuItem />
                            </MenuItem>
                        </Menu>

                    </>
                ) : (
                    <Box display="flex" gap={2}>
                        <Button
                            variant="outlined"
                            onClick={handleEnvioMasivo}
                            disabled={enviando}
                            sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }, marginRight: 2 }}
                        >
                            {enviando ? 'Enviando...' : 'Enviar QR'}
                        </Button>
                        <ExportarCSV tablaData={registrosFiltrados} enviando={enviando} />
                    </Box>
                )}
            </Box>

            <Box flexGrow={1}>
                <DataGrid
                    rows={registrosFiltrados}
                    columns={columnas}
                    getRowId={(row) => row._id}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    loading={cargando}
                    disableSelectionOnClick
                    autoHeight={!esMovil}
                />
            </Box>

            {/* Menú contextual */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={mostrarQR}>Mostrar QR</MenuItem>
                <MenuItem onClick={eliminarRegistro}>Eliminar</MenuItem>
            </Menu>

            {/* Diálogo QR */}
            <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)}>
                <DialogTitle>Código QR</DialogTitle>
                <DialogContent>
                    {qrImage ? (
                        <>
                            <img src={qrImage} alt="QR" style={{ maxWidth: '100%' }} />
                            <Typography variant="body2" mt={1}>
                                Escanea para registrar ingreso
                            </Typography>
                        </>
                    ) : (
                        'Cargando QR...'
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setQrDialogOpen(false)}>Cerrar</Button>
                </DialogActions>
            </Dialog>

            <ToastContainer position="bottom-left" autoClose={4000} />
            {enviando && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100vw"
                    height="100vh"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="rgba(255, 255, 255, 0.7)"
                    zIndex={2000}
                >
                    <Box textAlign="center">
                        <CircularProgress />
                        <Typography mt={2}>Enviando correos...</Typography>
                    </Box>
                </Box>
            )}

        </Box>

    );

}
