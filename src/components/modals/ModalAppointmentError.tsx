import { MdErrorOutline } from "react-icons/md";

interface propsModal{
    secondsToRedirect: number;
    
}

const ModalAppointmentError: React.FC<propsModal> = ({secondsToRedirect}) => {
    return (
        <>
            {/* Contenedor del Modal */}
            <div className="flex flex-col gap-[20px] justify-center items-center bg-[#fff] w-[90%] max-w-[400px] rounded-[14px] h-auto p-[30px] relative">

                <h2 className="text-center font-bold text-[#000] mb-[20px] text-[1.8rem]">¡Ha ocurrido un error asignando el turno!</h2>

                <MdErrorOutline size={50} color="rgb(202, 0, 0)"/>

                <span>Usted sera redirigido en {secondsToRedirect} segundos</span>
            </div>
        </>
    );
};

export default ModalAppointmentError;