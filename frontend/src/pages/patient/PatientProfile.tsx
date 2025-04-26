import { useState } from "react";
import Avatar from "../../components/ui/Avatar";
import Card from "../../components/ui/Card";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import Button from "../../components/ui/Button";
import { Patient } from "../../types";
import { useNavigate } from "react-router-dom";

function PatientProfile({ user }: { user: Patient }) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: '(555) 123-4567',
        address: '123 Main St, City, State 12345',
        dateOfBirth: '2018-05-15',
        bloodGroup: 'A+',
        allergies: 'None',
        emergencyContact: 'Sarah Wilson - (555) 987-6543',
        preferredDoctor: 'Dr. Benjamin Harris'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would make an API call to update the user profile
        console.log('Updated profile:', formData);
        setIsEditing(false);
    };

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p className="mt-1 text-gray-600">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-8">
                        <div className="text-center">
                            <div className="relative inline-block">
                                <Avatar
                                    src={user.profileImage}
                                    alt={user.name}
                                    size="lg"
                                    className="h-24 w-24"
                                />
                                <button
                                    className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                                    aria-label="Change profile picture"
                                >
                                    <Camera size={16} />
                                </button>
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-gray-900">{formData.name}</h2>
                            <p className="text-gray-500">{user.role}</p>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-center text-gray-600">
                                    <Mail size={16} className="mr-2" />
                                    <span className="text-sm">{formData.email}</span>
                                </div>
                                <div className="flex items-center justify-center text-gray-600">
                                    <Phone size={16} className="mr-2" />
                                    <span className="text-sm">{formData.phone}</span>
                                </div>
                                <div className="flex items-center justify-center text-gray-600">
                                    <MapPin size={16} className="mr-2" />
                                    <span className="text-sm">{formData.address}</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button
                                    variant="outline"
                                    fullWidth
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2">
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                                    <p className="mt-1 text-sm text-gray-500">Update your personal details and medical information.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 pl-2 py-1"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 pl-2 py-1"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 pl-2 py-1"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            id="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 pl-2 py-1"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                                            Blood Group
                                        </label>
                                        <input
                                            type="text"
                                            name="bloodGroup"
                                            id="bloodGroup"
                                            value={formData.bloodGroup}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 pl-2 py-1"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">
                                            Allergies
                                        </label>
                                        <input
                                            type="text"
                                            name="allergies"
                                            id="allergies"
                                            value={formData.allergies}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 pl-2 py-1"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            id="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 pl-2 py-1"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                                            Emergency Contact
                                        </label>
                                        <input
                                            type="text"
                                            name="emergencyContact"
                                            id="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 pl-2 py-1"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="preferredDoctor" className="block text-sm font-medium text-gray-700">
                                            Preferred Doctor
                                        </label>
                                        <input
                                            type="text"
                                            name="preferredDoctor"
                                            id="preferredDoctor"
                                            value={formData.preferredDoctor}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 pl-2 py-1"
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end space-x-3">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setIsEditing(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="primary"
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </Card>

                    {/* Additional Cards */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card title="Medical History">
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Annual Checkup</p>
                                            <p className="text-sm text-gray-500">Dr. Benjamin Harris</p>
                                        </div>
                                        <span className="text-sm text-gray-500">Jan 15, 2024</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Vaccination</p>
                                            <p className="text-sm text-gray-500">Dr. Sophia Chen</p>
                                        </div>
                                        <span className="text-sm text-gray-500">Dec 10, 2023</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                                className="mt-4"
                                onClick={() => navigate("/patient/records")}
                            >
                                View Full History
                            </Button>
                        </Card>

                        <Card title="Upcoming Appointments">
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Follow-up Checkup</p>
                                            <p className="text-sm text-gray-500">Dr. Benjamin Harris</p>
                                        </div>
                                        <span className="text-sm text-gray-500">Mar 20, 2024</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                fullWidth
                                className="mt-4"
                                onClick={() => navigate("/patient/appointments")}
                            >
                                Manage Appointments
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PatientProfile;