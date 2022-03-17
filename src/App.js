import './App.css'
import React from 'react'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import SingleMealPage from './components/SingleMealPage'

function App () {
  return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meal/:mealId" element={<SingleMealPage />} />
        </Routes>
      </Router>
  )
}

export default App
