import React from 'react';
import { Container, Paper, Button } from '@mui/material';

// Componente funcional TaskItem para representar una tarea individual
function TaskItem({ task, onDelete, onToggle }) {
    const handleToggle = () => {
        onToggle(task.id);
    };

    // Manejador para eliminar la tarea
    const handleDelete = () => {
        onDelete(task.id);
    };

    return (
        <Container sx={{ textAlign: 'center', marginBottom: '10px', margin: '10px', overflowY: 'auto' }}>

        </Container>
    );
}

// Componente funcional TasksList para mostrar la lista de tareas
function TasksList({ tasks, onDeleteTask, onToggleTask }) {
    // Manejadores para eliminar y cambiar el estado de una tarea
    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        onDeleteTask(taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleToggleTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        onToggleTask(taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        // Renderiza la lista de tareas
        <Container sx={{ height: 'auto', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
            {/* Contenedor para las tareas */}
            <Container sx={{ width: '80%', textAlign: 'center' }}>
                {/* Renderiza la lista de tareas en el orden en que se reciben */}
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={handleDeleteTask}
                        onToggle={handleToggleTask}
                    />
                ))}
            </Container>
        </Container>
    );
}

export default TasksList;
