import { useState } from "react";

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

const arrayDivs: SelectDiv[] = [
    { title: "Selecciona la especialidad", desc: "Haz click aqui para elegir una especialidad", entity: "Especialidades" },
    { title: "Selecciona el profesional", desc: "Haz click aqui para elegir un profesional", entity: "Profesionales" },
    { title: "Selecciona la fecha y hora", desc: "Haz click aqui para elegir una fecha y hora", entity: "Fecha y hora" }
]

const Appointment: React.FC = () => {
    const [actualDiv, setActualDiv] = useState(0);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [specialties, setSpecialties] = useState<Specialty[]>([]);;
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [currentView, setCurrentView] = useState<"Especialidades" | "Profesionales" | "Fecha y hora" | null>(null);
    const [availableAppointments, setAvailableAppointments] = useState<Appointment[]>([]);

    function showSpecialties(index: number): void {
        if (index === actualDiv) {
            setCurrentView("Especialidades")
            setOptionsVisible(true);
            fetch("http://localhost:8081/api/specialties")
                .then((res) => res.json())
                .then((data) => setSpecialties(data))
                .catch((error) => console.error("Error al obtener las especialidades: ", error))
        }
    }

    function selectSpecialty(specialtyId: number): void {
        setCurrentView("Profesionales");
        fetch(`http://localhost:8081/api/professionals/by-specialtyId?specialtyId=${specialtyId}`)
            .then((res) => res.json())
            .then((data) => setProfessionals(data))
            .catch((error) => console.error("Error al obtener los profesionales: ", error))
    }

    function selectProfessional(professionalId:number): void{
        setCurrentView("Fecha y hora");
        fetch(`http://localhost:8081/api/appointments/available/${professionalId}`)
        .then((res) => res.json())
        .then((data) => setAvailableAppointments(data))
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-row items-center justify-center bg-[#0047ba] w-full h-[50px]">
                <p className="font-bold text-[24px] text-[#fff]">Gestiona tus turnos</p>
            </div>
            <div className="flex flex-col items-center justify-center w-full bg-[#fff]">
                <div className="flex flex-row items-start justify-center relative w-full h-[800px] mt-[50px]">
                    <div className="flex flex-col items-center justify-start place-start absolute left-[10px] border border-1 border-solid border-[#346cc8] w-[200px] h-[600px]">
                        <div>
                            <p>Proximos turnos</p>
                            
                        </div>
                        <div>
                            <p>Saca un turno</p>
                        </div>
                    </div>

                    {optionsVisible ? <div className="flex flex-col items-center justify-center border-1 border-solid border-[#12caff] rounded-[12px] p-[20px]">
                        <h2>{currentView}</h2>

                        {currentView === "Especialidades" &&
                            specialties.map((specialty) => {
                                return (
                                    <div className="flex flex-col items-center justify-center hover:bg-[#12caff] hover:text-[#fff] hover:opacity-[0.3] cursor-pointer w-full py-[9px]">
                                        <span onClick={() => selectSpecialty(specialty.id)} className="text-[20px] font-semibold">{specialty.name}</span>
                                    </div>
                                )
                            })
                        }

                        {currentView === "Profesionales" &&
                            professionals.map((professional) =>{
                                return(
                                    <div className="flex flex-col items-center justify-center hover:bg-[#12caff] hover:text-[#fff] hover:opacity-[0.3] cursor-pointer w-full py-[9px]">
                                        <span onClick={() => selectProfessional(professional.id)} className="text-[20px] font-semibold">{professional.name} {professional.lastname}</span>
                                    </div>
                                )
                            })
                        }

                        {currentView === "Fecha y hora" &&
                            availableAppointments.map((appointment) =>{
                                return(
                                    <div className="flex flex-col items-center justify-center hover:bg-[#12caff] hover:text-[#fff] hover:opacity-[0.3] cursor-pointer w-full py-[9px]">
                                        <span className="text-[20px] font-semibold">{appointment.date}</span>
                                        <span className="text-[20px] font-semibold">{appointment.professional.name} {appointment.professional.lastname}</span>
                                    </div>
                                )
                            })
                        }

                    </div> : <div className="flex flex-row items-center justify-center w-full h-auto ml-[100px] gap-[40px]">
                        {arrayDivs.map((div, index) => {
                            return (
                                <div className="flex flex-col items-center justify-center gap-[40px]">
                                    <div className={`flex items-center justify-center p-[10px] ${actualDiv === index ? "bg-[#346cc8]" : "bg-[#585a5b]"}  w-[40px] h-[40px] rounded-[100%]`}>
                                        <span className={`text-[40px] text-[#fff] m-[0px]`}>{index + 1}</span>
                                    </div>
                                    <div onClick={() => showSpecialties(index)} className={`flex flex-col items-center ${actualDiv === index ? "w-[450px] h-[250px] border-[#12caff] cursor-pointer border-2 shadow-xl" : "w-[400px] h-[200px] border-1 cursor-not-allowed border-[#2d2f31] opacity-[0.7]"} justify-start border  border-solid rounded-[18px] p-[20px]`}>
                                        <h2 className={`text-[30px] ${actualDiv === index ? "text-[#12caff] bg-[#fff]" : "text-[#585a5b] "}  `}>{div.title}</h2>
                                        <p className={`text-[36px] ${actualDiv === index ? "text-[#346cc8] bg-[#fff]" : "text-[#585a5b] "}`}>{div.desc}</p>
                                    </div>
                                </div>

                            )
                        })}
                    </div>}


                </div>
            </div>
        </div>
    )
}

export default Appointment;