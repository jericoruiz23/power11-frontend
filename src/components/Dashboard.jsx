import React, { useEffect, useState } from 'react';
import {
    Box,
    TextField,
    useMediaQuery,
    useTheme,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Typography,
    DialogContent,
    DialogTitle,
    Dialog,
    DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
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
                toast.success(`✅ ${data.mensaje}`);
            } else {
                toast.error(`❌ ${data.error || 'No se pudo enviar los correos.'}`);
            }
        } catch (error) {
            console.error('Error en el envío masivo:', error);
            toast.error(`❌ ${error.message || 'Error al enviar los QR.'}`);
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
        { field: 'empresa', headerName: 'Empresa', flex: 0.7 },
        {
            field: 'estado',
            headerName: 'Ingreso',
            flex: 0.5,
            renderCell: (params) =>
                params.value === 'inactivo' ? (
                    <CheckCircle style={{ color: 'green' }} />
                ) : (
                    <Cancel style={{ color: 'red' }} />
                ),
        },
    ];

    const columnasExtras = [
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'cedula', headerName: 'Cédula', flex: 0.8 },
        { field: 'cargo', headerName: 'Cargo', flex: 1 },
        {
            field: 'correoEnviado',
            headerName: 'QR Enviado',
            flex: 0.75,
            renderCell: (params) =>
                params.value ? (
                    <CheckCircle style={{ color: 'green' }} titleAccess="Correo enviado" />
                ) : (
                    <Cancel style={{ color: 'red' }} titleAccess="No enviado" />
                ),
        }
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
            r.estado?.toLowerCase().includes(texto)
        );
    });

    return (
        <Box p={3} height="100vh" display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    sx={{ mb: 2, maxWidth: 400 }}
                />
                <Box display="flex" gap={2}>
                    <Button
                        variant="outlined"
                        // color="error"
                        onClick={handleEnvioMasivo}
                        disabled={enviando}
                        sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }, marginRight: 2 }}
                    >
                        {enviando ? 'Enviando...' : 'Enviar QR'}
                    </Button>
                    <ExportarCSV tablaData={registrosFiltrados} enviando={enviando} />
                </Box>

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
        </Box>
    );
}
