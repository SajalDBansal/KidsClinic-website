import { KeyRound, Lock, Mail, User, UserPlus } from "lucide-react";
import { JSX, useState } from "react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

type UserRole = 'patient' | 'doctor' | 'staff';

function Authentication() {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
    const [showRegister, setShowRegister] = useState(false);
    const [authKey, setAuthKey] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically make an API call to authenticate
        console.log('Login attempt:', { ...formData, role: selectedRole });
        navigate(`/${selectedRole}`);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically make an API call to register
        console.log('Register attempt:', { ...formData, role: selectedRole });
        navigate(`/${selectedRole}`);
    };

    const roleButtons: { role: UserRole; label: string; icon: JSX.Element }[] = [
        { role: 'patient', label: 'Patient', icon: <User size={20} /> },
        { role: 'doctor', label: 'Doctor', icon: <User size={20} /> },
        { role: 'staff', label: 'Staff', icon: <User size={20} /> },
    ];


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">KidsClinic</h1>
                    <p className="mt-2 text-gray-600">
                        {showRegister ? 'Create a new account' : 'Sign in to your account'}
                    </p>
                </div>

                {/* Role Selection */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="grid grid-cols-3 gap-2">
                        {roleButtons.map(({ role, label, icon }) => (
                            <button
                                key={role}
                                onClick={() => setSelectedRole(role)}
                                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-colors
                                    ${selectedRole === role ? `bg-blue-500 text-white
                                            ${role == 'doctor' && 'bg-teal-500'}
                                            ${role == 'staff' && 'bg-cyan-500'}
                                    `
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {icon}
                                <span className="mt-1 text-sm">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Login/Register Form */}
                <div className="bg-white py-8 px-6 shadow rounded-lg">
                    <form onSubmit={showRegister ? handleRegister : handleSubmit} className="space-y-6">

                        {/* name */}
                        {showRegister && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={20} className="text-gray-400" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        )}

                        {/* email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email Address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={20} className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* confirm password & auth key */}
                        {showRegister && (
                            <>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock size={20} className="text-gray-400" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                {(selectedRole === 'doctor' || selectedRole === 'staff') && (
                                    <div>
                                        <label htmlFor="authKey" className="block text-sm font-medium text-gray-700">
                                            Authorization Key
                                        </label>
                                        <div className="mt-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <KeyRound size={20} className="text-gray-400" />
                                            </div>
                                            <input
                                                id="authKey"
                                                name="authKey"
                                                type="text"
                                                required
                                                value={authKey}
                                                onChange={(e) => setAuthKey(e.target.value)}
                                                className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Enter the authorization key provided by admin"
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* remember button */}
                        {!showRegister && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        )}

                        {/* login or signin */}
                        <div>
                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                size="lg"
                                className={`
                                    ${selectedRole == 'doctor' && 'bg-teal-500'}
                                    ${selectedRole == 'staff' && 'bg-cyan-500'}
                                    `}
                            >
                                {showRegister ? 'Create Account' : 'Sign In'}
                            </Button>
                        </div>
                    </form>

                    {/* create a new user */}
                    <div className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            fullWidth
                            icon={showRegister ? undefined : <UserPlus size={20} />}
                            onClick={() => setShowRegister(!showRegister)}
                        >
                            {showRegister ? 'Back to Login' : 'Create New Account'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication;