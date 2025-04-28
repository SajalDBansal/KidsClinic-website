import { AlertCircle, Calendar, FileText, Filter, HeartPlus, Search, Thermometer, Weight } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";
import EmptyState from "../../components/shared/EmptyState";
import { mockPatients } from "../../data/patient";
import { useState } from "react";
import { Patient } from "../../types";

function SearchPatient() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [searchType, setSearchType] = useState<'name' | 'id'>('name');
    const [viewMed, setViewMed] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setSelectedPatient(null);
    };

    const filteredPatients = mockPatients.filter(patient => {
        if (!searchQuery) return false;

        if (searchType === 'name') {
            return patient.name.toLowerCase().includes(searchQuery.toLowerCase());
        } else {
            return patient.id.includes(searchQuery);
        }
    });

    return (
        <>
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Patient Search</h2>
                <p className="mt-1 text-gray-600">Search for patients and view their medical history</p>
            </div>

            {/* Search Section */}
            <Card className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder={`Search by patient ${searchType}`}
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center space-x-2">
                            <label className="text-sm text-gray-600">Search by:</label>
                            <select
                                value={searchType}
                                onChange={(e) => setSearchType(e.target.value as 'name' | 'id')}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            >
                                <option value="name">Name</option>
                                <option value="id">ID</option>
                            </select>
                        </div>

                        <Button
                            variant="outline"
                            className="focus:ring-teal-500"
                            icon={<Filter size={16} />}
                        >
                            Filters
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Search Results */}
                <div className="lg:col-span-1">
                    <Card title="Search Results">
                        {searchQuery ? (
                            filteredPatients.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredPatients.map((patient) => (
                                        <button
                                            key={patient.id}
                                            onClick={() => setSelectedPatient(patient)}
                                            className={`w-full text-left p-4 rounded-lg transition-colors ${selectedPatient?.id === patient.id
                                                ? 'bg-teal-50 border border-teal-200'
                                                : 'hover:bg-gray-50 border border-gray-100'
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <Avatar
                                                    src={patient.profileImage}
                                                    alt={patient.name}
                                                    size="md"
                                                />
                                                <div className="ml-3">
                                                    <p className="font-medium">{patient.name}</p>
                                                    <p className="text-sm text-gray-500">ID: {patient.id}</p>
                                                    <p className="text-sm text-gray-500">Age: {patient.age}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    type="search"
                                    title="No patients found"
                                    description="Try adjusting your search terms"
                                />
                            )
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Search size={40} className="mx-auto mb-3 text-gray-400" />
                                <p>Enter a search term to find patients</p>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Patient Details */}
                <div className="lg:col-span-2">
                    {selectedPatient ? (
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <Card>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center">
                                        <Avatar
                                            src={selectedPatient.profileImage}
                                            alt={selectedPatient.name}
                                            size="lg"
                                        />
                                        <div className="ml-4">
                                            <h2 className="text-xl font-semibold">{selectedPatient.name}</h2>
                                            <div className="mt-1 space-y-1">
                                                <p className="text-gray-600">Age: {selectedPatient.age}</p>
                                                {selectedPatient.parentName && (
                                                    <p className="text-gray-600">Parent: {selectedPatient.parentName}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            className="focus:ring-teal-500"
                                            icon={<Calendar size={16} />}
                                        >
                                            Schedule Visit
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            icon={<FileText size={16} />}
                                        >
                                            Add Record
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Medical History */}
                            <Card title="Medical History">
                                <div className="space-y-4">
                                    {selectedPatient.medicalHistory.map((record) => (
                                        <div
                                            key={record.id}
                                            className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                                        >
                                            <div className="sm:flex justify-between items-start mb-2">
                                                <div className="text-center sm:text-start">
                                                    <Badge variant="primary">{record.diagnosis}</Badge>
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        Dr. {record.doctorName} - {record.date}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="focus:ring-teal-500 mt-3 ml-[33%] sm:ml-1"
                                                    icon={<FileText size={14} />}
                                                    onClick={() => setViewMed(!viewMed)}
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                            <p className="text-sm text-gray-700 mt-2">
                                                <strong>Treatment:</strong> {record.treatment}
                                            </p>
                                            <p className="text-sm text-gray-700 mt-1">
                                                <strong>Notes:</strong> {record.notes}
                                            </p>
                                            {record.followUp && (
                                                <div className="mt-2 text-sm">
                                                    <Badge variant="warning">
                                                        Follow-up: {record.followUp}
                                                    </Badge>
                                                </div>
                                            )}
                                            {viewMed && (
                                                <div className="mt-4">
                                                    <div className="text-sm font-semibold mb-4">Health Stats</div>
                                                    <div className="space-y-3 mb-2 pb-2 flex-grow border-b border-gray-300">
                                                        <div className="flex items-center">
                                                            <HeartPlus size={18} className="text-gray-500 mr-2" />
                                                            <span className="text-md font-semibold text-gray-500 mr-2">Blood pressure :</span>
                                                            <span className="text-sm text-gray-600">140 / 20</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Thermometer size={18} className="text-gray-500 mr-2" />
                                                            <span className="text-md font-semibold text-gray-500 mr-2">Body Temprature :</span>
                                                            <span className="text-sm text-gray-600">102</span>
                                                            <span className="text-sm text-gray-600 pl-1">&deg;F</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Weight size={18} className="text-gray-500 mr-2" />
                                                            <span className="text-md font-semibold text-gray-500 mr-2">Weight :</span>
                                                            <span className="text-sm text-gray-600">45</span>
                                                            <span className="text-sm text-gray-600 pl-1">kg</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-semibold mb-4">Prescriptions</div>
                                                    <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                                                        {record.prescription.map((med, index) => (
                                                            <div key={index} className=' pb-2 flex justify-between'>
                                                                <div>
                                                                    <p className="text-md font-medium text-gray-500">{med.medicine}</p>
                                                                    <p className=" text-sm text-gray-900">{med.dosage}</p>
                                                                </div>
                                                                <div>
                                                                    <p className=" text-sm text-gray-900">{med.note}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Upcoming Appointments */}
                            <Card title="Upcoming Appointments">
                                {selectedPatient.upcomingAppointments.length > 0 ? (
                                    <div className="space-y-4">
                                        {selectedPatient.upcomingAppointments.map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium">{appointment.reason}</p>
                                                        <p className="text-sm text-gray-600">
                                                            {appointment.date} at {appointment.time}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            With: {appointment.doctorName}
                                                        </p>
                                                    </div>
                                                    <Badge variant={appointment.status === 'scheduled' ? 'primary' : 'success'}>
                                                        {appointment.status}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <AlertCircle size={32} className="mx-auto mb-2 text-gray-400" />
                                        <p className="text-gray-500">No upcoming appointments</p>
                                    </div>
                                )}
                            </Card>
                        </div>
                    ) : (
                        <Card>
                            <div className="text-center py-12">
                                <Search size={48} className="mx-auto mb-4 text-gray-400" />
                                <h3 className="text-lg font-medium text-gray-900">Select a Patient</h3>
                                <p className="mt-1 text-gray-500">
                                    Search for a patient and select them to view their details
                                </p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchPatient;