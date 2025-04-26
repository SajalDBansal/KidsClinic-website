import { FC } from 'react';
import { Clock, Calendar, User, HeartPlus, Weight, Thermometer } from 'lucide-react';
import { Appointment } from '../../types';
import Card from '../ui/Card';

interface HealthCardProps {
    appointment: Appointment;
    userRole: 'patient' | 'doctor' | 'staff';
    detailed: boolean
}

const HealthCard: FC<HealthCardProps> = ({
    appointment,
    userRole,
    detailed
}) => {
    const { patientName, doctorName, date, time, reason } = appointment;

    return (
        <Card
            hover
            className="h-full flex flex-col"
        >
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className="text-lg font-medium text-gray-900">{reason}</span>
                </div>
            </div>

            <div className={`space-y-3 mb-2 flex-grow ${detailed && "border-b border-b-gray-300 pb-2"}`}>
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

            {detailed && userRole == "patient" && (
                <div className="space-y-3 mb-2 flex-grow">
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
            )}
        </Card>
    );
};

export default HealthCard;