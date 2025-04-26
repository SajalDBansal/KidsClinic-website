import { FC, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Appointment } from '../../types';
import Button from '../ui/Button';

interface AppointmentCalendarProps {
    appointments: Appointment[];
    onDateSelect: (date: string) => void;
    onTimeSelect: (time: string) => void;
}

const AppointmentCalendar: FC<AppointmentCalendarProps> = ({
    appointments,
    onDateSelect,
    onTimeSelect,
}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Get days in month
    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    // Get day of week for the first day of the month
    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    // Format date to YYYY-MM-DD
    const formatDate = (year: number, month: number, day: number) => {
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    // Check if a date has appointments
    const hasAppointments = (dateStr: string) => {
        return appointments.some(app => app.date === dateStr);
    };

    // Handle month navigation
    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    // Handle date selection
    const handleDateClick = (dateStr: string) => {
        setSelectedDate(dateStr);
        onDateSelect(dateStr);
        setSelectedTime(null); // Reset time when date changes
    };

    // Handle time selection
    const handleTimeClick = (time: string) => {
        setSelectedTime(time);
        onTimeSelect(time);
    };

    // Available time slots - in a real app this would come from the backend
    const timeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
        '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
        '4:00 PM', '4:30 PM'
    ];

    // Get days for the current month
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);

    // Calendar days array
    const days = [];
    const monthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Previous month days (for empty slots)
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = formatDate(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + 1,
            day
        );

        const isToday = new Date().toISOString().split('T')[0] === dateStr;
        const isSelected = selectedDate === dateStr;
        const hasEvents = hasAppointments(dateStr);

        days.push(
            <button
                key={day}
                className={`h-10 w-10 rounded-full flex items-center justify-center font-medium text-sm
                            transition-colors relative
                            ${isToday ? 'border border-blue-500 text-blue-500' : ''}
                            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
        `}
                onClick={() => handleDateClick(dateStr)}
            >
                {day}
                {hasEvents && !isSelected && (
                    <span className="absolute bottom-1 h-1 w-1 rounded-full bg-blue-500"></span>
                )}
            </button>
        );
    }

    // Get available times for selected date
    const getAvailableTimes = () => {
        if (!selectedDate) return timeSlots;

        // Filter out times that already have appointments
        const bookedTimes = appointments
            .filter(app => app.date === selectedDate)
            .map(app => app.time);

        return timeSlots.filter(time => !bookedTimes.includes(time));
    };

    const availableTimes = getAvailableTimes();

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 flex flex-col">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Select Date & Time</h3>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={prevMonth}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                        aria-label="Previous month"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <h4 className="font-medium">{monthYear}</h4>
                    <button
                        onClick={nextMonth}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                        aria-label="Next month"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Weekday Labels */}
                <div className="grid grid-cols-7 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="h-8 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-500">{day}</span>
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {days}
                </div>

                {/* Time Selection */}
                {selectedDate && (
                    <div className="mt-4">
                        <h4 className="font-medium mb-2">Available Times for {selectedDate}</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {availableTimes.length > 0 ? (
                                availableTimes.map((time) => (
                                    <Button
                                        key={time}
                                        variant={selectedTime === time ? 'primary' : 'outline'}
                                        size="sm"
                                        onClick={() => handleTimeClick(time)}
                                    >
                                        {time}
                                    </Button>
                                ))
                            ) : (
                                <p className="col-span-4 text-gray-500 text-sm">No available times for this date.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentCalendar;