import { IoIosCloseCircleOutline } from "react-icons/io";
import type { Appointment } from "../../utils/models";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useEffect, useState } from "react";
import ModalAppointmentChecked from "./ModalAppointmentChecked";
import ModalAppointmentError from "./ModalAppointmentError";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
dayjs.locale('es');

interface ModalConfirmProps {
    setModalConfirm: Function;
    confirmAppointment: Function;
    assignedAppointment: Appointment | undefined;
    clearStatesOfAssignedAppointment: Function;
}

// "2026-02-12T06:00:00" -> "12 de Febrero, 2026"
const formatFecha = (fechaStr: string | undefined) => {
    return dayjs(fechaStr).format('D [de] MMMM, YYYY');
};

// "2026-02-12T06:00:00" -> "06:00 hs"
const formatHora = (fechaStr: string | undefined) => {
    return dayjs(fechaStr).format('HH:mm [hs]');
};

const ModalConfirmAppointment: React.FC<ModalConfirmProps> = ({ setModalConfirm, confirmAppointment, assignedAppointment, clearStatesOfAssignedAppointment }) => {
    const [secondsToRedirect, setSecondsToRedirect] = useState<number>(3);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleConfirm = async () => {
        setStatus('loading');
        const isOk = await confirmAppointment(assignedAppointment?.id);

        if (isOk) {
            setStatus('success');
        } else {
            setStatus('error');
        }
    };

    useEffect(() => {
        if (status === 'idle' || status === 'loading' || secondsToRedirect <= 0) return;

        const timer = setInterval(() => {
            setSecondsToRedirect((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [status, secondsToRedirect]);

    useEffect(() => {
        if (secondsToRedirect === 0) {
            setModalConfirm(false);
            clearStatesOfAssignedAppointment();
        }
    }, [secondsToRedirect])

    return (
        <div className="fixed inset-[0px] w-screen h-screen z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.4)] backdrop-blur-[12px]">

            {/* Contenedor del Modal */}
            <div className="flex flex-col gap-[20px] min-h-[300px] max-[530px]:w-[250px] max-[600px]:p-[20px] justify-center items-start bg-[#fff] w-[90%] max-w-[400px] rounded-[14px] h-auto p-[55px] shadow-2xl relative">

                {status === 'loading' &&
                    <div className="flex flex-col items-center justify-center gap-[20px] self-center">
                        <AiOutlineLoading3Quarters
                            className="spinner-fijo text-[#0047ba]"
                            size={40}
                        />
                        <p className="text-[#1e335f] font-medium">Procesando tu turno...</p>
                    </div>
                }

                {status === 'success' && <ModalAppointmentChecked secondsToRedirect={secondsToRedirect} />}

                {status === 'error' && <ModalAppointmentError secondsToRedirect={secondsToRedirect} />}

                {status === 'idle' && (
                    <>
                        {/* Botón X para cerrar */}
                        <div
                            onClick={() => {
                                setModalConfirm(false);

                            }}
                            className="absolute top-[20px] right-[20px] text-gray-500 hover:text-black cursor-pointer"
                        >
                            <IoIosCloseCircleOutline size={40} color="#1e335f" className="flex-shrink-0" />
                        </div>

                        <h2 className="text-2xl font-bold text-[#0047ba] mb-[20px] text-[1.8rem] max-[600px]:text-[1.5rem]">Confirmar Turno</h2>

                        <div className="flex flex-col items-start justify-start gap-[10px]">
                            <p className="text-[1.2rem] text-[#1e335f] max-[600px]:text-[1rem]"><strong>Especialidad:</strong> {assignedAppointment?.specialty?.name}</p>
                            <p className="text-[1.2rem] text-[#1e335f] max-[600px]:text-[1rem]"><strong>Profesional:</strong> {assignedAppointment?.professional?.name} {assignedAppointment?.professional?.lastname}</p>
                            <p className="text-[1.2rem] text-[#1e335f] max-[600px]:text-[1rem]"><strong>Fecha:</strong> {formatFecha(assignedAppointment?.date)}</p>
                            <p className="text-[1.2rem] text-[#1e335f] max-[600px]:text-[1rem]"><strong>Hora:</strong> {formatHora(assignedAppointment?.date)}</p>
                        </div>

                        <hr className="w-[95%] text-[#e9e9ed] text-[0.5]" />

                        <div className="flex self-center gap-[10px] mt-8">
                            <button
                                onClick={() => setModalConfirm(false)}
                                className="flex-1 px-[30px] py-[15px] rounded-[12px] max-[600px]:w-[120px] max-[600px]:px-[15px] max-[600px]:py-[10px] cursor-pointer border-none hover:bg-gray-50 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 w-[250px] px-[30px] py-[5px] rounded-[12px] max-[600px]:w-[120px] max-[600px]:px-[15px] max-[600px]:py-[10px] cursor-pointer text-[#fff] border-none bg-[#0047ba] text-white hover:opacity-90 transition-all">
                                Confirmar
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div >
    );
};

export default ModalConfirmAppointment;