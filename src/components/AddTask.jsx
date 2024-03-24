import React from 'react';
import { Container, TextField, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function AddTask() {
    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} sm={8}>
                    <TextField
                        fullWidth
                        id="task-input"
                        label="New Taks"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );

}

export default AddTask;