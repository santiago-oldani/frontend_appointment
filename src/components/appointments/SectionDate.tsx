import { FaRegCalendarTimes } from "react-icons/fa";
import { PiProhibitLight } from "react-icons/pi";
import type { SelectDiv } from "../../utils/models";
import Calendar from "./Calendar";
import { useAppointmentContext } from "../../context/AppointmentContext";

interface AppointmentData {
    data: SelectDiv;
}

const SectionDate: React.FC<AppointmentData> = ({ data }) => {
    const { states, actions } = useAppointmentContext();
    const { availableAppointments, assignedAppointment } = states;
    const { getAppointmentsAvailable, confirmAppointment, selectAppointment, clearStatesOfAssignedAppointment } = actions;

    return (

        <>
            {data.state === "blocked" ?
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="relative">
                        <FaRegCalendarTimes color="#a3a6ab" size={70} className="flex-shrink-0 max-[600px]:w-[55px] max-[600px]:h-[55px]" />
                        <PiProhibitLight color="#a3a6ab" size={170} className="absolute max-[600px]:w-[140px] max-[600px]:h-[140px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex-shrink-0" />
                    </div>
                    <p className="text-[#282e3d] text-[1.2rem] font-300 text-center mt-[80px] max-[600px]:mt-[50px] max-[600px]:text-[1rem]">Primero debe seleccionar un <strong>profesional</strong> y una <strong>especialidad</strong> para elegir una fecha y hora.</p>
                </div> :

                <div className="flex flex-col items-center justify-center self-center w-full h-full">
                    <Calendar data={availableAppointments} getAppointmentsAvailable={getAppointmentsAvailable} clearStatesOfAssignedAppointment={clearStatesOfAssignedAppointment} confirmAppointment={confirmAppointment} selectAppointment={selectAppointment} assignedAppointment={assignedAppointment} />
                </div>

            }

        </>

    )
}

export default SectionDate;