import { IoPersonOutline } from "react-icons/io5";
import AppointmentCards from './AppointmentCards';
import { useAppointmentContext } from '../../context/AppointmentContext';
import NavBarAppointments from '../NavBarAppointments';
import { useNavigate } from 'react-router'; //
import { useEffect, useState } from "react";
import NextAppointments from "./NextAppointments";

const AppointmentContainer: React.FC = () => {
    const { states, actions } = useAppointmentContext();
    const { arrayDivs, patient, nextAppointmentsOfPatient } = states;
    const { getNextAppointments, cancelAppointment } = actions;
    const [window, setWindow] = useState<string>("getAppointments");

    console.log(patient);

    const navigate = useNavigate();

    useEffect(() => {
        if (!patient) {
            navigate('/login-appointments');
        }
    }, [patient, navigate]);

    if (!patient) return null;

    return (
        <div className="flex flex-col items-center justify-start min-h-screen w-[100%] pb-[150px] bg-[linear-gradient(180deg,_#e2e8f0_0%,_#f8fafc_35%,_#ffffff_100%)]  justify-center w-full">
            <NavBarAppointments />

            {/* Contenedor principal */}
            <div className="flex flex-col items-center justify-center mt-[30px] w-[60%] ">
                {/* Div de titulo y sidebar */}
                <div className="flex flex-col items-start justify-start w-full h-auto">
                    {/* titulo */}
                    <h2 className="font-bold text-[2rem] text-start text-[#202c3d]">Gestiona tus turnos</h2>
                    {/* Sidebar center */}
                    <div className="flex items-center w-[100%] px-[30px] justify-between bg-[#f0f0f3] rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full mb-[70px] h-[70px]">
                        <div className="flex items-center justify-center gap-[12px]">
                            <IoPersonOutline size={25} className="flex-shrink-0" />
                            <span className="capitalize">{patient?.name.toLocaleLowerCase()} {patient?.lastname.toLocaleLowerCase()}</span>
                        </div>

                        <div className="flex items-center gap-[20px] justify-center border-l-solid pl-[30px] border-l-3 border-l-[#c3c8cc]">
                            <div
                                onClick={() => {
                                    setWindow("getAppointments");
                                }
                                }
                                className={`flex ${window === "getAppointments" ? "bg-[#0047ba] text-[#fff]" : "bg-[#fff] text-[#000]"} items-center justify-center rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] py-[10px] h-fit px-[15px] cursor-pointer transition-all duration-[0.3s]`}>
                                <span>Saca un turno</span>
                            </div>
                            <div
                                onClick={() => {
                                    patient?.id && getNextAppointments(patient.id);
                                    setWindow("nextAppointments");
                                }}
                                className={`flex ${window === "nextAppointments" ? "bg-[#0047ba] text-[#fff]" : "bg-[#fff] text-[#000]"} transition-all duration-[0.3s] items-center justify-center rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-[10px] h-fit px-[15px] cursor-pointer`}
                            >
                                <span>Próximos turnos</span>
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
                
                <NextAppointments nextAppointmentsOfPatient={nextAppointmentsOfPatient} cancelAppointment={cancelAppointment}/>
                
                }



            </div>
        </div>
    );
}



export default AppointmentContainer;