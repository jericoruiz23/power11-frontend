import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    Alert,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        cedula: '',
        empresa: '',
        cargo: '',
        opcion: '',
    });
    const empresas = [
        { id: '1', nombre: 'COMWARE' },
        { id: '2', nombre: 'TECSINFO' },
        { id: '3', nombre: 'SOFTCONSULTING' },
        { id: '4', nombre: 'SIFUTURO' },
        { id: '5', nombre: 'MEGASETEC' },
        { id: '6', nombre: 'IOTWARE' },
        { id: '7', nombre: 'BAYTEQ' },
        { id: '8', nombre: 'REDSIS' },
        { id: '9', nombre: 'ADVANCE NETWORKS' },
        { id: '10', nombre: 'IOTWARE' },
        { id: '11', nombre: 'NEXSYS' },
    ];
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setCargando(true);

        try {
            // Concatenar nombre y apellido para enviar en "nombre"
            const nombreCompleto = `${form.nombre.trim()} ${form.apellido.trim()}`.trim();

            const envio = {
                ...form,
                nombre: nombreCompleto,
            };
            delete envio.apellido; // no enviar apellido separado

            const res = await fetch('https://power11-form.onrender.com/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(envio),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Registro exitoso');
                setForm({
                    nombre: '',
                    apellido: '',
                    email: '',
                    cedula: '',
                    empresa: '',
                    cargo: '',
                    opcion: '',
                });
            } else {
                toast.error(data.mensaje || data.error || 'Error en el registro');
            }
        } catch (err) {
            toast.error('No se pudo conectar con el servidor');
            setMensaje('❌ Error al conectar con el servidor');
        }

        setCargando(false);
    };

    return (
        <>
            {/* <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    mt: 8,
                    px: 2,
                    gap: { xs: 1, sm: 3 },
                    overflowX: 'auto',
                }}
            >
                <Box
                    component="img"
                    src="https://www.nexsysla.com/ec/wp-content/uploads/sites/8/2022/06/nexsys-logo-light-2023.png"
                    alt="Logo Nexsys"
                    sx={{ height: { xs: 28, sm: 36, md: 40 }, flexShrink: 0 }}
                />
                <Box
                    component="img"
                    src="https://cdn-icons-png.flaticon.com/512/43/43694.png"
                    alt="Logo Intermedio"
                    sx={{ height: { xs: 28, sm: 36, md: 40 }, flexShrink: 0 }}
                />
                <Box
                    component="img"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png"
                    alt="Logo IBM"
                    sx={{ height: { xs: 28, sm: 36, md: 40 }, flexShrink: 0 }}
                />
            </Box> */}

            <Box p={3} maxWidth={500} mx="auto">
                <Typography variant="h4" gutterBottom align="center" fontWeight="bold" sx={{ fontFamily: 'Arial, sans-serif', marginTop: -2, marginBottom: 3 }}>
                    REGISTRO
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" gap={2}>
                            <TextField
                                label="Nombre"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                    const key = e.key;
                                    if (!/^[a-zA-ZñÑ\sáéíóúÁÉÍÓÚ]$/.test(key)) {
                                        e.preventDefault();
                                    }
                                }}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Apellido"
                                name="apellido"
                                value={form.apellido}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                    const key = e.key;
                                    if (!/^[a-zA-ZñÑ\sáéíóúÁÉÍÓÚ]$/.test(key)) {
                                        e.preventDefault();
                                    }
                                }}
                                fullWidth
                                required
                            />
                        </Box>

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Cédula"
                            name="cedula"
                            value={form.cedula}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                                if (!/^\d$/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Celular"
                            name="celular"
                            value={form.celular}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                                if (!/^\d$/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Empresa"
                            name="empresa"
                            value={form.empresa}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Cargo"
                            name="cargo"
                            value={form.cargo}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                                if (!/^[a-zA-Z\s]*$/.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            fullWidth
                            required
                        />

                        <FormControl fullWidth required>
                            <InputLabel id="empresa-label">Partner Responsable</InputLabel>
                            <Select
                                labelId="empresa-label"
                                name="partner"
                                value={form.partner}
                                label="Partner Responsable"
                                onChange={handleChange}
                            >
                                {empresas.map((empresa) => (
                                    <MenuItem key={empresa.id} value={empresa.nombre}>
                                        {empresa.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box mt={2} display="flex" justifyContent="center">
                            <Button variant="outlined" type="submit" disabled={cargando}>
                                {cargando ? <CircularProgress size={24} /> : 'Registrar'}
                            </Button>
                        </Box>
                    </Box>
                </form>



                {mensaje && (
                    <Box mt={2}>
                        <Alert severity={mensaje.startsWith('✅') ? 'success' : 'error'}>
                            {mensaje}
                        </Alert>
                    </Box>
                )}

                <ToastContainer position="bottom-left" autoClose={3000} />
            </Box>
        </>
    );
}
