import { useState } from "react";
import { mockStaff } from "../../data/mockData";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import Card from "../../components/ui/Card";
import { CheckCircle, ClipboardList, Plus, Search, UserPlus } from "lucide-react";
import { Staff } from "../../types";
import EmptyState from "../../components/shared/EmptyState";

function StaffManagementPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddStaffModal, setShowAddStaffModal] = useState(false);
    const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium'
    });

    const [newStaffData, setNewStaffData] = useState({
        name: '',
        email: '',
        department: '',
        position: '',
        authKey: ''
    });

    // Filter staff based on search query
    const filteredStaff = mockStaff.filter(staff =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddStaff = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Adding new staff:', newStaffData);
        setShowAddStaffModal(false);
        setNewStaffData({
            name: '',
            email: '',
            department: '',
            position: '',
            authKey: ''
        });
    };

    const handleAssignTask = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Assigning task to:', selectedStaff?.name, newTask);
        setShowAssignTaskModal(false);
        setNewTask({
            title: '',
            description: '',
            dueDate: '',
            priority: 'medium'
        });
    };

    return (
        <>
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Staff Management</h2>
                <p className="mt-1 text-gray-600">Manage clinic staff and assign tasks</p>
            </div>

            {/* Staff Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-blue-50 border border-blue-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-blue-100">
                            <UserPlus size={24} className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium">Total Staff</h3>
                            <p className="text-2xl font-bold text-blue-600">{mockStaff.length}</p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-green-50 border border-green-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-green-100">
                            <CheckCircle size={24} className="text-green-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium">Present Today</h3>
                            <p className="text-2xl font-bold text-green-600">
                                {mockStaff.filter(s => s.status === 'active').length}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-amber-50 border border-amber-100">
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-amber-100">
                            <ClipboardList size={24} className="text-amber-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium">Active Tasks</h3>
                            <p className="text-2xl font-bold text-amber-600">12</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search and Add Staff */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search staff by name or department..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <Button
                    variant="secondary"
                    icon={<Plus size={20} />}
                    onClick={() => setShowAddStaffModal(true)}
                >
                    Add New Staff
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Staf list */}
                <div className="lg:col-span-2">
                    <Card hover>
                        {filteredStaff.length > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {filteredStaff.map((staff) => (
                                    <div key={staff.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                                <Avatar
                                                    src={staff.profileImage}
                                                    alt={staff.name}
                                                    size="lg"
                                                    status={staff.status === 'active' ? 'online' : 'offline'}
                                                />
                                                <div className="ml-3">
                                                    <h3 className="font-medium">{staff.name}</h3>
                                                    <p className="text-sm text-gray-500">{staff.position}</p>
                                                    <Badge variant="secondary" className="mt-1">
                                                        {staff.department}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                <span>Active Tasks: 3</span>
                                                <span>Completed: 15</span>
                                            </div>

                                            <div className="space-y-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    fullWidth
                                                    className="focus:ring-teal-500"
                                                    onClick={() => {
                                                        setSelectedStaff(staff);
                                                        setShowAssignTaskModal(true);
                                                    }}
                                                >
                                                    Assign Task
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    fullWidth
                                                    className="focus:ring-teal-500"
                                                >
                                                    View Profile
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                type="search"
                            />
                        )}
                    </Card>
                </div>

                {/* Tasks List */}
                <div className="space-y-6">
                    <div className="mb-2">
                        <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
                    </div>

                    <Card hover>
                        {filteredStaff.length > 0 ? (
                            <div className="space-y-4">
                                {filteredStaff.map((staff) => (
                                    <div key={staff.id} className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between">
                                            <h3 className="font-medium">{staff.name}</h3>
                                            <p className="text-sm text-gray-500">{staff.position}</p>
                                            <Badge variant="secondary" className="mt-1">
                                                {staff.department}
                                            </Badge>
                                        </div>

                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                            <div className="text-sm text-gray-500 mb-4 truncate">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas voluptate aut repellendus dolores, sunt at cupiditate voluptates nihil, ipsa quam id aliquid dicta tempora repellat officiis excepturi illo explicabo quae.
                                                Tenetur quidem animi fuga velit sapiente non voluptatem alias earum rerum dolores impedit ex eos aspernatur ipsum, nam eius! Vitae delectus facere error ut nulla laudantium ab eos magni labore.
                                            </div>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                fullWidth
                                                className="focus:ring-teal-500"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                type="search"
                            />
                        )}
                    </Card>


                </div>

            </div>

            {/* Add Staff Modal */}
            {showAddStaffModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold">Add New Staff Member</h2>
                        </div>

                        <form onSubmit={handleAddStaff} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newStaffData.name}
                                    onChange={(e) => setNewStaffData({ ...newStaffData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={newStaffData.email}
                                    onChange={(e) => setNewStaffData({ ...newStaffData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Department
                                </label>
                                <select
                                    required
                                    value={newStaffData.department}
                                    onChange={(e) => setNewStaffData({ ...newStaffData, department: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Department</option>
                                    <option value="Nursing">Nursing</option>
                                    <option value="Administration">Administration</option>
                                    <option value="Laboratory">Laboratory</option>
                                    <option value="Pharmacy">Pharmacy</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Position
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newStaffData.position}
                                    onChange={(e) => setNewStaffData({ ...newStaffData, position: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Authorization Key
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newStaffData.authKey}
                                    onChange={(e) => setNewStaffData({ ...newStaffData, authKey: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowAddStaffModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="secondary"
                                >
                                    Add Staff Member
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Assign Task Modal */}
            {showAssignTaskModal && selectedStaff && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold">Assign Task to {selectedStaff.name}</h2>
                        </div>

                        <form onSubmit={handleAssignTask} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    required
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Priority
                                </label>
                                <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="focus:ring-teal-500"
                                    onClick={() => setShowAssignTaskModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="secondary"
                                >
                                    Assign Task
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default StaffManagementPage;