import React from 'react';
import { Container, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


function AddTask() {
    // Estado para el valor del campo de entrada de la tarea
    const [taskInput, setTaskInput] = useState('');
    // Estado para almacenar las tareas
    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return storedTasks;
    });

    // Manejador para agregar una nueva tarea
    const handleAddTask = () => {
        if (taskInput.trim() !== '') {
            const existingTask = tasks.find(task => task.text === taskInput.trim());
            if (!existingTask) {
                const taskId = Math.random().toString(36).substr(2, 9);
                const updatedTasks = [...tasks, { id: taskId, text: taskInput.trim(), completed: false }];
                setTasks(updatedTasks);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                setTaskInput('');
            } else {
                console.log('La tarea ya existe.');
            }
        } 
    };


return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        {/* Sección para agregar una nueva tarea */}
        <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} sm={6}>
                {/* Campo de entrada de la tarea */}
                <TextField
                    fullWidth
                    id="task-input"
                    label="New Task"
                    variant="outlined"
                    value={taskInput}
                    onChange={handleTaskInputChange}
                    error={Boolean(errors.taskInput)}
                    helperText={errors.taskInput}
                />
            </Grid>
            <Grid item xs={12} sm={3}>
                {/* Botón para agregar una nueva tarea */}
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddTask}
                    disabled={taskInput.trim() === '' || errors.taskInput !== ''}
                    style={{
                        backgroundColor: '#1976D2',
                        color: 'white',
                        '&:hover': { backgroundColor: taskInput.trim() === '' || errors.taskInput !== '' ? '#CCCCCC' : '#999' }
                    }}>
                    Send
                </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
                {/* Selector de filtro */}
                <FormControl fullWidth>
                    <InputLabel id="filter-label">Filters</InputLabel>
                    <Select
                        labelId="filter-label"
                        id="filter"
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        label="Filter">
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Complete">Complete</MenuItem>
                        <MenuItem value="Incomplete">Incomplete</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        {/* Lista de tareas filtradas */}
        {filteredTasks().map((task) => (
            <Paper key={task.id} style={{ padding: '10px', marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                    {/* Checkbox para cambiar el estado de la tarea */}
                    <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id)} />
                    {/* Texto de la tarea */}
                    <span style={{ marginLeft: '5px', textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
                </div>
                {/* Botón para eliminar la tarea */}
                <Button onClick={() => handleDeleteTask(task.id)}><DeleteIcon /></Button>
            </Paper>
        ))}
    </Container>
);

}

export default AddTask;