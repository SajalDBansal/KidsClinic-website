import { LogOut, User, UserCircle } from "lucide-react"
import Button from "../ui/Button";
import { useState } from 'react';
import { Menu, X, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from "../ui/Avatar";
import { User as UserTypes } from "../../types";

const notifications = [
    "The clinic will remain closed on 27/04/2025. You may drop a WhatsApp message in case of an emergency.",
    "Before coming to the clinic kindly inform on the phone number - 9044888685",
    "If you are unable to come after booking an appointment, please inform us in advance."
]

const Header = ({ user }: { user: UserTypes }) => {
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Dashboard', href: `/${user.role}` },
        { name: 'Appointments', href: `/${user.role}/appointments` },
    ]

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        < header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">NG</span>
                            </div>
                            <div className="flex flex-col h-full ml-2 text-gray-900">
                                <span className=" text-xl font-semibold ">
                                    Dr. Navneet Goel
                                </span>
                                <span className="text-[10px]">
                                    MBBS, DCH, Child Specialist
                                </span>
                            </div>

                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                onClick={() => navigate(link.href)}
                                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                {link.name}
                            </Button>
                        ))}
                    </nav>

                    {/* Right side - Notifications & Profile */}
                    <div className="flex items-center space-x-4">
                        {/* Notification Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleNotification}
                                className="text-gray-500 hover:text-blue-500 transition-colors p-1"
                                aria-label="Notifications"
                                aria-expanded={isNotificationOpen}
                                aria-haspopup="true"
                            >
                                <Bell size={20} />
                            </button>

                            {/* Notification Dropdown Menu */}
                            {isNotificationOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5"
                                    onBlur={() => setIsProfileOpen(false)}
                                >
                                    <div className="px-4 py-2 border-b">
                                        <p className="text-sm font-medium text-gray-900">Notifications</p>
                                    </div>
                                    <div>
                                        {notifications.map((note, index) => (
                                            <p key={index}
                                                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 shadow-sm">
                                                {note}
                                            </p>
                                        ))}

                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleProfile}
                                className="flex items-center text-gray-500 hover:text-blue-500 transition-colors p-1"
                                aria-expanded={isProfileOpen}
                                aria-haspopup="true"
                            >
                                {isLoggedIn && (
                                    <Avatar
                                        src={user.profileImage}
                                        alt={user.name}
                                        size="sm"
                                        className="cursor-pointer"
                                    />
                                )}

                                {!isLoggedIn && (
                                    <UserCircle className="cursor-pointer w-6 h-6" />
                                )}
                            </button>

                            {/* Profile Dropdown Menu */}
                            {isProfileOpen && isLoggedIn && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5"
                                    onBlur={() => setIsProfileOpen(false)}
                                >
                                    <div className="px-4 py-2 border-b">
                                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                    <button
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => { setIsProfileOpen(false); navigate(`/${user.role}/profile`) }}
                                    >
                                        <User size={16} className="mr-2" />
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsProfileOpen(false);
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Sign out
                                    </button>
                                </div>
                            )}

                            {isProfileOpen && !isLoggedIn && (
                                <div
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5"
                                    onBlur={() => setIsProfileOpen(false)}
                                >
                                    <div className="px-4 py-2 border-b">
                                        <p className="text-sm font-medium text-gray-900">Login</p>
                                    </div>
                                    <button
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => { setIsProfileOpen(false); navigate(`/doctor`) }}
                                    >
                                        <User size={16} className="mr-2" />
                                        Doctor
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsProfileOpen(false);
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <LogOut size={16} className="mr-2" />
                                        Patient
                                    </button>
                                </div>
                            )}

                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-500 hover:text-blue-500 transition-colors"
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu, shown when menu button is clicked */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link, index) => (
                            <Button
                                key={index}
                                variant="ghost"
                                onClick={() => { setIsMenuOpen(false); navigate(link.href) }}
                                className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium w-full"
                            >
                                {link.name}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </header >
    )
}

export default Header;