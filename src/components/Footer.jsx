import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

function Footer() {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Toolbar>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Typography variant="body1" color="black">
                        Made with <span role="img" aria-label="heart">❤️</span> by Angelly Sepulveda
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                        <IconButton
                            color="black"
                            aria-label="linkedin"
                            href="https://www.linkedin.com/in/angellysg/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton
                            color="black"
                            aria-label="github"
                            href="https://github.com/Angellysg"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon />
                        </IconButton>
                        <IconButton
                            color="black"
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
