import React, { useState } from 'react';
import Header from './components/Header'; 
import AddTask from './components/AddTask'; 
import TasksList from './components/TasksList';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Obtiene las tareas almacenadas en el localStorage o establece una lista vacía
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Define el estado de las tareas utilizando el hook useState
  const [tasks, setTasks] = useState(storedTasks);

  // Función para agregar una nueva tarea
  const addTask = (newTask) => {
    const updatedTasks = [...tasks, newTask]; // Agrega la nueva tarea al arreglo de tareas
    setTasks(updatedTasks); // Actualiza el estado de las tareas
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Actualiza el localStorage con las nuevas tareas
  };

  // Función para eliminar una tarea
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId); // Filtra las tareas para eliminar la tarea con el ID especificado
    setTasks(updatedTasks); // Actualiza el estado de las tareas
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Actualiza el localStorage con las tareas actualizadas
  };

  // Función para cambiar el estado de una tarea (completada o no completada)
  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ); // Mapea las tareas y cambia el estado de la tarea con el ID especificado
    setTasks(updatedTasks); // Actualiza el estado de las tareas
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Actualiza el localStorage con las tareas actualizadas
  };

  return (
    <>
      <Header />
      <AddTask onAddTask={addTask} />
      <TasksList tasks={tasks} onDeleteTask={deleteTask} onToggleTask={toggleTask} /> {/* Renderiza el componente para mostrar la lista de tareas y pasa las tareas, la función deleteTask y la función toggleTask como props */}
      <Footer />
    </>
  );
}

export default App;
