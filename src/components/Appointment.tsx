import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

interface SelectDiv {
    title: string;
    desc: string;
    entity: string;
}

interface Specialty {
    id: number;
    name: string;
}

interface Professional {
    id: number;
    name: string;
    lastname: string;
    specialty: Specialty;
}

interface Appointment {
    id: number;
    date: string;
    professional: Professional;
    reserved: boolean
}

interface Patient {
    id: number;
    name: string;
    lastname: string;
}

const arrayDivs: SelectDiv[] = [
    { title: "Seleccione la especialidad", desc: "Haz click aqui para elegir una especialidad", entity: "Especialidades" },
    { title: "Seleccione el profesional", desc: "Haz click aqui para elegir un profesional", entity: "Profesionales" },
    { title: "Seleccione la fecha y hora", desc: "Haz click aqui para elegir una fecha y hora", entity: "Fecha y hora" }
]

const Appointment: React.FC = () => {
    const [actualDiv, setActualDiv] = useState(0);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [specialties, setSpecialties] = useState<Specialty[]>([]);;
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [currentView, setCurrentView] = useState<"Especialidades" | "Profesionales" | "Fecha y hora" | "Tu turno" | "Turno confirmado" | null>(null);
    const [availableAppointments, setAvailableAppointments] = useState<Appointment[]>([]);
    const [assignedAppointment, setAssignedAppointment] = useState<Appointment>();
    const [secondsToRedirect, setSecondsToRedirect] = useState(5);
    const [nextAppointmentsOfPatient, setNextAppointmentsOfPatient] = useState<Appointment[]>([]);
    const [showNextAppointments, setShowNextAppointments] = useState(false);

    const patient: Patient = {
        id: 1,
        name: "Santiago",
        lastname: "Oldani"
    }

    function showSpecialties(): void {
        fetch("http://localhost:8081/api/specialties")
            .then((res) => res.json())
            .then((data) => setSpecialties(data))
            .catch((error) => console.error("Error al obtener las especialidades: ", error))
    }

    function showEntityByIndex(index: number): void {
        switch (index) {
            case 0:
                setCurrentView("Especialidades")
                setOptionsVisible(true);
                showSpecialties();
                break;
            case 1:
                setCurrentView("Profesionales");
                setOptionsVisible(true);
                break;

            case 2:
                setCurrentView("Fecha y hora");
                setOptionsVisible(true);
                break;

            default:
                break;
        }
    }

    function selectSpecialty(specialtyId: number): void {
        setOptionsVisible(false);
        setActualDiv((prev) => prev + 1);
        fetch(`http://localhost:8081/api/professionals/by-specialtyId?specialtyId=${specialtyId}`)
            .then((res) => res.json())
            .then((data) => setProfessionals(data))
            .catch((error) => console.error("Error al obtener los profesionales: ", error))
    }

    function selectProfessional(professionalId: number): void {
        setOptionsVisible(false);
        setActualDiv((prev) => prev + 1);
        fetch(`http://localhost:8081/api/appointments/available/${professionalId}`)
            .then((res) => res.json())
            .then((data) => setAvailableAppointments(data))
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
            setActualDiv(0);
        }
    }

    function formatDate(appointment: Appointment): { fecha: string, hora: string } {
        const date = new Date(appointment.date);

        const formattedDate = date.toLocaleDateString("es-AR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "2-digit"
        });

        const formattedTime = date.toLocaleTimeString("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

        return { fecha: formattedDate, hora: formattedTime };
    }

    function prevWindow(): void {
        if(currentView === "Tu turno"){
            setCurrentView("Fecha y hora");
        }else{
            setOptionsVisible(false);
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
                setOptionsVisible(false);
                setCurrentView(null);
            }
        } else {
            setSecondsToRedirect(5);
        }
    }, [secondsToRedirect, currentView]);

    function getNextAppointments(patientId: number): void {
        fetch(`http://localhost:8081/api/appointments/reserved/${patientId}`)
            .then((res) => res.json()
                .then((data) => setNextAppointmentsOfPatient(data)))
            .catch((error) => console.error("Ocurrio un error al obtener sus proximos turnos: ", error))

        setShowNextAppointments(true);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {/* Barra superior */}
            <div className="flex flex-row items-center justify-center bg-[#0047ba] w-full h-[50px]">
                <p className="font-bold text-[24px] text-[#fff]">Gestiona tus turnos</p>
            </div>

            {/* Contenedor principal */}
            <div className="flex flex-col items-center justify-center w-full bg-[#fff]">
                <div className="flex flex-col items-center justify-start w-full h-[800px]">

                    {/* Sidebar izquierda */}
                    <div className="flex flex-ror items-center justify-center  border border-solid border-[#346cc8] w-full mb-[100px] h-[70px]">
                        <div onClick={() => setShowNextAppointments(false)} className="flex items-center justify-center border border-solid border-[#000] h-full px-[40px] cursor-pointer">
                            <span>Saca un turno</span>
                        </div>
                        <div
                            onClick={() => getNextAppointments(patient.id)}
                            className="flex items-center justify-center border border-solid border-[#000] h-full px-[40px] cursor-pointer"
                        >
                            <span>Próximos turnos</span>
                        </div>
                    </div>

                    {/* Vista principal */}
                    {showNextAppointments ? (
                        <div className="flex flex-row justiyfy-start items-start gap-[20px]">
                            {/* Acá iría el render de los próximos turnos */}
                            {nextAppointmentsOfPatient.map((appointment) => {
                                return (
                                    <div className="flex flex-col justify-center items-center mt-[20px] border border-solid border-[#12caff] rounded-[12px] p-[20px]">
                                        <div className="flex flex-row justify-start items-start gap-[10px]">
                                            <p className="m-[0px]">Fecha:</p>
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="m-[0px] capitalize">
                                                    {formatDate(appointment).fecha}
                                                </p>
                                                <p className="m-[0px]">
                                                    {formatDate(appointment).hora}hs
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-row justify-center items-center gap-[10px]">
                                            <p>Profesional:</p>
                                            <p className="m-[0px]">
                                                {appointment.professional.name}{" "}
                                                {appointment.professional.lastname}
                                            </p>
                                        </div>

                                        <div className="flex flex-row justify-center items-center gap-[10px]">
                                            <p>Especialidad:</p>
                                            <p>{appointment.professional.specialty.name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : optionsVisible ? (
                        <div className="flex flex-col items-center justify-center border border-solid border-[#12caff] rounded-[12px] p-[20px]">
                            {currentView !== "Turno confirmado" && <FaArrowLeft size={20} className="self-start cursor-pointer" onClick={() => prevWindow()} />}
                            <h2>{currentView}</h2>

                            {/* Vista: Especialidades */}
                            {currentView === "Especialidades" &&
                                specialties.map((specialty) => (
                                    <div
                                        key={specialty.id}
                                        onClick={() => selectSpecialty(specialty.id)}
                                        className="flex flex-col items-center justify-center hover:bg-[#12caff] hover:text-[#fff] hover:opacity-[0.3] cursor-pointer w-full py-[9px]"
                                    >
                                        <span className="text-[20px] font-semibold">{specialty.name}</span>
                                    </div>
                                ))}

                            {/* Vista: Profesionales */}
                            {currentView === "Profesionales" &&
                                professionals.map((professional) => (
                                    <div
                                        key={professional.id}
                                        onClick={() => selectProfessional(professional.id)}
                                        className="flex flex-col items-center justify-center hover:bg-[#12caff] hover:text-[#fff] hover:opacity-[0.3] cursor-pointer w-full py-[9px]"
                                    >
                                        <span className="text-[20px] font-semibold">
                                            {professional.name} {professional.lastname}
                                        </span>
                                    </div>
                                ))}

                            {/* Vista: Fecha y hora */}
                            {currentView === "Fecha y hora" &&
                                availableAppointments.map((appointment) => {
                                    const dates = formatDate(appointment);
                                    return (
                                        <div
                                            key={appointment.id}
                                            onClick={() => selectAppointment(appointment.id)}
                                            className="flex flex-col items-center justify-center hover:bg-[#12caff] hover:text-[#fff] hover:opacity-[0.3] cursor-pointer w-full py-[9px]"
                                        >
                                            <span className="text-[20px] font-semibold capitalize">
                                                {`${dates.fecha} - ${dates.hora} hs`}
                                            </span>
                                            <span className="text-[20px] font-semibold">
                                                {appointment.professional.name} {appointment.professional.lastname}
                                            </span>
                                        </div>
                                    );
                                })}

                            {/* Vista: Tu turno */}
                            {currentView === "Tu turno" && assignedAppointment && (
                                <div className="flex flex-col justify-center items-center mt-[20px]">
                                    <div className="flex flex-row justify-start items-start gap-[10px]">
                                        <p className="m-[0px]">Fecha:</p>
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="m-[0px] capitalize">
                                                {formatDate(assignedAppointment).fecha}
                                            </p>
                                            <p className="m-[0px]">
                                                {formatDate(assignedAppointment).hora}hs
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row justify-center items-center gap-[10px]">
                                        <p>Profesional:</p>
                                        <p className="m-[0px]">
                                            {assignedAppointment.professional.name}{" "}
                                            {assignedAppointment.professional.lastname}
                                        </p>
                                    </div>

                                    <div className="flex flex-row justify-center items-center gap-[10px]">
                                        <p>Especialidad:</p>
                                        <p>{assignedAppointment?.professional.specialty.name}</p>
                                    </div>

                                    <div
                                        onClick={() => confirmAppointment(assignedAppointment.id)}
                                        className="flex items-center justify-center px-[10px] py-[5px] border border-solid border-[#12caff] rounded-[8px] cursor-pointer"
                                    >
                                        <span>Confirmar</span>
                                    </div>
                                </div>
                            )}

                            {/* Vista: Turno confirmado */}
                            {currentView === "Turno confirmado" && (
                                <div className="flex flex-col items-center justify-center gap-[10px]">
                                    <FaRegCheckCircle color="green" size={60} />
                                    <p>
                                        Está siendo redirigido a la gestión de turnos...{" "}
                                        {secondsToRedirect}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Vista por defecto (pantalla inicial con opciones) */
                        <div className="flex flex-row items-center justify-center w-full h-auto gap-[40px]">
                            {arrayDivs.map((div, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center gap-[40px]"
                                >
                                    <div
                                        className={`flex items-center justify-center p-[10px] ${actualDiv === index ? "bg-[#346cc8]" : "bg-[#585a5b]"
                                            } w-[40px] h-[40px] rounded-full`}
                                    >
                                        <span className="text-[40px] text-[#fff] m-[0px]">
                                            {index + 1}
                                        </span>
                                    </div>

                                    <div
                                        onClick={() => showEntityByIndex(index)}
                                        className={`flex flex-col items-center ${actualDiv === index
                                            ? "w-[350px] h-[200px] border-[#12caff] cursor-pointer border-2 shadow-xl"
                                            : "w-[300px] h-[150px] border-[#2d2f31] opacity-[0.7] cursor-not-allowed border"
                                            } justify-around border-solid rounded-[18px] p-[20px] text-center`}
                                    >
                                        <h2
                                            className={`m-[0px] ${actualDiv === index ? "text-[#12caff] text-[30px]" : "text-[#585a5b] text-[26px]"
                                                }`}
                                        >
                                            {div.title}
                                        </h2>
                                        <p
                                            className={`m-[0px] ${actualDiv === index ? "text-[#346cc8] text-[36px]" : "text-[#585a5b] text-[32px]"
                                                }`}
                                        >
                                            {div.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Appointment;