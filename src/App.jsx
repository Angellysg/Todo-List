import { useState } from 'react'
import Header from './components/Header'
import AddTask from './components/AddTask'
import TasksList from './components/TasksList'
import Footer from './components/Footer'
import './App.css'

function App() {
  

  return (
    <>
    <Header/>
    <AddTask/>
    <TasksList/>
    <Footer/>
    </>
  )
}

export default App;