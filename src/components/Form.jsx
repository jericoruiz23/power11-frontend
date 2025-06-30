import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        cedula: '',
        empresa: '',
        cargo: '',
    });

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
            const res = await fetch('https://power11-form.onrender.com/api/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Registro exitoso');
                setMensaje(`✅ Usuario registrado correctamente. Token: ${data.token}`);
                setForm({
                    nombre: '',
                    email: '',
                    cedula: '',
                    empresa: '',
                    cargo: '',
                });
            } else {
                toast.error(data.mensaje || data.error || 'Error en el registro');
                setMensaje(`❌ Error: ${data.mensaje || data.error}`);
            }
        } catch (err) {
            toast.error('No se pudo conectar con el servidor');
            setMensaje('❌ Error al conectar con el servidor');
        }

        setCargando(false);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, mt: 9 }}>
                <img
                    src="https://www.nexsysla.com/ec/wp-content/uploads/sites/8/2022/06/nexsys-logo-light-2023.png"
                    alt="Logo"
                    style={{ height: 40, marginRight: 16 }}
                />
                <img
                    src="https://cdn-icons-png.flaticon.com/512/43/43694.png"
                    alt="Logo"
                    style={{ height: 40, marginRight: 16 }}
                />
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png"
                    alt="Logo"
                    style={{ height: 40, marginRight: 16 }}
                />
            </Box>
            <Box p={3} maxWidth={500} mx="auto">
                <Typography variant="h4" gutterBottom align="center" fontWeight="bold" sx={{ fontFamily: 'Arial, sans-serif' }}>
                    REGISTRO
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Cédula"
                        name="cedula"
                        value={form.cedula}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Empresa"
                        name="empresa"
                        value={form.empresa}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Cargo"
                        name="cargo"
                        value={form.cargo}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />

                    <Box mt={2}>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button variant="outlined" color="error" type="submit" disabled={cargando}>
                                {cargando ? <CircularProgress size={24} /> : 'Registrar'}
                            </Button>
                        </Box>
                        {/* <Box display="flex" justifyContent="center" mt={2}>
                            <Button variant="outlined" color="error" disabled={cargando}>
                                {cargando ? <CircularProgress size={24} /> : 'Subir Excel'}
                            </Button>
                        </Box> */}

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
