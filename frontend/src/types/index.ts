import { JSX } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'patient' | 'doctor' | 'staff';
    profileImage?: string;
}

export interface Patient extends User {
    role: 'patient';
    age: number;
    parentName?: string;
    medicalHistory: MedicalRecord[];
    upcomingAppointments: Appointment[];
}

export interface Doctor extends User {
    role: 'doctor';
    specialty: string;
    degree: string
    patients: string[]; // Patient IDs
    schedule: Appointment[];
}

export interface Staff extends User {
    role: 'staff';
    department: string;
    position: string;
}

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    reason: string;
    notes?: string;
}

export interface MedicalRecord {
    id: string;
    date: string;
    doctorId: string;
    doctorName: string;
    diagnosis: string;
    treatment: string;
    notes: string;
    followUp?: string;
    prescription: MedicalPrescription[]
}

export interface MedicalPrescription {
    medicine: string,
    dosage: string,
    note: string
}

export interface NavItemHeaders {
    name: string;
    href: string;
    icon?: JSX.Element;
    roles: string[];
}