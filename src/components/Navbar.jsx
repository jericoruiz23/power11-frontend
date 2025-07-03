import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#202088' }}>
            <Toolbar>
                <Button
                    // variant="outlined"
                    // color="red"
                    color="inherit"
                    component={RouterLink}
                    to="/registro"
                    sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
                >
                    Registro
                </Button>
                <Button
                    // variant="outlined"
                    // color="red"
                    color="inherit"
                    component={RouterLink}
                    to="/"
                    sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' } }}
                >
                    Dashboard
                </Button>
                <Button
                    // variant="outlined"
                    // color="red"
                    color="inherit"
                    component={RouterLink}
                    to="/excel"
                    sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }, marginRight: 2 }}
                >
                    SUBIR EXCEL
                </Button>
            </Toolbar>
        </AppBar>
    );
}
