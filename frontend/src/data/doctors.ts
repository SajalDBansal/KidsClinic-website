import { Doctor } from "../types";

export const doctors: Doctor[] = [
    {
        id: 'd1',
        name: 'Dr. Navneet Goel',
        email: 'dr.harris@clinic.com',
        role: 'doctor',
        specialty: 'General Pediatrics',
        degree: "MBBS, DCH, Child Specialist",
        profileImage: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150',
        patients: ['p1', 'p3'],
        schedule: [
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
        ]
    },
    {
        id: 'd2',
        name: 'Dr. Mayank Goel',
        email: 'dr.chen@clinic.com',
        role: 'doctor',
        specialty: 'Pediatric Dentist',
        degree: "BDS, MDS, Child Specialist",
        profileImage: 'https://images.pexels.com/photos/5214959/pexels-photo-5214959.jpeg?auto=compress&cs=tinysrgb&w=150',
        patients: ['p1', 'p3'],
        schedule: [
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
            }
        ]
    }
];
