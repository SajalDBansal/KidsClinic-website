import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'
import HomePage from './pages/home/HomePage';
import { RecoilRoot } from 'recoil';
import Patient from './pages/patient/Patient';
import Doctor from './pages/doctor/Doctor';
import Staff from './pages/staff/Staff';
import Authentication from './pages/auth/Authentication';

function App() {

  return (
    <>
      <RecoilRoot>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<Authentication />} />
              <Route path="/patient/*" element={<Patient />} />
              <Route path="/doctor/*" element={<Doctor />} />
              <Route path="/staff/*" element={<Staff />} />
            </Routes>
          </div>
        </Router>
      </RecoilRoot>
    </>
  )
}

export default App
