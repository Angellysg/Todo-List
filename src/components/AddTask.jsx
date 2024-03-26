import React from 'react';
import { Container, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Form, Field } from 'formik';

function AddTask() {
    // Estado para almacenar las tareas
    const [tasks, setTasks] = React.useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return storedTasks;
    });
    // Estado para el filtro seleccionado
    const [selectedFilter, setSelectedFilter] = React.useState(() => {
        const storedFilter = localStorage.getItem('selectedFilter') || 'All';
        return storedFilter;
    });

    // Manejador para eliminar una tarea
    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    // Manejador para cambiar el estado de una tarea
    const handleToggleTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    // Manejador para cambiar el filtro seleccionado
    const handleFilterChange = (event) => {
        const filterValue = event.target.value;
        setSelectedFilter(filterValue);
        localStorage.setItem('selectedFilter', filterValue);
    };

    // Función para filtrar las tareas según el filtro seleccionado
    const filteredTasks = () => {
        switch (selectedFilter) {
            case 'Complete':
                return tasks.filter(task => task.completed);
            case 'Incomplete':
                return tasks.filter(task => !task.completed);
            default:
                return tasks;
        }
    };

    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
            {/* Sección para agregar una nueva tarea */}
            <Formik
                initialValues={{ taskInput: '' }}
                onSubmit={(values, { resetForm }) => {
                    const existingTask = tasks.find(task => task.text === values.taskInput.trim());
                    if (!existingTask) {
                        const taskId = Math.random().toString(36).substr(2, 9);
                        const updatedTasks = [...tasks, { id: taskId, text: values.taskInput.trim(), completed: false }];
                        setTasks(updatedTasks);
                        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                        resetForm();
                    } else {
                        console.log('La tarea ya existe.');
                    }
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.taskInput.trim()) {
                        errors.taskInput = 'Cannot be empty';
                    } else if (values.taskInput.length > 50) {
                        errors.taskInput = 'Must be 50 characters or less';
                    }
                    return errors;
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Grid container spacing={2} alignItems="flex-start">
                            <Grid item xs={12} sm={6}>
                                {/* Campo de entrada de la tarea */}
                                <Field
                                    as={TextField}
                                    fullWidth
                                    id="task-input"
                                    name="taskInput"
                                    label="New Task"
                                    variant="outlined"
                                    error={errors.taskInput && touched.taskInput}
                                    helperText={errors.taskInput && touched.taskInput && errors.taskInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                {/* Botón para agregar una nueva tarea */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                >
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
                                        label="Filter"
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Complete">Complete</MenuItem>
                                        <MenuItem value="Incomplete">Incomplete</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
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
