import './App.css'
import React, {lazy, Suspense} from 'react'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'

const SingleMealPage = lazy(() => import( './components/SingleMealPage'));

function App () {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/meal/:mealId" element={<SingleMealPage />} />
          </Routes>
        </Router>
      </Suspense>

  )
}

export default App
