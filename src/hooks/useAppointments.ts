// useAppointments.ts
import { useState, useEffect } from 'react';
import type { Specialty, Professional, Appointment, SelectDiv } from '../utils/models';

export const useAppointments = (patient: any) => {
    const [arrayDivs, setArrayDivs] = useState<SelectDiv[]>([
        { title: "Especialidad", desc: "Elegi una especialidad para tu consulta.", entity: "Especialidades", state: "next" },
        { title: "Profesional", desc: "Elegí un médico para tu atención.", entity: "Profesionales", state: "blocked" },
        { title: "Fecha y Hora", desc: "Selecciona un dia y horario para agendarlo.", entity: "Fecha y hora", state: "blocked" }
    ]);
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [currentView, setCurrentView] = useState<string | null>(null);
    const [availableAppointments, setAvailableAppointments] = useState<Appointment[]>([]);
    const [assignedAppointment, setAssignedAppointment] = useState<Appointment>();
    const [secondsToRedirect, setSecondsToRedirect] = useState(5);
    const [nextAppointmentsOfPatient, setNextAppointmentsOfPatient] = useState<Appointment[]>([]);
    const [showNextAppointments, setShowNextAppointments] = useState(false);

    function showSpecialties(): void {
        fetch("http://localhost:8081/api/specialties")
            .then((res) => res.json())
            .then((data) => setSpecialties(data))
            .catch((error) => console.error("Error al obtener las especialidades: ", error))
    }

    function showEntityByIndex(index: number): void {
        if (arrayDivs[index].state !== "blocked") {
            switch (index) {
                case 0:
                    setCurrentView("Especialidades")
                    showSpecialties();
                    break;
                case 1:
                    setCurrentView("Profesionales");
                    break;

                case 2:
                    setCurrentView("Fecha y hora");
                    break;

                default:
                    break;
            }
        }
    }

    function selectSpecialty(specialtyId: number): void {
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
        fetch(`http://localhost:8081/api/appointments/available/${professionalId}`)
            .then((res) => res.json())
            .then((data) => setAvailableAppointments(data))
            .catch((error) => console.error(error))

        arrayDivs[1].state = "selected";
        arrayDivs[2].state = "next";

    }

    function selectAppointment(appointmentId: number): void {
        if (currentView === "Fecha y hora") {
            setAssignedAppointment(availableAppointments.find((appointment) => appointment.id === appointmentId));
            setCurrentView("Tu turno");
        }
    }

    function confirmAppointment(appointmentId: number): void {
        if (availableAppointments.find((appointment) => appointment.id === appointmentId)) {
            fetch(`http://localhost:8081/api/appointments/${appointmentId}/assign`, {  // fetch para actualizar turno con paciente y true a reserved
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: patient.id })
            })
                .then((res) => res.json())
                .then((data) => setAssignedAppointment(data))
                .catch((error) => console.error("No se ha podido asignar el turno", error))

            setCurrentView("Turno confirmado");
            arrayDivs[0].state = "next";
            arrayDivs[1].state = "blocked";
            arrayDivs[2].state = "blocked";
        }
    }

    function prevWindow(): void {
        if (currentView === "Tu turno") {
            setCurrentView("Fecha y hora");
        }
    }

    useEffect(() => {
        if (currentView === "Turno confirmado") {
            if (secondsToRedirect > 0) {
                const timer = setTimeout(() => {
                    setSecondsToRedirect((prev) => prev - 1);
                }, 1000);
                return () => clearTimeout(timer);
            } else {
                setCurrentView(null);
            }
        } else {
            setSecondsToRedirect(5);
        }
    }, [secondsToRedirect, currentView]);

    function getNextAppointments(patientId: number): void {
        fetch(`http://localhost:8081/api/appointments/reserved/${patientId}`)
            .then((res) => res.json())
            .then((data) => setNextAppointmentsOfPatient(data))
            .catch((error) => console.error("Ocurrio un error al obtener sus proximos turnos: ", error))

        setShowNextAppointments(true);
    }

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
            currentView, availableAppointments, assignedAppointment,
            secondsToRedirect, nextAppointmentsOfPatient, showNextAppointments
        },
        actions: {
            showSpecialties, showEntityByIndex, selectSpecialty,
            selectProfessional, selectAppointment, confirmAppointment,
            prevWindow, getNextAppointments, cancelAppointment,
            setCurrentView, setShowNextAppointments, setSpecialties
        }
    };
};