import AppointmentCard from "../../components/appointments/AppointmentCard"
import EmptyState from "../../components/shared/EmptyState"
import Button from "../../components/ui/Button"
import Card from "../../components/ui/Card";
import { mockPatients } from "../../data/patient";

function AppointmentList({ role }: { role: 'patient' | 'doctor' | 'staff' }) {

    const patient = mockPatients[0];
    const upcomingAppointments = patient.upcomingAppointments || [];

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className={`${role === 'patient' ? "lg:col-span-2" : "lg:col-span-3"}  space-y-6`} >
                    {/* Appointments Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => { }}
                            >
                                View All
                            </Button>
                        </div>


                        {upcomingAppointments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {upcomingAppointments.map((appointment, index) => (
                                    <AppointmentCard
                                        key={index}
                                        appointment={appointment}
                                        userRole="patient"
                                        // onView={() => { console.log("viewing details") }}
                                        onCancel={() => { }}
                                        onReschedule={() => { }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                type="appointments"
                                action={{
                                    label: "Book Appointment",
                                    onClick: () => { }
                                }}
                            />
                        )}
                    </section>
                </div>

                {role === 'patient' && (
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Book new appointments</h2>
                        </div>
                        <Card hover>
                            <EmptyState
                                title="Add a new Appointment"
                                type="appointments"
                                description="Book your first appointment with us"
                                action={{
                                    label: "Book Appointment",
                                    onClick: () => { }
                                }}
                            />
                        </Card>

                    </section>

                )}




            </div>

        </>
    )
}

export default AppointmentList
