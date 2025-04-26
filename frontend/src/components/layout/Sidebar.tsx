import { Link, useLocation } from 'react-router-dom';
import {
    Home,
    Calendar,
    Users,
    FileText,
    Settings,
    User,
    MessageSquare,
    Activity
} from 'lucide-react';

import { NavItemHeaders, User as UserType } from '../../types';
import { SidebarState } from '../../hooks/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toggleSidebarState } from '../../hooks/selectors';

const Sidebar = ({ user }: { user: UserType }) => {
    const location = useLocation();
    const value = useRecoilValue(SidebarState);
    const toggle = useSetRecoilState(toggleSidebarState);

    const navItems: NavItemHeaders[] = [
        {
            name: 'Dashboard',
            href: `/${user.role}`,
            icon: <Home size={20} />,
            roles: ['patient', 'doctor', 'staff']
        },
        {
            name: 'Appointments',
            href: `/${user.role}/appointments`,
            icon: <Calendar size={20} />,
            roles: ['patient', 'doctor', 'staff']
        },
        {
            name: 'Patients',
            href: '/doctor/patients',
            icon: <Users size={20} />,
            roles: ['doctor']
        },
        {
            name: 'Staff',
            href: '/staff/employees',
            icon: <Users size={20} />,
            roles: ['staff']
        },
        {
            name: 'Medical Records',
            href: `/${user.role}/records`,
            icon: <FileText size={20} />,
            roles: ['patient', 'doctor']
        },
        {
            name: 'Messages',
            href: `/${user.role}/messages`,
            icon: <MessageSquare size={20} />,
            roles: ['patient', 'doctor', 'staff']
        },
        {
            name: 'Health Stats',
            href: '/patient/health-stats',
            icon: <Activity size={20} />,
            roles: ['patient']
        },
        {
            name: 'Profile',
            href: `/${user.role}/profile`,
            icon: <User size={20} />,
            roles: ['patient', 'doctor', 'staff']
        },
        {
            name: 'Settings',
            href: `/${user.role}/settings`,
            icon: <Settings size={20} />,
            roles: ['patient', 'doctor', 'staff']
        },
    ];

    // Filter nav items based on user role
    const filteredNavItems = navItems.filter(item =>
        item.roles.includes(user.role)
    );

    return (
        <div
            className={`
        ${value ? 'w-16' : 'w-64'} 
        h-full fixed left-0 bg-white border-r border-gray-200 transition-all duration-300 z-10 hidden md:block top-17`}
        >
            <div className="p-4 flex justify-between items-center">
                {!value && <h2 className="text-xl font-semibold text-gray-900">KidsClinic</h2>}
                <button
                    onClick={() => toggle(!value)}
                    className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    aria-label={value ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <span className="text-gray-600">{value ? '→' : '←'}</span>
                </button>
            </div>

            <nav className="mt-4">
                <ul className="space-y-1 px-2">
                    {filteredNavItems.map((item, index) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    className={`flex items-center px-3 py-2 rounded-md transition-colors
                                                ${isActive ? `bg-blue-50 text-blue-700 ${user.role == "doctor" ? 'text-teal-700' : 'text-blue-700'}`
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {!value && <span>{item.name}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="absolute bottom-15 left-0 right-0 p-4">
                {!value && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className={`font-medium ${user.role == "doctor" ? 'text-teal-800' : 'text-blue-800'}`}>
                            Need Help?
                        </h4>
                        <p className={`text-sm mt-1 ${user.role == "doctor" ? 'text-teal-700' : 'text-blue-700'}`}>
                            Contact our support team anytime
                        </p>
                        <button className={`mt-2 text-sm font-medium text-white  py-1 px-3 rounded-md transition-colors ${user.role == "doctor" ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                            Get Support
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;