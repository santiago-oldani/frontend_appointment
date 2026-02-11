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
    const { getAppointmentsAvailable, confirmAppointment, selectAppointment } = actions;

    return (

        <>
            {data.state === "blocked" ?
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="relative">
                        <FaRegCalendarTimes color="#a3a6ab" size={90} className="flex-shrink-0" />
                        <PiProhibitLight color="#a3a6ab" size={200} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-shrink-0" />
                    </div>
                    <p className="text-[#282e3d] text-[1.2rem] font-300 text-center mt-[80px]">Primero debe seleccionar un <strong>profesional</strong> y una <strong>especialidad</strong> para elegir una fecha y hora.</p>
                </div> :

                <div className="flex flex-col items-center justify-center self-center w-full h-full">
                    <Calendar data={availableAppointments} getFunctionAppointments={getAppointmentsAvailable} confirmAppointment={confirmAppointment} selectAppointment={selectAppointment} assignedAppointment={assignedAppointment}/>
                </div>

            }

        </>

    )
}

export default SectionDate;