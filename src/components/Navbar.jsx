import React, { useState } from 'react';
import {
    Box,
    Toolbar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import logo from './navbar_logo.png';

const navItems = [
    { text: 'Registro', to: '/registro' },
    { text: 'Reporte', to: '/' },
    { text: 'Upload', to: '/excel' },
    { text: 'Scanner', to: '/qrscanner' },
    { text: 'Dashboard', to: '/insights' },
];

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <>
            {/* NAVBAR FLOTANTE */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '16px',
                    zIndex: 1200,  // menos que el navbar (1300)
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                }}
            />
            <Box
                sx={{
                    position: 'fixed',
                    top: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '95%',
                    maxWidth: 1200,
                    zIndex: 1300,
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: '20px',
                        background: 'rgba(0, 47, 255, 0.87)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(14px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingY: 1,
                        }}
                    >
                        {/* Logo */}
                        <Box display="flex" alignItems="center">
                            <RouterLink to="/registro" style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{
                                        height: 36,
                                        marginLeft: '1rem',
                                        marginRight: 16,
                                        marginTop: 3.5,  // 🔽 Baja un poco el logo
                                        cursor: 'pointer',
                                    }}
                                />
                            </RouterLink>
                        </Box>

                        {/* Botones en desktop */}
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                gap: 3,
                                marginRight: '1rem',
                            }}
                        >
                            {navItems.map((item) => (
                                <Button
                                    key={item.text}
                                    component={RouterLink}
                                    to={item.to}
                                    sx={{
                                        color: '#fff',
                                        transition: 'transform 0.3s ease, color 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                            color: '#fff', // puedes mantener el color blanco o cambiarlo si quieres
                                        },
                                    }}
                                >
                                    {item.text}
                                </Button>

                            ))}
                        </Box>

                        {/* Menú hamburguesa */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                color="inherit"
                                edge="end"
                                onClick={handleMenuOpen}
                                sx={{ marginRight: '1rem' }}
                            >
                                <MenuIcon sx={{ color: '#fff' }} />
                            </IconButton>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                PaperProps={{
                                    sx: {
                                        background: 'rgb(255, 255, 255)',
                                        WebkitBackdropFilter: 'blur(10px)',
                                        borderRadius: 2,
                                        color: '#000',
                                    },
                                }}
                            >
                                {navItems.map((item) => (
                                    <MenuItem
                                        key={item.text}
                                        component={RouterLink}
                                        to={item.to}
                                        onClick={handleMenuClose}
                                        sx={{}}
                                    >
                                        {item.text}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Paper>
            </Box>


            {/* ESPACIADOR para evitar solapamiento */}
            <Box sx={{ height: '80px' }} />
        </>
    );
}
