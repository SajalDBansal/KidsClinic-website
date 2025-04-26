import { Patient } from "../types";

export const mockPatients: Patient[] = [
    {
        id: 'p1',
        name: 'Emma Wilson',
        email: 'parent.emma@email.com',
        role: 'patient',
        age: 7,
        parentName: 'Sarah Wilson',
        profileImage: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=150',
        medicalHistory: [
            {
                id: 'mr1',
                date: '2023-12-15',
                doctorId: 'd1',
                doctorName: 'Dr. Benjamin Harris',
                diagnosis: 'Seasonal Allergies',
                treatment: 'Prescribed antihistamine',
                notes: 'Patient responded well to treatment',
                followUp: '2024-01-15',
                prescription: [{
                    medicine: "Cardinox",
                    dosage: "1 tablet in the morning daily",
                    note: "Take with food"
                },
                {
                    medicine: "Zymenta",
                    dosage: "2 capsules twice a day",
                    note: "Every 12 hours"
                },
                {
                    medicine: "Relpanol",
                    dosage: "1 tablet at night",
                    note: "May cause drowsiness"
                },
                ]
            },
            {
                id: 'mr2',
                date: '2023-10-05',
                doctorId: 'd2',
                doctorName: 'Dr. Sophia Chen',
                diagnosis: 'Ear Infection',
                treatment: 'Prescribed antibiotics',
                notes: 'Complete 10-day course',
                followUp: '2023-10-20',
                prescription: [{
                    medicine: "Gastrofree",
                    dosage: "1 tablet before each meal",
                    note: "Max 3 times daily"
                },
                {
                    medicine: "Neuramaxin",
                    dosage: "1 capsule every 8 hours",
                    note: "Continue for 7 days"
                },]
            }
        ],
        upcomingAppointments: [
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
            }, {
                id: 'a1',
                patientId: 'p1',
                patientName: 'Emma Wilson',
                doctorId: 'd1',
                doctorName: 'Dr. Benjamin Harris',
                date: '2025-06-15',
                time: '10:00 AM',
                status: 'scheduled',
                reason: 'Follow-up Appointment'
            }, {
                id: 'a1',
                patientId: 'p1',
                patientName: 'Emma Wilson',
                doctorId: 'd1',
                doctorName: 'Dr. Benjamin Harris',
                date: '2025-06-15',
                time: '10:00 AM',
                status: 'scheduled',
                reason: 'Follow-up Appointment'
            }, {
                id: 'a1',
                patientId: 'p1',
                patientName: 'Emma Wilson',
                doctorId: 'd1',
                doctorName: 'Dr. Benjamin Harris',
                date: '2025-06-15',
                time: '10:00 AM',
                status: 'scheduled',
                reason: 'Follow-up Appointment'
            }
        ]
    },
    {
        id: 'p2',
        name: 'Noah Johnson',
        email: 'parent.johnson@email.com',
        role: 'patient',
        age: 5,
        parentName: 'Michael Johnson',
        profileImage: 'https://images.pexels.com/photos/1704165/pexels-photo-1704165.jpeg?auto=compress&cs=tinysrgb&w=150',
        medicalHistory: [
            {
                id: 'mr3',
                date: '2024-01-10',
                doctorId: 'd3',
                doctorName: 'Dr. Olivia Martinez',
                diagnosis: 'Common Cold',
                treatment: 'Rest and fluids',
                notes: 'Symptoms should resolve within a week',
                followUp: '2024-01-24',
                prescription: [{
                    medicine: "Cardinox",
                    dosage: "1 tablet in the morning daily",
                    note: "Take with food"
                },
                {
                    medicine: "Cardinox",
                    dosage: "1 tablet in the morning daily",
                    note: "Take with food"
                },]
            }
        ],
        upcomingAppointments: [
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
            }
        ]
    },
    {
        id: 'p3',
        name: 'Sophia Brown',
        email: 'parent.brown@email.com',
        role: 'patient',
        age: 9,
        parentName: 'Robert Brown',
        profileImage: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=150',
        medicalHistory: [
            {
                id: 'mr4',
                date: '2023-11-20',
                doctorId: 'd2',
                doctorName: 'Dr. Sophia Chen',
                diagnosis: 'Asthma',
                treatment: 'Prescribed inhaler',
                notes: 'Monitor breathing patterns',
                followUp: '2024-02-20',
                prescription: [{
                    medicine: "Cardinox",
                    dosage: "1 tablet in the morning daily",
                    note: "Take with food"
                },
                {
                    medicine: "Cardinox",
                    dosage: "1 tablet in the morning daily",
                    note: "Take with food"
                },]
            }
        ],
        upcomingAppointments: [
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