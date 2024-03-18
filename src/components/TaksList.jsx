import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const TaksList = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Task List
            </Typography>
            <TextField
                label="New Task"
                variant="outlined"
                fullWidth
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleAddTask}>
                Add Task
            </Button>
            <List sx={{ mt: 2 }}>
                {tasks.map((task, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={task} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default TaksList;
