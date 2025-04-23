import { Patient, Doctor, Staff, Appointment } from '../types';

export const mockStaff: Staff[] = [
    {
        id: 's1',
        name: 'Jessica Taylor',
        email: 'j.taylor@clinic.com',
        role: 'staff',
        department: 'Administration',
        position: 'Receptionist',
        profileImage: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
        id: 's2',
        name: 'Daniel Lewis',
        email: 'd.lewis@clinic.com',
        role: 'staff',
        department: 'Nursing',
        position: 'Pediatric Nurse',
        profileImage: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
];

export const mockAppointments: Appointment[] = [
    {
        id: 'a1',
        patientId: 'p1',
        patientName: 'Emma Wilson',
        doctorId: 'd1',
        doctorName: 'Dr. Benjamin Harris',
        date: '2025-06-15',
        time: '10:00 AM',
        status: 'scheduled',
        reason: 'Follow-up Appointment'
    },
    {
        id: 'a2',
        patientId: 'p2',
        patientName: 'Noah Johnson',
        doctorId: 'd3',
        doctorName: 'Dr. Olivia Martinez',
        date: '2025-05-20',
        time: '2:30 PM',
        status: 'scheduled',
        reason: 'Annual Checkup'
    },
    {
        id: 'a3',
        patientId: 'p3',
        patientName: 'Sophia Brown',
        doctorId: 'd2',
        doctorName: 'Dr. Sophia Chen',
        date: '2025-05-25',
        time: '9:15 AM',
        status: 'scheduled',
        reason: 'Asthma Evaluation'
    },
    {
        id: 'a4',
        patientId: 'p3',
        patientName: 'Sophia Brown',
        doctorId: 'd1',
        doctorName: 'Dr. Benjamin Harris',
        date: '2025-06-15',
        time: '11:00 AM',
        status: 'scheduled',
        reason: 'Allergy Consultation'
    }
];