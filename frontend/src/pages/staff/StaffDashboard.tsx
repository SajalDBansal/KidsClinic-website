import { useState } from "react";
import { mockAppointments } from "../../data/mockData";
import Button from "../../components/ui/Button";
import { Filter, Search } from "lucide-react";
import StaffDashboardSummary from "../../components/staff/StaffDashboardSummary";
import { mockPatients } from "../../data/patient";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import EmptyState from "../../components/shared/EmptyState";
import Card from "../../components/ui/Card";
import { doctors } from "../../data/doctors";
import Avatar from "../../components/ui/Avatar";

function StaffDashboard() {
    const [searchQuery, setSearchQuery] = useState('');

    // Get today's date for filtering
    const today = new Date().toISOString().split('T')[0];

    // Get today's appointments
    const todayAppointments1 = mockAppointments.filter(
        appointment => appointment.date === today
    );

    const todayAppointments = todayAppointments1.length == 0 ? mockAppointments : todayAppointments1;

    // Get upcoming appointments
    const upcomingAppointments = mockAppointments.filter(
        appointment => new Date(appointment.date) > new Date(today)
    );

    // Search functionality
    const filteredAppointments = todayAppointments.filter(
        appointment =>
            appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Dashboard Summary */}
            <div className="mb-8">
                <StaffDashboardSummary
                    todayAppointments={todayAppointments.length}
                    upcomingAppointments={upcomingAppointments.length}
                    totalPatients={mockPatients.length}
                    completedAppointments={5} // For demo purposes
                    onViewAppointments={() => { }}
                    onViewPatients={() => { }}
                />
            </div>

            {/* Today's Appointments */}
            <section className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Today's Appointments</h2>

                    <div className="flex items-center mt-3 sm:mt-0 space-x-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
                                placeholder="Search appointments"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="md"
                            icon={<Filter size={16} />}
                        >
                            Filter
                        </Button>
                    </div>
                </div>

                {filteredAppointments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredAppointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                userRole="staff"
                                onView={() => { }}
                                onCancel={() => { }}
                                onReschedule={() => { }}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        type={searchQuery ? 'search' : 'appointments'}
                        title={searchQuery ? 'No matching appointments' : 'No appointments today'}
                        description={
                            searchQuery
                                ? 'Try adjusting your search terms or filters'
                                : 'There are no appointments scheduled for today'
                        }
                        action={{
                            label: "Schedule New Appointment",
                            onClick: () => { }
                        }}
                    />
                )}
            </section>

            {/* Recent Activity & Quick Links */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card title="Recent Activity (sample)" className="h-full">
                        <div className="space-y-4">
                            <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                                <p className="text-sm font-medium">New patient registered</p>
                                <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
                            </div>
                            <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                                <p className="text-sm font-medium">Appointment confirmed with Dr. Chen</p>
                                <p className="text-xs text-gray-500 mt-1">25 minutes ago</p>
                            </div>
                            <div className="p-3 border-l-4 border-amber-500 bg-amber-50 rounded-r-lg">
                                <p className="text-sm font-medium">Medical records updated for Emma Wilson</p>
                                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                            </div>
                            <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
                                <p className="text-sm font-medium">New appointment scheduled</p>
                                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card title="Quick Links" className="h-full">
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                            >
                                Patient Directory
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                            >
                                Book Appointment
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                            >
                                Update Records
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                            >
                                Send Reminder
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                                className="col-span-2"
                            >
                                Generate Reports
                            </Button>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium mb-2">Medical Staff On Duty</h4>
                            <div className="space-y-2">
                                {doctors.slice(0, 3).map(doctor => (
                                    <div key={doctor.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                                        <Avatar
                                            src={doctor.profileImage}
                                            alt={doctor.name}
                                            size="sm"
                                            status="online"
                                        />
                                        <div className="ml-2">
                                            <p className="text-sm font-medium">{doctor.name}</p>
                                            <p className="text-xs text-gray-500">{doctor.specialty}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default StaffDashboard
