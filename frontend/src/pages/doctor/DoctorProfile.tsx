import { useState } from "react";
import { doctors } from "../../data/doctors";
import Card from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import { Award, Building, Calendar, Camera, Clock, GraduationCap, IndianRupee, Mail, Phone, Save } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

function DoctorProfile() {
    const doctor = doctors[0]; // For demo purposes
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: doctor.name,
        email: doctor.email,
        phone: ' (+91) 9044888685',
        address: '123 Medical Center Dr.',
        city: 'Healthcare City',
        fees: 700,
        specialty: doctor.specialty,
        qualifications: 'MBBS, DCH, Child Specialist',
        experience: '15 years',
        languages: ['English', 'Spanish'],
        availability: {
            monday: { start: '09:00', end: '17:00' },
            tuesday: { start: '09:00', end: '17:00' },
            wednesday: { start: '09:00', end: '17:00' },
            thursday: { start: '09:00', end: '17:00' },
            friday: { start: '09:00', end: '13:00' }
        }
    });

    const [notifications, setNotifications] = useState<string[]>([
        "The clinic will remain closed on 27/04/2025. You may drop a WhatsApp message in case of an emergency.",
        "Before coming to the clinic kindly inform on the phone number - 9044888685",
        "If you are unable to come after booking an appointment, please inform us in advance."
    ]);
    const [editNotes, setEditNotes] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically save the changes
        console.log('Saving profile:', formData);
        setIsEditing(false);
    };

    const handleImageUpload = () => {
        // Here you would typically handle image upload
        console.log('Uploading image');
    };

    return (
        <>
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Doctor Profile</h2>
                <p className="mt-1 text-gray-600">Manage your professional information and settings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Profile Information */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                        {/* Personnal Information */}
                        <Card className="mb-6">
                            <div className="flex flex-col items-center md:flex-row sm:items-start gap-6">
                                <div className="relative">
                                    <Avatar
                                        src={doctor.profileImage}
                                        alt={doctor.name}
                                        size="lg"
                                    />
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={handleImageUpload}
                                            className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                                        >
                                            <Camera size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="flex-1 space-y-4 w-full">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <div className="flex items-center">
                                                <Mail size={16} className="text-gray-400 mr-2" />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone
                                            </label>
                                            <div className="flex items-center">
                                                <Phone size={16} className="text-gray-400 mr-2" />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                    disabled={!isEditing}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Professional Information */}
                        <Card className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Specialty
                                        </label>
                                        <div className="flex items-center">
                                            <Building size={16} className="text-gray-400 mr-2" />
                                            <input
                                                type="text"
                                                value={formData.specialty}
                                                onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Experience
                                        </label>
                                        <div className="flex items-center">
                                            <Award size={16} className="text-gray-400 mr-2" />
                                            <input
                                                type="text"
                                                value={formData.experience}
                                                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Qualifications
                                    </label>
                                    <div className="flex items-center">
                                        <GraduationCap size={16} className="text-gray-400 mr-2" />
                                        <input
                                            type="text"
                                            value={formData.qualifications}
                                            onChange={(e) => setFormData(prev => ({ ...prev, qualifications: e.target.value }))}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Consultation Fee
                                    </label>
                                    <div className="flex items-center">
                                        <IndianRupee size={16} className="text-gray-400 mr-2" />
                                        <input
                                            type="number"
                                            value={formData.fees}
                                            onChange={(e) => setFormData(prev => ({ ...prev, fees: parseInt(e.target.value) }))}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Languages
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.languages.map((language) => (
                                            <Badge key={language} variant="secondary">
                                                {language}
                                            </Badge>
                                        ))}
                                        {isEditing && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                            >
                                                Add Language
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Availability */}
                        <Card className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Availability</h3>

                            <div className="space-y-4">
                                {Object.entries(formData.availability).map(([day, hours]) => (
                                    <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="w-32 font-medium capitalize">{day}</div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-gray-400" />
                                            <input
                                                type="time"
                                                value={hours.start}
                                                onChange={(e) => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        availability: {
                                                            ...prev.availability,
                                                            [day]: { ...hours, start: e.target.value }
                                                        }
                                                    }));
                                                }}
                                                disabled={!isEditing}
                                                className="px-2 py-1 border border-gray-300 rounded-md disabled:bg-gray-50"
                                            />
                                            <span>to</span>
                                            <input
                                                type="time"
                                                value={hours.end}
                                                onChange={(e) => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        availability: {
                                                            ...prev.availability,
                                                            [day]: { ...hours, end: e.target.value }
                                                        }
                                                    }));
                                                }}
                                                disabled={!isEditing}
                                                className="px-2 py-1 border border-gray-300 rounded-md disabled:bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div className="flex justify-end space-x-3">
                            {isEditing ? (
                                <>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        icon={<Save size={16} />}
                                    >
                                        Save Changes
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type="button"
                                    variant="primary"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Stats */}
                    <Card>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Overview</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Patients</span>
                                <span className="font-medium">{doctor.patients.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Appointments Today</span>
                                <span className="font-medium">5</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Reviews</span>
                                <span className="font-medium">4.8/5</span>
                            </div>
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                fullWidth
                                icon={<Calendar size={16} />}
                            >
                                Update Schedule
                            </Button>
                            <Button
                                variant="outline"
                                fullWidth
                                icon={<Clock size={16} />}
                            >
                                Set Availability
                            </Button>
                        </div>
                    </Card>

                    {/* Notifications */}
                    <Card>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditNotes(!editNotes)}
                            >
                                {editNotes ? "Cancel" : "Edit"}
                            </Button>
                        </div>

                        <div className="space-y-2">
                            {notifications.map((note, index) => (
                                <div key={index} className="pt-2">
                                    <textarea
                                        value={note}
                                        onChange={(e) => setNotifications(note => { note[index] = e.target.value; return [...note] })}
                                        disabled={!editNotes}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-50 h-25"
                                    />
                                    {editNotes && (
                                        <div className="flex justify-end space-x-2 border-b border-gray-300 pb-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => {
                                                    const newNotes = notifications.filter((_note, ind) => ind != index)
                                                    setNotifications(newNotes);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                            <Button size="sm" variant="secondary" onClick={() => { setEditNotes(false) }}>save</Button>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    </Card>

                </div>
            </div>
        </>
    )

}

export default DoctorProfile;