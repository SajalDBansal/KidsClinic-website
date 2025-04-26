import { useState } from "react";
import PatientRecord from "../../components/patient/PatientRecord";
import EmptyState from "../../components/shared/EmptyState";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { mockPatients } from "../../data/patient";

function RecordsDashboard({ role }: { role: 'patient' | 'doctor' | 'staff' }) {
    const patient = mockPatients[0];
    const recentRecords = patient.medicalHistory?.slice(0, 2) || [];
    const [inDetail, setInDetail] = useState(false);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className={`${role === 'patient' ? "lg:col-span-2" : "lg:col-span-3"}  space-y-6`} >
                    {/* Records Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Medical Records</h2>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setInDetail(!inDetail)}
                            >
                                Show Details
                            </Button>
                        </div>

                        {recentRecords.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {recentRecords.slice(0, 2).map((record, index) => (
                                    <PatientRecord
                                        key={index}
                                        record={record}
                                        layout="detailed"
                                        viewDetails={inDetail}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState type="records" />
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

export default RecordsDashboard;