import { FC, useState } from "react";
import Avatar from "../ui/Avatar";
import AppointmentCalendar from "./AppointmentCalendar";
import Button from "../ui/Button";
import { Calendar, Clock, User } from "lucide-react";
import { Doctor } from "../../types";
import { doctors } from "../../data/doctors";
import { mockAppointments } from "../../data/mockData";

interface BookAppointmentFormProps {
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

const BookAppointmentForm: FC<BookAppointmentFormProps> = ({
    onSubmit,
    onCancel
}) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        doctorId: '',
        doctorName: '',
        date: '',
        time: '',
        reason: '',
        notes: ''
    });

    const handleDoctorSelect = (doctor: Doctor) => {
        setFormData({
            ...formData,
            doctorId: doctor.id,
            doctorName: doctor.name
        });
        setStep(2);
    };

    const handleDateSelect = (date: string) => {
        setFormData({
            ...formData,
            date
        });
    };

    const handleTimeSelect = (time: string) => {
        setFormData({
            ...formData,
            time
        });
    };

    const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            reason: e.target.value
        });
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            notes: e.target.value
        });
    };

    const handlePrevStep = () => {
        setStep(step - 1);
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-blue-50 border-b border-blue-100">
                <h2 className="text-xl font-semibold text-gray-800">Book an Appointment</h2>
                <p className="text-sm text-gray-600 mt-1">Complete the steps below to schedule your appointment</p>
            </div>

            {/* Step progress */}
            <div className="p-4 border-b">
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center justify-between ">
                    <div className="flex items-center">
                        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            1
                        </div>
                        <span className="ml-2 text-sm font-medium">Select Doctor</span>
                    </div>

                    <div className="w-12 h-1 bg-gray-200 hidden sm:block">
                        <div
                            className="h-1 bg-blue-500 transition-all duration-300"
                            style={{ width: step >= 2 ? '100%' : '0%' }}
                        ></div>
                    </div>

                    <div className="flex items-center">
                        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            2
                        </div>
                        <span className="ml-2 text-sm font-medium">Choose Date & Time</span>
                    </div>

                    <div className="w-12 h-1 bg-gray-200 hidden sm:block">
                        <div
                            className="h-1 bg-blue-500 transition-all duration-300"
                            style={{ width: step >= 3 ? '100%' : '0%' }}
                        ></div>
                    </div>

                    <div className="flex items-center">
                        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            3
                        </div>
                        <span className="ml-2 text-sm font-medium">Confirm Details</span>
                    </div>

                </div>
            </div>

            <div className="p-4">
                {/* Step 1: Select Doctor */}
                {step === 1 && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Select a Specialist</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {doctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all
                                            ${formData.doctorId === doctor.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                    onClick={() => handleDoctorSelect(doctor)}
                                >
                                    <div className="flex items-center">
                                        <Avatar
                                            src={doctor.profileImage}
                                            alt={doctor.name}
                                            size="lg"
                                        />
                                        <div className="ml-3">
                                            <h4 className="font-medium">{doctor.name}</h4>
                                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Select Date and Time */}
                {step === 2 && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">
                            Schedule with {formData.doctorName}
                        </h3>
                        <AppointmentCalendar
                            appointments={mockAppointments.filter(a => a.doctorId === formData.doctorId)}
                            onDateSelect={handleDateSelect}
                            onTimeSelect={handleTimeSelect}
                        />
                        <div className="flex justify-between mt-4">
                            <Button
                                variant="outline"
                                onClick={handlePrevStep}
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleNextStep}
                                disabled={!formData.date || !formData.time}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Confirm Details */}
                {step === 3 && (
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Appointment Details</h3>

                        <div className="space-y-4 mb-6">
                            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                                <div className="flex items-start">
                                    <User className="text-blue-600 mt-1 mr-3" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-500">Doctor</p>
                                        <p className="font-medium">{formData.doctorName}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Calendar className="text-blue-600 mt-1 mr-3" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">{formData.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Clock className="text-blue-600 mt-1 mr-3" size={18} />
                                    <div>
                                        <p className="text-sm text-gray-500">Time</p>
                                        <p className="font-medium">{formData.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                                    Reason for Visit*
                                </label>
                                <input
                                    id="reason"
                                    type="text"
                                    required
                                    value={formData.reason}
                                    onChange={handleReasonChange}
                                    placeholder="e.g., Annual Checkup, Fever, etc."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                    Additional Notes (Optional)
                                </label>
                                <textarea
                                    id="notes"
                                    rows={3}
                                    value={formData.notes}
                                    onChange={handleNotesChange}
                                    placeholder="Any additional information for the doctor..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button
                                variant="outline"
                                onClick={handlePrevStep}
                                type="button"
                            >
                                Back
                            </Button>
                            <div className="sm:space-x-2">
                                <Button
                                    variant="ghost"
                                    onClick={onCancel}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={!formData.reason}
                                >
                                    Confirm Booking
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BookAppointmentForm;