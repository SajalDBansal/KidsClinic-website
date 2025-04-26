import { Bell, FileText } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import EmptyState from "../../components/shared/EmptyState"
import { mockPatients } from "../../data/patient"
import { useNavigate } from "react-router-dom"
import HealthCard from "../../components/health-stats/HealthCard"
import { useState } from "react"

function PatientHealthStat({ userRole }: { userRole: string }) {
    const navigate = useNavigate();
    const [inDetail, setInDetail] = useState(false);

    // For demo purposes, we'll use the first patient
    const patient = mockPatients[0];
    const upcomingAppointments = patient.upcomingAppointments || [];

    const handleBookAppointment = () => {
        navigate('/patient/appointments/book');
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
                            <h2 className="text-xl font-semibold text-gray-800">Health Stats</h2>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => { setInDetail(!inDetail) }}
                            >
                                View Details
                            </Button>
                        </div>

                        {upcomingAppointments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {upcomingAppointments.slice(0, 2).map((appointment, index) => (
                                    <HealthCard
                                        key={index}
                                        appointment={appointment}
                                        userRole="patient"
                                        detailed={inDetail}
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
                </div>

                {/* Sidebar */}
                <div className="space-y-6">

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

export default PatientHealthStat