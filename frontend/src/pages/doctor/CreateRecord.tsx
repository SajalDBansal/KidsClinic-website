import { useState } from "react";
import { doctors } from "../../data/doctors";
import { MedicalRecordForm } from "../../types";
import { mockAppointments } from "../../data/mockData";
import Button from "../../components/ui/Button";
import { Calendar, Check, Clock, FileText, Mail, Plus, Tag, User, X } from "lucide-react";
import Card from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import EmptyState from "../../components/shared/EmptyState";
import Badge from "../../components/ui/Badge";

function CreateRecord() {
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
    const [showRecordForm, setShowRecordForm] = useState(false);
    const [recordForm, setRecordForm] = useState<MedicalRecordForm>({
        diagnosis: '',
        treatment: '',
        medicines: [{ name: '', dosage: '', duration: '' }],
        advice: '',
        tags: [],
        tests: []
    });

    // For demo purposes, we'll use the first doctor
    const doctor = doctors[0];
    const today = new Date().toISOString().split('T')[0];

    // Get today's appointments
    const appointments = mockAppointments.filter(
        appointment => appointment.date === today && appointment.doctorId === doctor.id);

    const todayAppointments = appointments.length == 0 ? mockAppointments : appointments;


    const handleAddMedicine = () => {
        setRecordForm(prev => ({
            ...prev,
            medicines: [...prev.medicines, { name: '', dosage: '', duration: '' }]
        }));
    };

    const handleRemoveMedicine = (index: number) => {
        setRecordForm(prev => ({
            ...prev,
            medicines: prev.medicines.filter((_, i) => i !== index)
        }));
    };

    const handleAddTest = () => {
        setRecordForm(prev => ({
            ...prev,
            tests: [...(prev.tests || []), '']
        }));
    };

    const handleRemoveTest = (index: number) => {
        setRecordForm(prev => ({
            ...prev,
            tests: (prev.tests || []).filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the record
        console.log('Saving record:', recordForm);
        setShowRecordForm(false);
        setSelectedAppointment(null);
        setRecordForm({
            diagnosis: '',
            treatment: '',
            medicines: [{ name: '', dosage: '', duration: '' }],
            advice: '',
            tags: [],
            tests: []
        });
    };

    return (
        <>
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Create Patient Record</h2>
                <p className="mt-1 text-gray-600">Create a record for the patient visited.</p>
            </div>

            {/* Todays Appointments Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Appointments List */}
                <div className="lg:col-span-2">
                    <Card>
                        {todayAppointments.length > 0 ? (
                            <div className="space-y-4">
                                {todayAppointments.map((appointment, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                                <Avatar
                                                    alt={appointment.patientName}
                                                    size="smlg"
                                                />
                                                <div className="ml-4">
                                                    <h3 className="font-medium">{appointment.patientName}</h3>
                                                    <div className="mt-1 space-y-1">
                                                        <p className="text-sm text-gray-500">
                                                            <Clock className="inline-block w-4 h-4 mr-1" />
                                                            {appointment.time}
                                                        </p>
                                                        <p className="text-sm text-gray-500">{appointment.reason}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <Button
                                                    variant="secondary"
                                                    size="md"
                                                    icon={<FileText size={16} />}
                                                    onClick={() => {
                                                        setSelectedAppointment(appointment);
                                                        setShowRecordForm(true);
                                                    }}
                                                >
                                                    Add Record
                                                </Button>

                                                {
                                                    index == 0 && (
                                                        <Button
                                                            variant="secondary"
                                                            size="md"
                                                            icon={<Check size={16} />}
                                                            onClick={() => {
                                                                setSelectedAppointment(appointment);
                                                            }}
                                                        >
                                                            Done
                                                        </Button>
                                                    )
                                                }
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                type="appointments"
                                description="You have no appointments scheduled for today."
                            />
                        )}
                    </Card>
                </div>

                {/* Quick Stats */}
                <div className="space-y-6">
                    <Card>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Calendar size={20} className="text-blue-500 mr-2" />
                                    <span className="font-medium">Today's Schedule</span>
                                </div>
                                <span className="text-2xl font-bold">{todayAppointments.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FileText size={20} className="text-green-500 mr-2" />
                                    <span className="font-medium">Records Created</span>
                                </div>
                                <span className="text-2xl font-bold">0</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Add Record Modal */}
            {showRecordForm && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">

                        {/* Heading */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">Create Medical Record</h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    icon={<X size={20} />}
                                    onClick={() => setShowRecordForm(false)}
                                />
                            </div>
                        </div>

                        {/* Patient Details Card */}
                        {selectedAppointment && (
                            <div className="bg-teal-50 rounded-lg p-4 border border-teal-100 m-4">
                                <div className="flex items-start gap-4">
                                    <Avatar
                                        alt={selectedAppointment.patientName}
                                        size="lg"
                                        src={selectedAppointment?.profileImage}
                                        className="hidden sm:block"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-medium">{selectedAppointment.patientName}</h3>
                                            <Badge variant="primary">
                                                ID: {selectedAppointment.patientId}
                                            </Badge>
                                        </div>
                                        <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                                            <div className="flex items-center text-gray-600">
                                                <User size={16} className="mr-1" />
                                                Age: {selectedAppointment.age}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Calendar size={16} className="mr-1" />
                                                {selectedAppointment.date}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Clock size={16} className="mr-1" />
                                                {selectedAppointment.time}
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Mail size={16} className="mr-1" />
                                                {selectedAppointment?.email}
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <Badge variant="secondary">
                                                Reason: {selectedAppointment.reason}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Record Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Treatment & Dosage */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Diagnosis
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={recordForm.diagnosis}
                                        onChange={(e) => setRecordForm(prev => ({ ...prev, diagnosis: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Treatment
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={recordForm.treatment}
                                        onChange={(e) => setRecordForm(prev => ({ ...prev, treatment: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Medicines */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Prescribed Medicines
                                    </label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        icon={<Plus size={16} />}
                                        onClick={handleAddMedicine}
                                    >
                                        Add Medicine
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {recordForm.medicines.map((medicine, index) => (
                                        <div key={index} className="sm:flex gap-3 items-start">
                                            <input
                                                type="text"
                                                placeholder="Medicine name"
                                                value={medicine.name}
                                                required
                                                onChange={(e) => {
                                                    const newMedicines = [...recordForm.medicines];
                                                    newMedicines[index].name = e.target.value;
                                                    setRecordForm(prev => ({ ...prev, medicines: newMedicines }));
                                                }}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md w-full"
                                            />
                                            <div className="flex gap-3 items-start mt-1">
                                                <input
                                                    type="text"
                                                    placeholder="Dosage"
                                                    value={medicine.dosage}
                                                    required
                                                    onChange={(e) => {
                                                        const newMedicines = [...recordForm.medicines];
                                                        newMedicines[index].dosage = e.target.value;
                                                        setRecordForm(prev => ({ ...prev, medicines: newMedicines }));
                                                    }}
                                                    className="w-[50%] sm:w-32 px-3 py-2 border border-gray-300 rounded-md"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Duration"
                                                    value={medicine.duration}
                                                    required
                                                    onChange={(e) => {
                                                        const newMedicines = [...recordForm.medicines];
                                                        newMedicines[index].duration = e.target.value;
                                                        setRecordForm(prev => ({ ...prev, medicines: newMedicines }));
                                                    }}
                                                    className="w-[50%] sm:w-32 px-3 py-2 border border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="mt-2 text-red-600 hover:bg-red-50"
                                                icon={<X size={16} />}
                                                onClick={() => handleRemoveMedicine(index)}
                                                children={undefined}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tests */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Prescribed Tests
                                    </label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        icon={<Plus size={16} />}
                                        onClick={handleAddTest}
                                    >
                                        Add Test
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {recordForm.tests?.map((test, index) => (
                                        <div key={index} className="flex gap-3 items-center">
                                            <input
                                                type="text"
                                                placeholder="Test name"
                                                value={test}
                                                onChange={(e) => {
                                                    const newTests = [...(recordForm.tests || [])];
                                                    newTests[index] = e.target.value;
                                                    setRecordForm(prev => ({ ...prev, tests: newTests }));
                                                }}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:bg-red-50"
                                                icon={<X size={16} />}
                                                onClick={() => handleRemoveTest(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {['Chronic', 'Acute', 'Follow-up', 'Emergency', 'Routine'].map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => {
                                                setRecordForm(prev => ({
                                                    ...prev,
                                                    tags: prev.tags.includes(tag)
                                                        ? prev.tags.filter(t => t !== tag)
                                                        : [...prev.tags, tag]
                                                }));
                                            }}
                                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${recordForm.tags.includes(tag)
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Tag size={14} className="inline-block mr-1" />
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Advice */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Doctor's Advice
                                </label>
                                <textarea
                                    value={recordForm.advice}
                                    onChange={(e) => setRecordForm(prev => ({ ...prev, advice: e.target.value }))}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            {/* Next Appointment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Next Appointment Date
                                </label>
                                <input
                                    type="date"
                                    value={recordForm.nextAppointment}
                                    onChange={(e) => setRecordForm(prev => ({ ...prev, nextAppointment: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowRecordForm(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="secondary"
                                >
                                    Save Record
                                </Button>
                            </div>
                        </form>
                    </div>
                </div >
            )
            }
        </>
    )
}

export default CreateRecord;