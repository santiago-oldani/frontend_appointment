import { FaCheckCircle } from "react-icons/fa";

const ModalAppointmentChecked: React.FC = () => {
    return (
        <>
            {/* Contenedor del Modal */}
            <div className="flex flex-col gap-[20px] justify-start items-start bg-[#fff] w-[90%] max-w-[400px] rounded-[14px] h-auto p-[30px] shadow-2xl relative">

                <h2 className="text-2xl font-bold text-[#0047ba] mb-[20px] text-[1.8rem]">Turno asignado correctamente!</h2>

                <FaCheckCircle size={50} color="rgb(15, 182, 0)"/>
            </div>
        </>
    );
};

export default ModalAppointmentChecked;