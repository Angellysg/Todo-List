import React from 'react';
import { Container } from '@mui/material';

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
        <Container>
            {/* Contenido de la tarea */}
        </Container>
    );
}

// Componente funcional TasksList para mostrar la lista de tareas
function TasksList({ tasks, onDeleteTask, onToggleTask }) {
    // Manejador para eliminar una tarea
    const handleDeleteTask = (taskId) => {
        // Filtra las tareas para eliminar la tarea con el ID especificado
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        // Llama a la función onDeleteTask pasando el ID de la tarea
        onDeleteTask(taskId);
        // Actualiza el localStorage con las tareas actualizadas
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    // Manejador para cambiar el estado de una tarea
    const handleToggleTask = (taskId) => {
        // Mapea las tareas y cambia el estado de la tarea con el ID especificado
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        // Llama a la función onToggleTask pasando el ID de la tarea
        onToggleTask(taskId);
        // Actualiza el localStorage con las tareas actualizadas
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        // Renderiza la lista de tareas
        <Container sx={{ Width: '100%' }}>
            {/* Mapea sobre las tareas y renderiza un componente TaskItem por cada una */}
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={handleDeleteTask}
                    onToggle={handleToggleTask}
                />
            ))}
        </Container>
    );
}

export default TasksList;