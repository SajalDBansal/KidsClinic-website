import { Calendar, Clock, LogOut, MapPin, Phone, User, UserCircle } from "lucide-react"
import Button from "../../components/ui/Button"
import { doctors } from "../../data/doctors"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useRef, useState } from 'react';
import { Menu, X, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Avatar from "../../components/ui/Avatar";

const clinicImages = [
    "https://images.pexels.com/photos/3259624/pexels-photo-3259624.jpeg?auto=compress&cs=tinysrgb&w=1280",
    "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1280",
    "https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=1280",
    "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1280"
];

const services = [
    "General Pediatrics",
    "Vaccination",
    "Emergency Care",
    "Allergy Treatment",
    "Growth Monitoring",
    "Behavioral Health",
    "Nutrition Counseling",
    "Dental Checkup",
    "Dental Checkup",
    "Dental Checkup",
    "Dental Checkup",
    "Physical Therapy"
];

const navLinks = [
    { name: 'Doctors', ref: 'doctorRef' },
    { name: 'Consultation Fee', ref: 'consultationRef' },
    { name: 'Services', ref: 'servicesRef' },
    { name: 'History', ref: 'historyRef' },
];

const notifications = [
    "The clinic will remain closed on 27/04/2025. You may drop a WhatsApp message in case of an emergency.",
    "Before coming to the clinic kindly inform on the phone number - 9044888685",
    "If you are unable to come after booking an appointment, please inform us in advance."
]

type SectionId = 'doctorRef' | 'consultationRef' | 'servicesRef' | 'historyRef';

function HomePage() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = doctors[0];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
    const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const sectionRefs: Record<SectionId, React.RefObject<HTMLDivElement | null>> = {
        doctorRef: useRef<HTMLDivElement>(null),
        consultationRef: useRef<HTMLDivElement>(null),
        servicesRef: useRef<HTMLDivElement>(null),
        historyRef: useRef<HTMLDivElement>(null),
    };

    const scrollTo = (id: SectionId) => {
        const targetRef = sectionRefs[id];
        targetRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const homeRef = useRef<HTMLDivElement>(null);

    const scrollToHome = () => {
        homeRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen min-w-screen" ref={homeRef}>

            {/* Header */}
            <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex items-center cursor-pointer" onClick={scrollToHome}>
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
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navLinks.map((link, index) => (
                                <Button
                                    key={index}
                                    variant="ghost"
                                    onClick={() => scrollTo(link.ref as SectionId)}
                                    className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.name}
                                </Button>
                            ))}
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/')}
                                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Book Appointment
                            </Button>
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
                                                <p
                                                    key={index}
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
                                            onClick={() => { setIsProfileOpen(false); navigate('/patient') }}
                                        >
                                            <User size={16} className="mr-2" />
                                            Dashboard
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
                                            onClick={() => { setIsProfileOpen(false); navigate('/auth') }}
                                        >
                                            <User size={16} className="mr-2" />
                                            Doctor
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsProfileOpen(false);
                                                navigate('/auth');
                                            }}
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <LogOut size={16} className="mr-2" />
                                            Patient
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                navigate(`/auth`)

                                            }}
                                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <User size={16} className="mr-2" />
                                            Staff
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
                                    variant="ghost"
                                    onClick={() => { scrollTo(link.ref as SectionId); setIsMenuOpen(false) }}
                                    key={index}
                                    className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium w-full"
                                >
                                    {link.name}
                                </Button>
                            ))}
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/')}
                                className="text-gray-600 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium w-full"
                            >
                                Book Appointment
                            </Button>
                        </div>
                    </div>
                )}
            </header>

            {/* hero section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 pt-10">
                <div className="absolute inset-0">
                    <img
                        src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=1920"
                        alt="Children's clinic"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Welcome to KidsClinic
                        </h1>
                        <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
                            Specialized pediatric care with a gentle touch. Our experienced doctors provide comprehensive healthcare for your children in a warm, friendly environment.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <Button
                                variant="primary"
                                className="bg-transparent border text-blue-600 hover:bg-white/10 hover:border-none"
                                size="lg"
                                onClick={() => navigate('/auth')}
                            >
                                Book Appointment
                            </Button>
                            <Button
                                onClick={() => scrollTo('historyRef')}
                                variant="primary"
                                className="bg-transparent border text-blue-600 hover:bg-white/10 hover:border-none"
                                size="lg"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clinic info */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex items-start">
                            <Clock className="text-blue-500 mt-1" size={24} />
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Working Hours</h3>
                                <p className="mt-2 text-gray-600">
                                    <b>Monday - Saturday:</b><br />
                                    9:00 AM - 1:00 PM &<br />
                                    6:00 PM - 9:00 PM <br />
                                    <b>Sunday & Wednesday:</b><br />
                                    Evening closed
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <MapPin className="text-blue-500 mt-1" size={24} />
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Location</h3>
                                <p className="mt-2 text-gray-600">
                                    105, Tulsi Plaza, Sector 12<br />
                                    Opp. Central Academy School<br />
                                    Indra Nagar, Lucknow<br />
                                    Uttar Pradesh, 226016
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Phone className="text-blue-500 mt-1" size={24} />
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Contact</h3>
                                <p className="mt-2 text-gray-600">
                                    Emergency: (+91) 9044888685 <br />
                                    Whatsapp: (+91) 9335252024<br />
                                    Email: info@drnavneetgoel.com
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Calendar className="text-blue-500 mt-1" size={24} />
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
                                <p className="mt-2 text-gray-600">
                                    Book online or call us<br />
                                    Same-day appointments<br />
                                    Emergency care available
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctors info */}
            <div className="bg-gray-50 py-16" ref={sectionRefs.doctorRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Our Specialists</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Meet our team of experienced pediatric specialists
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                        {doctors.map((doctor, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <img
                                    src={doctor.profileImage}
                                    alt={doctor.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-medium text-gray-900">{doctor.name}</h3>
                                    <p className="mt-1 text-gray-600">{doctor.degree}</p>
                                    <p className="mt-1 text-gray-600">{doctor.specialty}</p>
                                    <Button
                                        variant="outline"
                                        className="mt-4"
                                        fullWidth
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Consultations */}
            <div className="bg-white py-16" ref={sectionRefs.consultationRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Our Consultation Fees</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Valid for only a single consultation
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-blue-50 rounded-lg p-6">
                            <h3 className="text-xl font-medium text-gray-900">General Pediatrics</h3>
                            <p className="mt-2 text-gray-600">Regular checkups and consultation</p>
                            <p className="mt-4 text-lg font-medium text-blue-600">From ₹700</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-6">
                            <h3 className="text-xl font-medium text-gray-900">Specialist Consultation</h3>
                            <p className="mt-2 text-gray-600">Expert care for specific conditions</p>
                            <p className="mt-4 text-lg font-medium text-blue-600">From ₹900</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-6">
                            <h3 className="text-xl font-medium text-gray-900">Emergency Care</h3>
                            <p className="mt-2 text-gray-600">24/7 emergency pediatric services</p>
                            <p className="mt-4 text-lg font-medium text-blue-600">On Situation Basis</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Aminities */}
            <div className="bg-gray-50 py-16" ref={sectionRefs.servicesRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Aminities & Services</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Comprehensive pediatric care for your child's well-being
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {services.map((service, index) => (
                            <button
                                key={index}
                                className="p-4 text-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 transition-all duration-300 shadow-sm hover:shadow focus:ring-2 focus:ring-blue-300 focus:outline-none"
                            >
                                <span className="text-gray-900 font-medium">{service}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Clinic History */}
            <div className="bg-white py-16" ref={sectionRefs.historyRef}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Our History</h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Founded in 2000, KidsClinic has been providing exceptional pediatric care for over two decades. Our commitment to children's health has made us a trusted name in pediatric healthcare.
                            </p>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <p className="text-3xl font-bold text-blue-600">20+</p>
                                    <p className="mt-1 text-gray-600">Years of Service</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <p className="text-3xl font-bold text-blue-600">50k+</p>
                                    <p className="mt-1 text-gray-600">Patients Treated</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <p className="text-3xl font-bold text-blue-600">15+</p>
                                    <p className="mt-1 text-gray-600">Specialists</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <p className="text-3xl font-bold text-blue-600">24/7</p>
                                    <p className="mt-1 text-gray-600">Emergency Care</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 lg:mt-0">
                            <Swiper
                                modules={[Autoplay, EffectFade]}
                                effect="fade"
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                className="rounded-lg shadow-lg overflow-hidden"
                            >
                                {clinicImages.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={image}
                                            alt={`Clinic view ${index + 1}`}
                                            className="w-full h-[400px] object-cover"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white">Ready to Schedule a Visit?</h2>
                        <p className="mt-4 text-xl text-blue-100">
                            Book an appointment today and give your child the care they deserve
                        </p>
                        <div className="mt-8">
                            <Button
                                variant="primary"
                                size="lg"
                                className="bg-transparent border text-blue-600 hover:bg-white/10 hover:border-none"
                            >
                                Book Appointment Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rights */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                        <p className="my-2 text-xs sm:text-md text-blue-100 text-start">
                            Copyright ©2021-2024 Dr. Navneet Goel Pediatrics Practice.
                        </p>
                        <p className="my-2 text-xs sm:text-md text-blue-100 text-start">
                            All Rights Reserved. Designed by Sajal
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HomePage
