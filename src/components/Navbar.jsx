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
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import logo from './navbar_logo.png';

const navItems = [
    { text: 'Registro', to: '/registro' },
    { text: 'Dashboard', to: '/' },
    { text: 'SUBIR EXCEL', to: '/excel' },
];

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#005cb1' }}>
                <Toolbar sx={{ minHeight: 64, display: 'flex', justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box display="flex" alignItems="center">
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ height: 40, marginLeft: '1rem', marginRight: 16, display: 'block' }}
                        />
                    </Box>

                    {/* Botones en desktop */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            gap: 2,
                            marginRight: '1rem',
                        }}
                    >
                        {navItems.map((item) => (
                            <Button
                                key={item.text}
                                color="inherit"
                                component={RouterLink}
                                to={item.to}
                                sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>

                    {/* Menú hamburguesa en móviles */}
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
                        >
                            {navItems.map((item) => (
                                <MenuItem
                                    key={item.text}
                                    component={RouterLink}
                                    to={item.to}
                                    onClick={handleMenuClose}
                                >
                                    {item.text}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}
