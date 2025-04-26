import { useState } from "react";
import Button from "../../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import BookAppointmentForm from "../../components/appointments/AppointmentForm";
import { useNavigate } from "react-router-dom";

function AppointmentBooking() {
    const navigate = useNavigate();
    const [bookingComplete, setBookingComplete] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState<any>(null);

    const handleBookingSubmit = (formData: any) => {
        // In a real app, this would submit to an API
        console.log('Booking submitted:', formData);
        setAppointmentDetails(formData);
        setBookingComplete(true);
    };

    const handleCancel = () => {
        // In a real app, this would navigate back
        console.log('Booking cancelled');
        navigate("/patient");

    };

    const handleNewBooking = () => {
        setBookingComplete(false);
        setAppointmentDetails(null);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col items-start sm:flex-row sm:items-center">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mr-2 mb-2 sm:mb-0"
                        icon={<ArrowLeft size={16} />}
                        onClick={handleCancel}
                    >
                        Back
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {bookingComplete ? 'Appointment Confirmed' : 'Book an Appointment'}
                    </h1>
                </div>
            </div>

            {bookingComplete ? (
                < div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 bg-green-50 border-b border-green-100">
                        <div className="flex flex-col items-center text-center">
                            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Appointment Booked Successfully!</h2>
                            <p className="text-gray-600 mt-1">
                                Your appointment has been scheduled. We've sent a confirmation to your email.
                            </p>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-3">Appointment Details</h3>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Doctor</p>
                                        <p className="mt-1 text-sm text-gray-900">{appointmentDetails?.doctorName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Date</p>
                                        <p className="mt-1 text-sm text-gray-900">{appointmentDetails?.date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Time</p>
                                        <p className="mt-1 text-sm text-gray-900">{appointmentDetails?.time}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Reason</p>
                                        <p className="mt-1 text-sm text-gray-900">{appointmentDetails?.reason}</p>
                                    </div>
                                    {appointmentDetails?.notes && (
                                        <div className="sm:col-span-2">
                                            <p className="text-sm font-medium text-gray-500">Additional Notes</p>
                                            <p className="mt-1 text-sm text-gray-900">{appointmentDetails.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <Button
                                variant="outline"
                                onClick={handleNewBooking}
                                className="mb-3 sm:mb-0"
                            >
                                Book Another Appointment
                            </Button>
                            <Button>
                                Add to Calendar
                            </Button>
                        </div>

                        <div className="flex justify-center sm:justify-end">
                            <Button
                                variant="outline"
                                onClick={() => navigate("/patient")}
                                className="mb-3 sm:mb-0 mt-3"
                            >
                                Back to Home Page
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <BookAppointmentForm
                    onSubmit={handleBookingSubmit}
                    onCancel={handleCancel}
                />
            )
            }
        </div >
    )
}

export default AppointmentBooking
