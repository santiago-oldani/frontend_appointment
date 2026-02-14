import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router";
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AppointmentContainer from './components/appointments/AppointmentContainer';
import LogIntoAppointments from './components/LogIntoAppointments';
import { AppointmentProvider } from './context/AppointmentContext';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppointmentProvider>
        <Routes>
          <Route path="/" element={<><NavBar /><Home /><Footer /></>} />

          <Route path='/login-appointments' element={<LogIntoAppointments />} />

          <Route path="/appointments" element={
            <>
              <AppointmentContainer />
              <Footer />
            </>
          } />
        </Routes>
      </AppointmentProvider>
    </BrowserRouter>
  )
}

export default App