import { useRecoilValue } from "recoil";
import Header from "../../components/layout/Header"
import Sidebar from "../../components/layout/Sidebar"
import { SidebarState } from "../../hooks/atoms";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { CalendarPlus, UserPlus } from "lucide-react";
import StaffDashboard from "./StaffDashboard";
import { mockStaff } from "../../data/mockData";
import Unavailable from "../../components/shared/Unavailable";

function Staff() {
    const value = useRecoilValue(SidebarState);
    const user = mockStaff[0];
    const location = useLocation();
    return (
        <>
            <Header user={user} />
            <div className="flex">
                <Sidebar user={user} />
                <main className={`${value ? 'ml-0 md:ml-16' : 'ml-0 md:ml-64'} w-full min-h-screen transition-all duration-300`}>
                    <div className={` max-w-7xl mt-18 mx-auto px-4 py-2`}>
                        {/* Welcome Section */}
                        {location.pathname == "/staff" && (<WelcomeSection username={user.name} />)}

                        <Routes>
                            <Route path="/" element={<StaffDashboard />} />
                            {/* <Route path="/appointments" element={<AppointmentList role={user.role} />} /> */}
                            {/* <Route path="/appointments/:id" element={<AppointmentList role={user.role} />} /> */}
                            {/* <Route path="/patients" element={<SearchPatient />} /> */}
                            {/* <Route path="/health-stats" element={<CreateRecord />} /> */}
                            <Route path="/messages" element={<Unavailable />} />
                            {/* <Route path="/profile" element={<DoctorProfile />} /> */}
                            <Route path="/settings" element={<Unavailable />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Staff

function WelcomeSection({ username }: { username: string }) {
    const navigate = useNavigate();
    return (
        <div className="mb-8 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl p-6 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Welcome, {username}</h1>
                    <p className="mt-1 opacity-90">Manage today's appointments and patient information</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <Button
                        variant="outline"
                        className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                        onClick={() => navigate("/doctor/appointments")}
                        icon={<UserPlus size={16} />}
                    >
                        Register Patient
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                        onClick={() => navigate("/doctor/appointments")}
                        icon={<CalendarPlus size={16} />}
                    >
                        New Appointment
                    </Button>
                </div>
            </div>
        </div>
    )
}