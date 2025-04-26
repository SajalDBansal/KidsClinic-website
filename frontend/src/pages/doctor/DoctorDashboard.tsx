import { BarChart, Bell, Calendar, Clock, FileText, Users } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import EmptyState from "../../components/shared/EmptyState"
import AppointmentCard from "../../components/appointments/AppointmentCard"
import { useNavigate } from "react-router-dom"
import { mockPatients } from "../../data/patient"
import { doctors } from "../../data/doctors"
import Avatar from "../../components/ui/Avatar"

function DoctorDashboard() {
    const doctor = doctors[0];
    const navigate = useNavigate();

    const todayDate = new Date().toISOString().split('T')[0];

    // Get today's appointments
    const todayAppointments = doctor.schedule.filter(
        (appointment) => appointment.date === todayDate
    );

    // Get upcoming appointments
    const upcomingAppointments = doctor.schedule.filter(
        (appointment) => appointment.date > todayDate
    );

    // Get doctor's patients
    const doctorPatients = mockPatients.filter(
        (patient) => doctor.patients.includes(patient.id)
    );

    return (
        <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="flex flex-col">
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-blue-100">
                            <Calendar size={24} className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Today's Appointments</p>
                            <p className="text-2xl font-bold">{todayAppointments.length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="flex flex-col">
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-teal-100">
                            <Clock size={24} className="text-teal-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Upcoming Appointments</p>
                            <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="flex flex-col">
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-purple-100">
                            <Users size={24} className="text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Total Patients</p>
                            <p className="text-2xl font-bold">{doctorPatients.length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="flex flex-col">
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-amber-100">
                            <BarChart size={24} className="text-amber-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm text-gray-600">Weekly Consultations</p>
                            <p className="text-2xl font-bold">12</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Appointments Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Today's Schedule</h2>
                            <Button
                                variant="outline"
                                size="sm"
                                className="focus:ring-teal-600"
                                onClick={() => navigate('/doctor/appointments')}
                            >
                                View Full Schedule
                            </Button>
                        </div>

                        {todayAppointments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {todayAppointments.slice(0, 2).map((appointment, index) => (
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
                                title="No appointments today"
                                description="You have no appointments scheduled for today."
                            />
                        )}
                    </section>

                    {/* Upcomming Appointments Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
                            <Button
                                variant="outline"
                                size="sm"
                                className="focus:ring-teal-600"
                                onClick={() => navigate('/doctor/appointments')}
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
                                        userRole="doctor"
                                        onView={() => { }}
                                        onReschedule={() => { }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState type="appointments" />
                        )}
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                    {/* Quick Actions */}
                    <Card title="Quick Actions" hover>
                        <div className="space-y-2">
                            <Button
                                variant="secondary"
                                size="md"
                                fullWidth
                            >
                                Create Medical Record
                            </Button>
                            <Button
                                variant="outline"
                                size="md"
                                className="focus:ring-teal-500"
                                fullWidth
                            >
                                View Patient History
                            </Button>
                            <Button
                                variant="outline"
                                size="md"
                                className="focus:ring-teal-500"
                                fullWidth
                            >
                                Update Availability
                            </Button>
                        </div>
                    </Card>

                    {/* Recent Patients */}
                    <Card title="Your Recent Patients" hover>
                        <div className="space-y-4">
                            {doctorPatients.slice(0, 3).map((patient) => (
                                <div
                                    key={patient.id}
                                    className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Avatar
                                        src={patient.profileImage}
                                        alt={patient.name}
                                        size="md"
                                    />
                                    <div className="ml-3">
                                        <p className="font-medium">{patient.name}</p>
                                        <p className="text-sm text-gray-500">Age: {patient.age}</p>
                                    </div>
                                </div>
                            ))}

                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                                icon={<Users size={16} />}
                            >
                                View All Patients
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
                                            Staff meeting scheduled for Friday at 2:00 PM
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            2 days from now
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-green-50 rounded-lg border border-teal-100">
                                <div className="flex">
                                    <div className="flex flex-col justify-center">
                                        <FileText size={18} className="text-teal-500 mr-2" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            New medical guidelines published
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Review the latest pediatric care protocols
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

export default DoctorDashboard
