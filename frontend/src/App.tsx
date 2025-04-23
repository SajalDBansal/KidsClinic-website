import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import DoctorDashboard from './pages/doctor/DoctorDashboard';
import HomePage from './pages/home/HomePage';
import StaffDashboard from './pages/staff/StaffDashboard';
import AppointmentBooking from './pages/appointments/AppointmentBooking';
import { RecoilRoot } from 'recoil';
import Patient from './pages/patient/Patient';

function App() {

  return (
    <>
      <RecoilRoot>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/patient/*" element={<Patient />} />
              <Route path="/doctor" element={<DoctorDashboard />} />
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/patient/appointments/book" element={<AppointmentBooking />} />
            </Routes>
          </div>
        </Router>
      </RecoilRoot>
    </>
  )
}

export default App
