import React from 'react'
import Landing from './Pages/Landing/index'
import { Router,Route, Routes } from 'react-router'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
    </Routes>
  )
}

export default App