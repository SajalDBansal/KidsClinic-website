import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import HomePage from './pages/home/HomePage';
import StaffDashboard from './pages/staff/StaffDashboard';
import { RecoilRoot } from 'recoil';
import Patient from './pages/patient/Patient';
import Doctor from './pages/doctor/Doctor';

function App() {

  return (
    <>
      <RecoilRoot>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/patient/*" element={<Patient />} />
              <Route path="/doctor/*" element={<Doctor />} />
              <Route path="/staff" element={<StaffDashboard />} />
            </Routes>
          </div>
        </Router>
      </RecoilRoot>
    </>
  )
}

export default App
