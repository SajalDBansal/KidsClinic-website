import AppointmentCard from "../../components/appointments/AppointmentCard"
import EmptyState from "../../components/shared/EmptyState"
import Card from "../../components/ui/Card";
import { doctors } from "../../data/doctors";
import { mockPatients } from "../../data/patient";

function AppointmentList({ role }: { role: 'patient' | 'doctor' | 'staff' }) {
    const patient = mockPatients[0];
    const doctor = doctors[0];
    const todayDate = new Date().toISOString().split('T')[0];

    // Get today's appointments
    const todayAppointments = doctor.schedule.filter(
        (appointment) => appointment.date === todayDate
    );

    const upcomingAppointmentsDoc = doctor.schedule.filter(
        (appointment) => appointment.date > todayDate
    );
    const upcomingAppointments = role == "doctor" ? upcomingAppointmentsDoc : patient.upcomingAppointments || [];

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className={`${role === 'patient' ? "lg:col-span-2" : "lg:col-span-3"}  space-y-6`} >
                    {/* Todays Appointments Section */}
                    {role == 'doctor' && (
                        <section>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Today's Schedule</h2>
                            </div>

                            {todayAppointments.length > 0 ? (
                                <div className={`grid grid-cols-1 md:grid-cols-2 ${role === 'doctor' && ("lg:grid-cols-3")} gap-4`}>
                                    {todayAppointments.slice(0, 2).map((appointment, index) => (
                                        <AppointmentCard
                                            key={index}
                                            appointment={appointment}
                                            userRole="doctor"
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
                    )}

                    {/* Upcoming Appointments Section */}
                    <section>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Upcoming Appointments</h2>
                        </div>

                        {upcomingAppointments.length > 0 ? (
                            <div className={`grid grid-cols-1 md:grid-cols-2 ${role === 'doctor' && ("lg:grid-cols-3")} gap-4`}>
                                {upcomingAppointments.map((appointment, index) => (
                                    <AppointmentCard
                                        key={index}
                                        appointment={appointment}
                                        userRole="doctor"
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

                {/* Book new appointmant card */}
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
