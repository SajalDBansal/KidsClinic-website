import { useRecoilValue } from "recoil";
import Header from "../../components/layout/Header"
import Sidebar from "../../components/layout/Sidebar"
import { SidebarState } from "../../hooks/atoms";
import { mockPatients } from "../../data/patient";
import { Route, Routes } from "react-router-dom";
import PatientDashboard from "./PatientDashboard";
import AppointmentList from "../appointments/AppointmentsList";
import Button from "../../components/ui/Button";
import { Plus } from "lucide-react";

function Patient() {
    const value = useRecoilValue(SidebarState);
    const user = mockPatients[0];

    return (
        <>
            <Header user={user} />
            <div className="flex">
                <Sidebar user={user} />
                <main className={`${value ? 'ml-0 md:ml-16' : 'ml-0 md:ml-64'} w-full min-h-screen transition-all duration-300`}>
                    <div className={` max-w-7xl mt-18 mx-auto px-4 py-2`}>
                        {/* Welcome Section */}
                        <div className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-md">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>
                                    <p className="mt-1 opacity-90">We hope you're feeling great today!</p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <Button
                                        variant="outline"
                                        className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                                        onClick={() => { }}
                                        icon={<Plus size={16} />}
                                    >
                                        Book Appointment
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <Routes>
                            <Route path="/" element={<PatientDashboard />} />
                            <Route path="/appointments" element={<AppointmentList role={user.role} />} />
                            <Route path="/appointments/:id" element={<AppointmentList role={user.role} />} />
                            <Route path="/records" element={<PatientDashboard />} />
                            <Route path="/messages" element={<PatientDashboard />} />
                            <Route path="/health-stats" element={<PatientDashboard />} />
                            <Route path="/profile" element={<PatientDashboard />} />
                            <Route path="/settings" element={<PatientDashboard />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Patient
