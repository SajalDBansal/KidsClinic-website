import { Activity, Bell, FileText } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import EmptyState from "../../components/shared/EmptyState"
import PatientRecord from "../../components/records/PatientRecord"
import AppointmentCard from "../../components/appointments/AppointmentCard"
import { mockPatients } from "../../data/patient"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function PatientDashboard() {
    const navigate = useNavigate();
    const [showAllAppointments, setShowAllAppointments] = useState(false);
    const [showBookAppointment, setShowBookAppointment] = useState(false);

    // For demo purposes, we'll use the first patient
    const patient = mockPatients[0];
    // when fetching appoitments and records from backend get only 2 in dashboard
    const upcomingAppointments = patient.upcomingAppointments || [];
    const recentRecords = patient.medicalHistory?.slice(0, 2) || [];

    const handleBookAppointment = () => {
        setShowBookAppointment(true);
        navigate('/patient/appointments/book');
        // This would typically navigate to the appointment booking page
    };

    return (
        <>
            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Appointments Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/patient/appointments')}
                            >
                                View All
                            </Button>
                        </div>

                        {upcomingAppointments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {upcomingAppointments.slice(0, 2).map((appointment, index) => (
                                    <AppointmentCard
                                        key={index}
                                        appointment={appointment}
                                        userRole="patient"
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                type="appointments"
                                action={{
                                    label: "Book Appointment",
                                    onClick: handleBookAppointment
                                }}
                            />
                        )}
                    </section>

                    {/* Medical Records Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Recent Medical Records</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/patient/records')}
                            >
                                View All
                            </Button>
                        </div>

                        {recentRecords.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recentRecords.slice(0, 2).map((record, index) => (
                                    <PatientRecord
                                        key={index}
                                        record={record}
                                        layout="compact"
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState type="records" />
                        )}
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Health Stats */}
                    <Card title="Health Stats" hover>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Activity size={20} className="text-blue-500 mr-2" />
                                    <span className="text-sm font-medium">Last Checkup</span>
                                </div>
                                <span className="text-sm">
                                    {patient.medicalHistory?.[0]?.date || 'N/A'}
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                                icon={<Activity size={16} />}
                            >
                                View Health Dashboard
                            </Button>
                        </div>
                    </Card>

                    {/* Notifications */}
                    <Card title="Notifications" hover>
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex">
                                    <div className="flex flex-col justify-center">
                                        <Bell size={18} className="text-blue-500 mr-2" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Your next appointment is on {upcomingAppointments[0]?.date || 'N/A'}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            2 days from now
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                                <div className="flex">
                                    <div className="flex flex-col justify-center">
                                        <FileText size={18} className="text-green-500 mr-2" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Your test results are ready
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            View your recent lab results
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default PatientDashboard