import { FC } from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import { Appointment } from '../../types';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { useNavigate } from 'react-router-dom';

interface AppointmentCardProps {
    appointment: Appointment;
    userRole: 'patient' | 'doctor' | 'staff';
    onView?: () => void;
    onCancel?: () => void;
    onReschedule?: () => void;
}

const AppointmentCard: FC<AppointmentCardProps> = ({
    appointment,
    userRole,
    onCancel,
    onReschedule
}) => {
    const navigate = useNavigate();
    const { patientName, doctorName, date, time, status, reason, id } = appointment;

    const getStatusBadge = () => {
        switch (status) {
            case 'scheduled':
                return <Badge variant="primary">Scheduled</Badge>;
            case 'completed':
                return <Badge variant="success">Completed</Badge>;
            case 'cancelled':
                return <Badge variant="danger">Cancelled</Badge>;
            default:
                return null;
        }
    };

    const isPastAppointment = new Date(`${date} ${time}`) < new Date();

    return (
        <Card
            hover
            className="h-full flex flex-col"
        >
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className="text-lg font-medium text-gray-900">{reason}</span>
                    <div className="mt-1">{getStatusBadge()}</div>
                </div>
            </div>

            <div className="space-y-3 mb-4 flex-grow">
                <div className="flex items-center">
                    <Calendar size={18} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{date}</span>
                </div>
                <div className="flex items-center">
                    <Clock size={18} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{time}</span>
                </div>
                <div className="flex items-center">
                    <User size={18} className="text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                        {userRole === 'patient' ? doctorName : patientName}
                    </span>
                </div>
            </div>

            <div className="flex space-x-2 mt-auto">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/${userRole}/appointments/${id}`)}
                    fullWidth
                >
                    View Details
                </Button>


                {status === 'scheduled' && !isPastAppointment && (
                    <>
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={onReschedule}
                            fullWidth
                        >
                            Reschedule
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onCancel}
                            className="text-red-600 hover:bg-red-50"
                            fullWidth
                        >
                            Cancel
                        </Button>
                    </>
                )}
            </div>
        </Card>
    );
};

export default AppointmentCard;