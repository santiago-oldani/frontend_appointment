import type { Appointment, SelectDiv, Patient } from '../../utils/models';
import { useAppointments } from '../../hooks/useAppointments';
import { IoPersonOutline } from "react-icons/io5";
import AppointmentCards from './AppointmentCards';
import { AppointmentProvider, useAppointmentContext } from '../../context/AppointmentContext';

const patient: Patient = {
    id: 1,
    name: "Santiago",
    lastname: "Oldani"
}

const Appointment: React.FC = () => {
    return (
        <AppointmentProvider patient={patient}>
            <AppointmentLayout />
        </AppointmentProvider>
    )
}

const AppointmentLayout: React.FC = () => {
    // Ahora este hook funciona porque estamos DENTRO del Provider
    const { states, actions } = useAppointmentContext();
    const { arrayDivs } = states;
    const { setShowNextAppointments, getNextAppointments } = actions;

    return (
        <div className="flex flex-col items-center justify-start min-h-screen w-[100%] pb-[150px] bg-[linear-gradient(180deg,_#e2e8f0_0%,_#f8fafc_35%,_#ffffff_100%)]  justify-center w-full">

            {/* Contenedor principal */}
            <div className="flex flex-col items-center justify-center mt-[50px] w-[60%] ">
                {/* Div de titulo y sidebar */}
                <div className="flex flex-col items-start justify-start w-full h-auto">
                    {/* titulo */}
                    <h2 className="font-bold text-[2rem] text-start text-[#202c3d]">Gestiona tus turnos</h2>
                    {/* Sidebar center */}
                    <div className="flex items-center w-[100%] px-[30px] justify-between bg-[#f0f0f3] rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-full mb-[100px] h-[70px]">
                        <div className="flex items-center justify-center gap-[12px]">
                            <IoPersonOutline size={25} className="flex-shrink-0" />
                            <span>Santiago Oldani</span>
                        </div>

                        <div className="flex items-center gap-[20px] justify-center border-l-solid pl-[30px] border-l-3 border-l-[#c3c8cc]">
                            <div onClick={() => setShowNextAppointments(false)} className="flex bg-[#fff] items-center justify-center rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] py-[10px] h-fit px-[15px] cursor-pointer">
                                <span>Saca un turno</span>
                            </div>
                            <div
                                onClick={() => getNextAppointments(patient.id)}
                                className="flex bg-[#fff] items-center justify-center rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-[10px] h-fit px-[15px] cursor-pointer"
                            >
                                <span>Próximos turnos</span>
                            </div>
                            <div className="flex bg-[#fff] items-center justify-center rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] py-[10px] h-fit px-[15px] cursor-pointer">
                                <span>Saca un turno</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex items-start justify-center gap-[50px]'>
                    {arrayDivs.map((data, index) => {
                        return (
                            <AppointmentCards data={data} index={index} />
                        )
                    })}
                </div>

            </div>
        </div>
    );
}



export default Appointment;