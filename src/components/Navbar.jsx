import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from './navbar_logo.png'; // Ajusta la ruta si es diferente

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#005cb1' }}>
            <Toolbar>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                >
                    {/* Logo a la izquierda */}
                    <Box display="flex" alignItems="center">
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ height: 40, marginRight: 16 }}
                        />
                    </Box>

                    {/* Botones a la derecha */}
                    <Box display="flex" alignItems="center" gap={2}>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/registro"
                            sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
                        >
                            Registro
                        </Button>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/"
                            sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
                        >
                            Dashboard
                        </Button>
                        <Button
                            color="inherit"
                            component={RouterLink}
                            to="/excel"
                            sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }, marginRight: 2 }}
                        >
                            SUBIR EXCEL
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
