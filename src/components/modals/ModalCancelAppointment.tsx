import { IoIosCloseCircleOutline } from "react-icons/io";
import type { Appointment } from "../../utils/models";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useState } from "react";
dayjs.locale('es');

// "2026-02-12T06:00:00" -> "12 de Febrero, 2026"
const formatFecha = (fechaStr: string | undefined) => {
    return dayjs(fechaStr).format('D [de] MMMM, YYYY');
};

// "2026-02-12T06:00:00" -> "06:00 hs"
const formatHora = (fechaStr: string | undefined) => {
    return dayjs(fechaStr).format('HH:mm [hs]');
};

interface propsNextAppointments {
    nextAppointmentOfPatient: Appointment;
    cancelAppointment: Function;
    setShowModalToCancelAppointment: Function;
}

const ModalCancelAppointment: React.FC<propsNextAppointments> = ({ nextAppointmentOfPatient, cancelAppointment, setShowModalToCancelAppointment }) => {

    return (
        // fixed inset-0 debería bastar, pero agregamos w-screen h-screen por seguridad
        <div className="fixed inset-[0px] w-screen h-screen z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-[12px]">

            {/* Contenedor del Modal */}
            <div className="flex flex-col gap-[20px] justify-start items-start bg-[#fff] w-[90%] max-w-[400px] rounded-[14px] h-auto p-[55px] shadow-2xl relative">
                {/* Botón X para cerrar */}
                <div
                    onClick={() => setShowModalToCancelAppointment(undefined)}
                    className="absolute top-[20px] right-[20px] text-gray-500 hover:text-black cursor-pointer"
                >
                    <IoIosCloseCircleOutline size={40} color="#1e335f" className="flex-shrink-0" />
                </div>

                <>
                    <h2 className="text-2xl font-bold text-[#0047ba] mb-[20px] text-[1.8rem]">¿Desea cancelar el siguiente turno?</h2>

                    <div className="flex flex-col items-start justify-start gap-[10px]">
                        <p className="text-[1.2rem] text-[#1e335f]"><strong>Especialidad:</strong> {nextAppointmentOfPatient?.professional?.specialty?.name}</p>
                        <p className="text-[1.2rem] text-[#1e335f]"><strong>Profesional:</strong> {nextAppointmentOfPatient?.professional?.name} {nextAppointmentOfPatient?.professional?.lastname}</p>
                        <p className="text-[1.2rem] text-[#1e335f]"><strong>Fecha:</strong> {formatFecha(nextAppointmentOfPatient?.date)}</p>
                        <p className="text-[1.2rem] text-[#1e335f]"><strong>Hora:</strong> {formatHora(nextAppointmentOfPatient?.date)}</p>
                    </div>

                    <hr className="w-[95%] text-[#e9e9ed] text-[0.5]" />

                    <div className="flex self-center gap-[10px] mt-8">
                        <button
                            onClick={() => {
                                cancelAppointment(nextAppointmentOfPatient.id, nextAppointmentOfPatient.patient.id)
                                setShowModalToCancelAppointment(undefined);
                            }}
                            className="flex-1 w-[350px] h-[40px] px-[30px] py-[5px] rounded-[12px] cursor-pointer border-none bg-[#ff4d4d] text-[#fff] hover:opacity-90 transition-all">
                            Cancelar Turno
                        </button>
                    </div>
                </>
            </div>
        </div >
    );
};

export default ModalCancelAppointment;