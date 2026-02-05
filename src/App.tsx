import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router";
import Appointment from './components/appointments/Appointment';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointment />} />
      </Routes>
      <Footer/>
      <ScrollToTop/>
    </BrowserRouter>
  )
}

export default App
