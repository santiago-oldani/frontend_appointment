// useAppointments.ts
import { useState } from 'react';
import type { Specialty, Professional, Appointment, SelectDiv, Patient } from '../utils/models';
import type { Dayjs } from 'dayjs';

export const useAppointments = () => {
    const [arrayDivs, setArrayDivs] = useState<SelectDiv[]>([
        { title: "Especialidad", desc: "Elegi una especialidad para tu consulta.", entity: "Especialidades", state: "next" },
        { title: "Profesional", desc: "Elegí un médico para tu atención.", entity: "Profesionales", state: "blocked" },
        { title: "Fecha y Hora", desc: "Selecciona un dia y horario para agendarlo.", entity: "Fecha y hora", state: "blocked" }
    ]);
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [availableAppointments, setAvailableAppointments] = useState<Appointment[]>([]);
    const [assignedAppointment, setAssignedAppointment] = useState<Appointment>();
    const [nextAppointmentsOfPatient, setNextAppointmentsOfPatient] = useState<Appointment[]>([]);
    const [showNextAppointments, setShowNextAppointments] = useState(false);
    const [patient, setPatient] = useState<Patient>();

    function showSpecialties(): void {
        fetch("http://localhost:8081/api/specialties")
            .then((res) => res.json())
            .then((data) => setSpecialties(data))
            .catch((error) => console.error("Error al obtener las especialidades: ", error))
    }

    function selectSpecialty(specialtyId: number): void {
        const specialty = specialties.find((spec) => spec.id === specialtyId);

        if (!specialty) {
            console.error("No se encontró la especialidad con ID:", specialtyId);
            return;
        }

        setAssignedAppointment(prev => ({ ...prev, specialty: specialty } as Appointment))

        fetch(`http://localhost:8081/api/professionals/by-specialtyId?specialtyId=${specialtyId}`)
            .then((res) => res.json())
            .then((data) => setProfessionals(data))
            .catch((error) => console.error("Error al obtener los profesionales: ", error))

        setArrayDivs(prevArray =>
            prevArray.map((item, index) => {
                if (index === 0) return { ...item, state: "selected" };
                if (index === 1) return { ...item, state: "next" };
                if (index === 2) return { ...item, state: "blocked" };
                return item;
            })
        );
    }

    function selectProfessional(professionalId: number): void {
        const professional = professionals.find((prof) => prof.id === professionalId);

        if (!professional) {
            console.error("No se encontró al profesional con ID:", professionalId);
            return;
        }

        setAssignedAppointment(prev => ({ ...prev, professional: professional } as Appointment))

        fetch(`http://localhost:8081/api/appointments/available/${professionalId}`)
            .then((res) => res.json())
            .then((data) => setAvailableAppointments(data))
            .catch((error) => console.error(error))

        setArrayDivs(prevArray =>
            prevArray.map((item, index) => {
                if (index === 0) return { ...item, state: "selected" };
                if (index === 1) return { ...item, state: "selected" };
                if (index === 2) return { ...item, state: "next" };
                return item;
            })
        );
    }

    function getAppointmentsAvailable(date: Dayjs): void {
        const formattedDate = date.format('YYYY-MM-DD');

        fetch(`http://localhost:8081/api/appointments/available?professionalId=${assignedAppointment?.professional?.id}&date=${formattedDate}`)
            .then((res) => {
                if (!res.ok) throw new Error('Error en la respuesta del servidor');
                return res.json();
            })
            .then((data) => setAvailableAppointments(data))
            .catch((error) => console.error("Error en fetch:", error));
    }

    function changeSpecialty() {
        setAssignedAppointment(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                specialty: null,
                professional: null
            } as Appointment;
        });

        setProfessionals([]);

        setArrayDivs(prevArray =>
            prevArray.map((item, index) => {
                if (index === 0) return { ...item, state: "next" };
                if (index === 1) return { ...item, state: "blocked" };
                if (index === 2) return { ...item, state: "blocked" };
                return item;
            })
        );
    }

    function changeProfessional() {

        setAssignedAppointment(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                professional: null
            } as Appointment;
        });

        setArrayDivs(prevArray =>
            prevArray.map((item, index) => {
                if (index === 0) return { ...item, state: "selected" };
                if (index === 1) return { ...item, state: "next" };
                if (index === 2) return { ...item, state: "blocked" };
                return item;
            })
        );
    }

    function selectAppointment(appointmentId: number): void {
        const appointmentFound = availableAppointments.find((appointment) => appointment.id === appointmentId);
        if (appointmentFound) {
            setAssignedAppointment(prev => ({ ...prev, id: appointmentFound.id, date: appointmentFound.date } as Appointment))
        }
    }

    function confirmAppointment(appointmentId: number): void {
        if (availableAppointments.find((appointment) => appointment.id === appointmentId)) {
            fetch(`http://localhost:8081/api/appointments/${appointmentId}/assign`, {  // fetch para actualizar turno con paciente y true a reserved
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: patient?.id })
            })
                .then((res) => res.json())
                .then((data) => setAssignedAppointment(data))
                .catch((error) => console.error("No se ha podido asignar el turno", error))
        }
    }

    function clearStatesOfAssignedAppointment(): void {
        setAssignedAppointment(undefined);

        setProfessionals([]);

        setArrayDivs(prevArray =>
            prevArray.map((item, index) => {
                if (index === 0) return { ...item, state: "next" };
                if (index === 1) return { ...item, state: "blocked" };
                if (index === 2) return { ...item, state: "blocked" };
                return item;
            })
        );
    }

    const getNextAppointments = async (patientId: number) => {
    try {
        const response = await fetch(`http://localhost:8081/api/appointments/reserved/${patientId}`);
        if (response.ok) {
            const data: Appointment[] = await response.json();

            const sorted = data.sort((a, b) => 
                new Date(a.date).getTime() - new Date(b.date).getTime()
            );

            setNextAppointmentsOfPatient(sorted);
        }
    } catch (error) {
        console.error("Error al obtener turnos:", error);
    }
};

    function cancelAppointment(appointmentId: number, patientId: number): void {
        fetch(`http://localhost:8081/api/appointments/cancel/${appointmentId}`, {
            method: "PATCH"
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
                getNextAppointments(patientId);
            })
            .catch((error) => console.error("Error al cancelar el turno", error));
    }

    return {
        states: {
            specialties, professionals, arrayDivs,
            availableAppointments, assignedAppointment,
            nextAppointmentsOfPatient, showNextAppointments, patient
        },
        actions: {
            showSpecialties, selectSpecialty, getAppointmentsAvailable, changeSpecialty, changeProfessional,
            selectProfessional, selectAppointment, confirmAppointment,
            getNextAppointments, cancelAppointment, setShowNextAppointments, setSpecialties, clearStatesOfAssignedAppointment, setPatient
        }
    };
};