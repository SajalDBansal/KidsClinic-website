import { FC } from 'react';
import { Calendar, Users, Check, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface StaffDashboardSummaryProps {
    todayAppointments: number;
    upcomingAppointments: number;
    totalPatients: number;
    completedAppointments: number;
    onViewAppointments: () => void;
    onViewPatients: () => void;
}

const StaffDashboardSummary: FC<StaffDashboardSummaryProps> = ({
    todayAppointments,
    upcomingAppointments,
    totalPatients,
    completedAppointments,
    onViewAppointments,
    onViewPatients
}) => {
    const stats = [
        {
            title: "Today's Appointments",
            value: todayAppointments,
            icon: <Calendar size={24} className="text-blue-500" />,
            action: { label: 'View Schedule', onClick: onViewAppointments }
        },
        {
            title: 'Total Patients',
            value: totalPatients,
            icon: <Users size={24} className="text-teal-500" />,
            action: { label: 'View Patients', onClick: onViewPatients }
        },
        {
            title: 'Upcoming Appointments',
            value: upcomingAppointments,
            icon: <Clock size={24} className="text-amber-500" />
        },
        {
            title: 'Completed Appointments',
            value: completedAppointments,
            icon: <Check size={24} className="text-green-500" />
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="h-full flex flex-col">
                    <div className="flex items-center">
                        <div className="rounded-lg p-2 bg-gray-50">{stat.icon}</div>
                        <div className="ml-3">
                            <p className="text-sm text-gray-500">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    </div>

                    {stat.action && (
                        <div className="mt-auto pt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={stat.action.onClick}
                                fullWidth
                            >
                                {stat.action.label}
                            </Button>
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
};

export default StaffDashboardSummary;