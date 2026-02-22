import { IoPersonOutline } from "react-icons/io5";
import AppointmentCards from './AppointmentCards';
import { useAppointmentContext } from '../../context/AppointmentContext';
import NavBarAppointments from '../NavBarAppointments';
import { useNavigate } from 'react-router'; //
import { useEffect, useState } from "react";
import NextAppointments from "./NextAppointments";
import type { Patient } from "../../utils/models";

const AppointmentContainer: React.FC = () => {
    const { states, actions } = useAppointmentContext();
    const { arrayDivs, patient, nextAppointmentsOfPatient } = states;
    const { getNextAppointments, cancelAppointment, setPatient } = actions;
    const [window, setWindow] = useState<string>("getAppointments");
    const [patientInStorage, setPatientInStorage] = useState<Patient | undefined>(() => {
        const saved = localStorage.getItem('current_patient');
        return saved ? JSON.parse(saved) : undefined;
    });

    const navigate = useNavigate();

    useEffect(() => {

        if (patientInStorage) {
            setPatient(patientInStorage);
        } else {
            navigate('/login-appointments');
        }

    }, []);

    if (!patient) return null;

    return (
        <div className="flex flex-col items-center justify-start min-h-screen w-[100%] pb-[150px] bg-[linear-gradient(180deg,_#e2e8f0_0%,_#f8fafc_35%,_#ffffff_100%)] justify-center">
            <NavBarAppointments />

            {/* Contenedor principal */}
            <div className="flex flex-col items-center justify-center mt-[30px] w-[60%] max-[600px]:w-[70%] max-[600px]:mr-[70px]">
                {/* Div de titulo y sidebar */}
                <div className="flex flex-col items-start justify-start w-full h-auto">
                    {/* titulo */}
                    <h2 className="font-bold text-[2rem] text-start text-[#202c3d] max-[440px]:text-[1.5rem] ">Gestiona tus turnos</h2>
                    {/* Sidebar center */}

                    <div className="flex items-center w-[100%] max-[800px]:py-[15px] max-[800px]:items-start max-[800px]:flex-col px-[30px] justify-between bg-[#f0f0f3] rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-[70px] h-[70px]">
                        <div className="flex items-center justify-center max-[420px]:pb-[10px] gap-[12px]">
                            <IoPersonOutline size={25} className="flex-shrink-0 max-[800px]:w-[18px] max-[800px]:h-[18px]" />
                            <span className="capitalize max-[800px]:text-[12px]">{patient?.name.toLocaleLowerCase()} {patient?.lastname.toLocaleLowerCase()}</span>
                        </div>

                        <div className="flex items-center justify-center max-[800px]:pl-[0px] max-[800px]:justify-between max-[800px]:w-full gap-[20px] border-l-solid pl-[30px] max-[800px]:border-l-0 border-l-3 border-l-[#c3c8cc] max-[800px]:border-t-1 max-[800px]:pt-[10px] max-[800px]:border-t-[#c3c8cc]">
                            <div
                                onClick={() => {
                                    setWindow("getAppointments");
                                }
                                }
                                className={`flex ${window === "getAppointments" ? "bg-[#0047ba] text-[#fff]" : "bg-[#fff] text-[#000]"} items-center justify-center rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] max-[420px]:text-[10px] max-[420px]:py-[5px] max-[420px]:px-[15px] max-[800px]:text-[12px] py-[10px] h-fit px-[15px] cursor-pointer transition-all duration-[0.3s]`}>
                                <span className="text-center">Saca un turno</span>
                            </div>
                            <div
                                onClick={() => {
                                    patient?.id && getNextAppointments(patient.id);
                                    setWindow("nextAppointments");
                                }}
                                className={`flex ${window === "nextAppointments" ? "bg-[#0047ba] text-[#fff]" : "bg-[#fff] text-[#000]"} transition-all duration-[0.3s] items-center justify-center rounded-[20px] max-[420px]:text-[10px] max-[420px]:py-[5px] max-[420px]:px-[15px] max-[800px]:text-[12px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-[10px] h-fit px-[15px] cursor-pointer`}
                            >
                                <span className="text-center">Próximos turnos</span>
                            </div>

                        </div>
                    </div>
                </div>

                {window === "getAppointments" ? <div className='flex items-start justify-center gap-[50px]'>
                    {arrayDivs.map((data, index) => {
                        return (
                            <AppointmentCards data={data} index={index} />
                        )
                    })}
                </div> :

                    <NextAppointments nextAppointmentsOfPatient={nextAppointmentsOfPatient} cancelAppointment={cancelAppointment} />

                }



            </div>
        </div>
    );
}



export default AppointmentContainer;