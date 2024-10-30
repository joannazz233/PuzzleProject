import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Demone from './pages/Demone'
import Demotwo from './pages/Demotwo'
import Demothree from './pages/Demothree'



const App = () => {
  return (

   <Routes>
   <Route path="/" element={<Home />} />
   <Route path="/demone" element={<Demone />} />
   <Route path="/demotwo" element={<Demotwo />} />
   <Route path="/demothree" element={<Demothree />} />
   </Routes>

  )
}

export default App
