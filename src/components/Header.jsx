import React from 'react';
import Typography from '@mui/material/Typography';

function Header() {
    return (
        <Typography variant="h2" component="header" sx={{
            position: 'fixed',
            top: '18px',
            bottom: '75vh', // Ajusta el alto del header al 25% del alto de la pantalla
            left: 0,
            width: '100%',
            height: '12%',
            backgroundColor: 'transparent', // Fondo semitransparente para resaltar el título
            padding: '10px 0', // Espaciado vertical
            textAlign: 'center', // Alineación centrada del texto
            zIndex: '1000', // Asegura que esté en la parte superior del z-index
            color: '#FFFFFF' // Color del texto
        }}>
            ToDo List
        </Typography>
    );
}

export default Header;
