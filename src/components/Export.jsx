import React from 'react';
import { Button, Typography } from '@mui/material';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportarCSV = ({ tablaData = [], enviando = false, asMenuItem = false }) => {
    const columnasExportadas = ['nombre', 'empresa', 'email', 'cedula', 'cargo'];

    const handleExportarCSV = () => {
        if (!Array.isArray(tablaData) || tablaData.length === 0) {
            console.warn('No hay datos para exportar');
            return;
        }

        const datosFiltrados = tablaData.map((item) =>
            columnasExportadas.reduce((obj, key) => {
                obj[key] = item[key];
                return obj;
            }, {})
        );

        const worksheet = XLSX.utils.json_to_sheet(datosFiltrados);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

        const excelBuffer = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'text/csv;charset=utf-8;' });

        saveAs(blob, 'datos_exportados.csv');
    };

    if (asMenuItem) {
        return (
            <Typography
                onClick={handleExportarCSV}
                sx={{
                    cursor: 'pointer',
                    paddingY: 1,
                    paddingX: 2,
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    width: '100%',
                }}
            >
                Exportar CSV
            </Typography>
        );
    }

    return (
        <Button
            variant="outlined"
            onClick={handleExportarCSV}
            disabled={enviando}
            sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }, marginRight: 2 }}
        >
            EXPORTAR CSV
        </Button>
    );
};

export default ExportarCSV;
