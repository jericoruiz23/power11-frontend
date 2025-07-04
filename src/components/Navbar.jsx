import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
    Container,
    Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, Outlet } from 'react-router-dom'; // Usa Outlet si usas layout
import logo from './navbar_logo.png';

const navItems = [
    { text: 'REGISTRO', to: '/registro' },
    { text: 'REPORTE', to: '/' },
    { text: 'SUBIR EXCEL', to: '/excel' },
    { text: 'DASHBOARD', to: '/dashboard' },
];

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <>
            {/* NAVBAR FLOTANTE */}
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
                        background: 'rgba(0, 4, 255, 0.85)',
                        backdropFilter: 'blur(14px)',
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
                            <img
                                src={logo}
                                alt="Logo"
                                style={{ height: 36, marginLeft: '1rem', marginRight: 16 }}
                            />
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
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        fontSize: '0.85rem',
                                        letterSpacing: '1px',
                                        transition: '0.3s',
                                        '&:hover': {
                                            color: '#00eaff',
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
                                <MenuIcon />
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
                                        // backdropFilter: 'blur(10px)',
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
                                        sx={{
                                            fontWeight: 500,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                        }}
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

            {/* Si estás usando layout con <Outlet />, puedes ponerlo aquí */}
            {/* <Outlet /> */}
        </>
    );
}
