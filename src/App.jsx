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


  return (
    <>
      <Header />
      <AddTask onAddTask={addTask} />
      <TasksList tasks={tasks}/> {/* Renderiza el componente para mostrar la lista de tareas y pasa las tareas */}
      <Footer />
    </>
  );
}

export default App;
