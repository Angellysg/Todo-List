import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
    return (
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, marginTop: 'auto' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '1%', marginBottom: '1%' }}>
                    <Typography variant="body1" color="black">
                        Made with <span role="img" aria-label="heart">❤️</span> by Angelly Sepulveda
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                        <IconButton
                            sx={{
                                color: '#FFFFFF', // Color blanco por defecto
                                '&:hover': {
                                    color: '#FFFFFF', // Cambio de color al blanco en hover
                                    boxShadow: '0px 0px 8px 0px #ff9800', // Sombra naranja en hover
                                },
                            }}
                            aria-label="linkedin"
                            href="https://www.linkedin.com/in/angellysg/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedInIcon />
                        </IconButton>

                        <IconButton
                            sx={{
                                color: '#FFFFFF', // Color blanco por defecto
                                '&:hover': {
                                    color: '#ffffff', // Cambio de color al naranja en hover
                                    boxShadow: '0px 0px 8px 0px #ff9800', // Sombra naranja en hover
                                },
                            }}
                            aria-label="github"
                            href="https://github.com/Angellysg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon />
                        </IconButton>
                        <IconButton
                            sx={{
                                color: '#FFFFFF', // Color blanco por defecto
                                '&:hover': {
                                    color: '#ffffff', // Cambio de color al naranja en hover
                                    boxShadow: '0px 0px 8px 0px #ff9800', // Sombra naranja en hover
                                },
                            }}
                            aria-label="email"
                            href="mailto:sepulveda.angelly1@gmail.com"
                        >
                            <EmailIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Footer;
