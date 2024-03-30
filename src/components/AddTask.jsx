import React, { useState } from 'react';
import { Container, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Formik, Form, Field } from 'formik';

function AddTask() {
    // Estado para almacenar las tareas
    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return storedTasks;
    });

    // Estado para el filtro seleccionado
    const [selectedFilter, setSelectedFilter] = useState(() => {
        const storedFilter = localStorage.getItem('selectedFilter') || 'All';
        return storedFilter;
    });

    // Estado para mostrar la ventana emergente cuando se completa una tarea
    const [showAlert, setShowAlert] = useState(false);

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

        // Mostrar la ventana emergente solo si la tarea se completa
        if (!tasks.find(task => task.id === taskId).completed) {
            setShowAlert(true);

            // Ocultar la ventana emergente después de 2 segundos
            setTimeout(() => {
                setShowAlert(false);
            }, 1000);
        }
    };

    // Manejador para cambiar el filtro seleccionado
    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
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
        <Container sx={{ width: '100%' }}>
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
                        errors.taskInput = 'The New task field cannot be empty';
                    } else if (values.taskInput.length > 50) {
                        errors.taskInput = 'Must be 50 characters or less';
                    }
                    return errors;
                }}>
                {({ errors, touched }) => (
                    <Form style={{ position: 'fixed', top: '140px', width: '80%', left: '10%', right: '10%', zIndex: '2000' }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                            {/* Campo de entrada de la tarea */}
                            <Grid item xs={12} sm={6}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    id="task-input"
                                    name="taskInput"
                                    label="New Task"
                                    variant="outlined"
                                    error={errors.taskInput && touched.taskInput}
                                    InputProps={{
                                        style: {
                                            borderColor: errors.taskInput && touched.taskInput ? '#B22222' : '#B22222',
                                        },
                                        maxLength: 50, // Limitar a 50 caracteres
                                    }}
                                    autoComplete="off" // Evitar sugerencias de autocompletado
                                />
                            </Grid>
                            {/* Botón para enviar la tarea */}
                            <Grid item xs={12} sm={2} justifyContent="center" alignItems="center">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    sx={{ '&:focus': { outline: 'none' } }}
                                >
                                    Add
                                </Button>
                            </Grid>
                            {/* Selector de filtro */}
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="filter-label">Filters</InputLabel>
                                    <Select
                                        labelId="filter-label"
                                        id="filter"
                                        value={selectedFilter}
                                        onChange={handleFilterChange}
                                        label="Filter"
                                        className="filter-select"
                                        style={{ width: '100%' }}
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Complete">Complete</MenuItem>
                                        <MenuItem value="Incomplete">Incomplete</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* Espacio reservado para la alerta de validación */}
                            <Grid item xs={12} sm={6}>
                                {errors.taskInput && touched.taskInput && (
                                    <div style={{ color: '#B22222', textAlign: 'center', marginTop: '5px', marginBottom: '5px', fontSize: '1.2rem' }}>
                                        {errors.taskInput}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <Container
                sx={{
                    width: '100%',
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: 'center',
                    flexDirection: 'column',
                    zIndex: '1000',
                    '@media (min-width:600px)': {
                        left: '10%',
                        right: '10%',
                    },
                }}>
                {/* Lista de tareas filtradas */}
                <Box
                    sx={{
                        width: '100%',
                        marginTop: '68px', // Reducir el espacio desde la parte superior del formulario
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'fixed',
                        top: '36%',
                    }}
                >
                    {filteredTasks().map((task) => (
                        <Paper
                            key={task.id}
                            style={{
                                padding: '10px',
                                marginBottom: '10px', // Ajuste del margen inferior
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: task.completed ? 'lightgrey' : 'white',
                                width: '45%',

                            }}
                        >
                            {/* Contenido de la tarea */}
                            <div style={{ flex: 1 }}>
                                <span
                                    style={{
                                        marginLeft: '5px',
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                        color: task.completed ? 'grey' : 'inherit',
                                        fontSize: '1.2rem',
                                    }}
                                >
                                    {task.text}
                                </span>
                            </div>
                            {/* Botón para completar la tarea */}
                            <Button
                                onClick={() => handleToggleTask(task.id)}
                                sx={{
                                    minWidth: 'auto',
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                    backgroundColor: task.completed ? 'green' : 'inherit',
                                    color: task.completed ? '#FFFFFF' : 'inherit',
                                    '& .MuiSvgIcon-root': {
                                        color: task.completed ? '#FFFFFF' : 'green',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'lightgrey',
                                    },
                                }}
                            >
                                <DoneIcon />
                            </Button>
                            {/* Botón para eliminar la tarea */}
                            <Button
                                onClick={() => handleDeleteTask(task.id)}
                                sx={{
                                    minWidth: 'auto',
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                    color: task.completed ? 'grey' : 'success',
                                    fontSize: '1.2rem',
                                    '&:hover': {
                                        backgroundColor: 'lightgrey',
                                    },
                                }}
                            >
                                <DeleteIcon />
                            </Button>
                        </Paper>
                    ))}
                </Box>
            </Container>
            {/* Ventana emergente para mostrar el mensaje de tarea completada */}
            <Dialog open={showAlert} onClose={() => setShowAlert(false)} sx={{ textAlign: 'center', zIndex: '3000' }}>
                <DialogTitle>You completed a task!</DialogTitle>
                <DialogContent>
                    <DoneIcon sx={{ fontSize: 64, color: 'green' }} />
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default AddTask;
