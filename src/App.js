import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Formulario from './components/Form';
import Excel from './components/Excel';
import Scanner from './components/Scanner'
import Insights from './components/Insights'

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/registro" element={<Formulario />} />
          <Route path="/excel" element={<Excel />} />
          <Route path="/qrscanner" element={<Scanner />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Container>
    </>
  );
}
