// useAppointments.ts
import { useState } from 'react';
import type { Specialty, Professional, Appointment, SelectDiv, Patient } from '../utils/models';
import type { Dayjs } from 'dayjs';
import toast from 'react-hot-toast';

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

    async function showSpecialties(): Promise<boolean> {
        try {
            const response = await fetch("https://backendappointment-production-29f0.up.railway.app/api/specialties");

            if (!response.ok) {
                throw new Error('Ha ocurrido un error en el servidor al obtener las especialidades');
            }

            const data: Specialty[] = await response.json();

            setSpecialties(data);
            return true;

        } catch (error) {
            console.error("Error al obtener las especialidades: ", error)
            return false;
        }
    }

    async function selectSpecialty(specialtyId: number): Promise<void> {
        const specialty = specialties.find((spec) => spec.id === specialtyId);

        if (!specialty) {
            console.error("No se encontró la especialidad con ID:", specialtyId);
            return;
        }

        try {
            const response = await fetch(`https://backendappointment-production-29f0.up.railway.app/api/professionals/by-specialtyId?specialtyId=${specialtyId}`);

            if (!response.ok) {
                throw new Error('Ha ocurrido un error obteniendo los profesionalidades de la especialidad seleccionada.')
            }

            const data = await response.json();

            setProfessionals(data);

            setAssignedAppointment(prev => ({ ...prev, specialty: specialty } as Appointment))

            setArrayDivs(prevArray =>
                prevArray.map((item, index) => {
                    if (index === 0) return { ...item, state: "selected" };
                    if (index === 1) return { ...item, state: "next" };
                    if (index === 2) return { ...item, state: "blocked" };
                    return item;
                })
            );
        } catch (error) {
            console.error("Error al obtener los profesionales: ", error)
        }
    }

    async function selectProfessional(professionalId: number): Promise<void> {
        const professional = professionals.find((prof) => prof.id === professionalId);

        if (!professional) {
            console.error("No se encontró al profesional con ID:", professionalId);
            return;
        }

        setAssignedAppointment(prev => ({ ...prev, professional: professional } as Appointment))

        setArrayDivs(prevArray =>
            prevArray.map((item, index) => {
                if (index === 0) return { ...item, state: "selected" };
                if (index === 1) return { ...item, state: "selected" };
                if (index === 2) return { ...item, state: "next" };
                return item;
            })
        );

    }

    async function getAppointmentsAvailable(date: Dayjs): Promise<void> {
        const formattedDate = date.format('YYYY-MM-DD');

        if(!assignedAppointment?.professional){
            throw new Error('No hay ningun profesional seleccionado en el turno creado');
        }

        try {
            const response = await fetch(`https://backendappointment-production-29f0.up.railway.app/api/appointments/available?professionalId=${assignedAppointment?.professional?.id}&date=${formattedDate}`);

            if (!response.ok) throw new Error('Error en la respuesta del servidor');

            const data: Appointment[] = await response.json();

            setAvailableAppointments(data)

        } catch (error) {
            console.error("Ocurrio un error en trayendo los appointments disponibles.", error)
        }
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

    async function confirmAppointment(appointmentId: number): Promise<boolean> {
        if (!availableAppointments.find((app) => app.id === appointmentId)) {
            console.warn("El turno no está disponible.");
            return false;
        }

        try {
            const response = await fetch(`https://backendappointment-production-29f0.up.railway.app/api/appointments/${appointmentId}/assign`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: patient?.id })
            });

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            const data = await response.json();

            setAssignedAppointment(data);
            return true;
        } catch (error) {
            console.error(error);
            return false;
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
            const response = await fetch(`https://backendappointment-production-29f0.up.railway.app/api/appointments/reserved/${patientId}`);
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
        fetch(`https://backendappointment-production-29f0.up.railway.app/api/appointments/cancel/${appointmentId}`, {
            method: "PATCH"
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
                getNextAppointments(patientId);
                toast.success('Turno cancelado exitosamente', {
                    duration: 4000,
                    style: {
                        borderRadius: '12px',
                        background: '#0047ba',
                        color: '#fff',
                        padding: '20px 28px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        maxWidth: '450px',

                    },
                    iconTheme: {
                        primary: "#fff",
                        secondary: '#0047ba'
                    }

                });
            })
            .catch((error) => {
                console.error("Error al cancelar el turno", error);
                toast.error('No se pudo cancelar el turno. Intente luego.');
            });

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