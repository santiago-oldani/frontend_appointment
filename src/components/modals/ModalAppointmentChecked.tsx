import { FaCheckCircle } from "react-icons/fa";

interface propsModal{
    secondsToRedirect: number;
}

const ModalAppointmentChecked: React.FC<propsModal> = ({secondsToRedirect}) => {
    return (
        <>
            {/* Contenedor del Modal */}
            <div className="flex flex-col gap-[20px] justify-center items-center bg-[#fff] w-[90%] max-w-[400px] rounded-[14px] h-auto p-[30px] shadow-2xl relative">

                <h2 className="text-center font-bold text-[#000] mb-[20px] text-[1.8rem]">¡Turno asignado correctamente!</h2>

                <FaCheckCircle size={50} color="rgb(15, 182, 0)"/>

                <span>Usted sera redirigido en {secondsToRedirect} segundos</span>
            </div>
        </>
    );
};

export default ModalAppointmentChecked;