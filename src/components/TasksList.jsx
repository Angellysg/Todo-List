import React from 'react';
import { Container } from '@mui/material';

// Componente funcional TaskItem para representar una tarea individual
function TaskItem({ task }) {


    return (
        <Container>
            {/* Contenido de la tarea */}
        </Container>
    );
}

// Componente funcional TasksList para mostrar la lista de tareas
function TasksList({ tasks }) {

    return (
        // Renderiza la lista de tareas
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
            {/* Mapea sobre las tareas y renderiza un componente TaskItem por cada una */}
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                />
            ))}
        </Container>
    );
}

export default TasksList;
