import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router";
import Appointment from './components/Appointment';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
