import type { Appointment } from "../../utils/models";

interface propsNextAppointments {
    nextAppointmentsOfPatient: Appointment[];
    cancelAppointment: Function;
}

const NextAppointments: React.FC<propsNextAppointments> = ({ nextAppointmentsOfPatient, cancelAppointment }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        const month = date.toLocaleString('es-AR', { month: 'short' }).toUpperCase().replace('.', '');

        const day = date.getDate();

        const time = date.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        return { month, day, time };
    };

    console.log(nextAppointmentsOfPatient[0]?.professional?.specialty?.name);
    return (
        <div className="flex flex-col gap-[16px] w-full max-w-[900px] animate-fade-in">
            <h3 className="text-[#202c3d] font-semibold text-[1.5rem] mb-[10px]">Tus turnos programados</h3>

            {nextAppointmentsOfPatient.length > 0 ? (
                nextAppointmentsOfPatient.map((turno) => {
                    const { month, day, time } = formatDate(turno.date);

                    return (
                        <div key={turno.id} className="flex items-center justify-between bg-white p-[24px] rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#f0f0f3]">

                            {/* Fecha y Hora */}
                            <div className="flex flex-col items-center justify-center bg-[#f0f7ff] text-[#0047ba] p-[15px] rounded-[18px] min-w-[90px]">
                                <span className="text-[12px] font-bold uppercase">{month}</span>
                                <span className="text-[24px] font-black">{day}</span>
                            </div>

                            {/* Información del Profesional */}
                            <div className="flex-1 ml-[25px]">
                                <span className=" text-[14px] font-medium text-[#000]">{turno.professional?.specialty?.name}</span>
                                <h4 className="text-[#202c3d] text-[18px] font-bold">Dr. {turno.professional?.name} {turno.professional?.lastname}</h4>
                                <div className="flex items-center gap-[8px] mt-[4px]">
                                    <span className="w-[8px] h-[8px] bg-[#10b981] rounded-full"></span>
                                    <span className="text-[#10b981] text-[13px] font-semibold">{time}hs</span>
                                </div>
                            </div>

                            {/* Botón de Acción */}
                            <button
                                onClick={() => cancelAppointment(turno.id, turno.patient.id)}
                                className="bg-[#ff4d4d] text-[#fff] border-none font-semibold text-[14px] hover:bg-[#a80215] cursor-pointer px-[15px] py-[8px] rounded-[12px] transition-all duration-[0.3s]">
                                Cancelar turno
                            </button>
                        </div>
                    )
                })
            ) : (
                <div className="text-center py-[50px] text-[#8892a0]">
                    No tenés turnos programados para los próximos días.
                </div>
            )}
        </div>
    )
}

export default NextAppointments;