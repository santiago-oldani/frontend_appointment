import type { JSX } from "react";

export interface SelectDiv {
    title: string;
    desc: string;
    entity: string;
    state: string;
}

export interface Specialty {
    id: number;
    name: string;
    icono?: JSX.Element;
}

export interface Professional {
    id: number;
    name: string;
    lastname: string;
    headQuarters: string;
    ratingValue: number;
    specialty: Specialty;
}

export interface Appointment {
    id: number;
    date: string;
    specialty: Specialty;
    professional: Professional;
    reserved: boolean
}

export interface Patient {
    id: number;
    name: string;
    lastname: string;
}

