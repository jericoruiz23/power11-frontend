import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import logo from './navbar_logo.png'; // Ajusta la ruta si es diferente

const navItems = [
    { text: 'Registro', to: '/registro' },
    { text: 'Dashboard', to: '/' },
    { text: 'SUBIR EXCEL', to: '/excel' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={RouterLink} to={item.to}>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

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

                    {/* Desktop buttons */}
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

                    {/* Hamburger menu for mobile */}
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ display: { xs: 'flex', md: 'none' }, marginRight: '1rem' }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer menu */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
            >
                {drawer}
            </Drawer>
        </>
    );
}
