import { useState } from 'react'
import Header from './components/Header'
import AddTask from './components/AddTaks'
import Filter from './components/Filter'
import TaksList from './components/TaksList'
import Footer from './components/Footer'
import './App.css'

function App() {
  

  return (
    <>
    <Header/>
    <AddTask/>
    <Filter/>
    <TaksList/>
    <Footer/>
    </>
  )
}

export default App
