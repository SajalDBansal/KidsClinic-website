import { useRecoilValue } from "recoil";
import Header from "../../components/layout/Header"
import Sidebar from "../../components/layout/Sidebar"
import { SidebarState } from "../../hooks/atoms";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { Calendar } from "lucide-react";
import DoctorDashboard from "./DoctorDashboard";
import { doctors } from "../../data/doctors";
import AppointmentList from "../appointments/AppointmentsList";
import RecordsDashboard from "../records/RecordsDashboard";

function Doctor() {
    const value = useRecoilValue(SidebarState);
    const user = doctors[0];
    const location = useLocation();
    return (
        <>
            <Header user={user} />
            <div className="flex">
                <Sidebar user={user} />
                <main className={`${value ? 'ml-0 md:ml-16' : 'ml-0 md:ml-64'} w-full min-h-screen transition-all duration-300`}>
                    <div className={` max-w-7xl mt-18 mx-auto px-4 py-2`}>
                        {/* Welcome Section */}
                        {location.pathname == "/doctor" && (<WelcomeSection username={user.name} />)}

                        <Routes>
                            <Route path="/" element={<DoctorDashboard />} />
                            <Route path="/appointments" element={<AppointmentList role={user.role} />} />
                            <Route path="/appointments/:id" element={<AppointmentList role={user.role} />} />
                            <Route path="/patients" element={<RecordsDashboard role={user.role} />} />
                            <Route path="/records" element={<RecordsDashboard role={user.role} />} />
                            {/* <Route path="/messages" element={<Unavailable />} /> */}
                            {/* <Route path="/health-stats" element={<PatientHealthStat userRole={user.role} />} /> */}
                            {/* <Route path="/profile" element={<PatientProfile user={user} />} /> */}
                            {/* <Route path="/settings" element={<Unavailable />} /> */}
                            {/* <Route path="/appointments/book" element={<AppointmentBooking />} /> */}
                        </Routes>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Doctor

function WelcomeSection({ username }: { username: string }) {
    const navigate = useNavigate();
    return (
        <div className="mb-8 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl p-6 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Welcome, {username}</h1>
                    <p className="mt-1 opacity-90">How's your day today</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Button
                        variant="outline"
                        className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                        onClick={() => navigate("/doctor/appointments")}
                        icon={<Calendar size={16} />}
                    >
                        View Schedule
                    </Button>
                </div>
            </div>
        </div>
    )
}