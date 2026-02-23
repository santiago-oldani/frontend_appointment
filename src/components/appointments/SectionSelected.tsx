import { FaCheck } from "react-icons/fa";
import type { Professional, SelectDiv, Specialty } from "../../utils/models";
import { FaUserDoctor } from "react-icons/fa6";

interface AppointmentData {
    data: SelectDiv;
    specialtySelected?: Specialty | Professional | null;
    changeSpecialtyOrProfessional: () => void;
    icon?: React.ReactNode;
}

const SectionSelected: React.FC<AppointmentData> = ({ data, specialtySelected, changeSpecialtyOrProfessional, icon }) => {

    // Función para verificar si es un Profesional (si tiene apellido, es médico)
    const isProfessional = (item: any): item is Professional => {
        return item && (item as Professional).lastname !== undefined;
    };

    return (
        <div className="flex flex-col items-center justify-around w-full h-full ">
            <div className="h-[20px]"></div>

            <div className="bg-[#fff] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[14px] p-[20px] max-[600px]:px-[13px] border-[2px] border-[#168027]">

                {/* CONTENEDOR DEL ICONO */}
                <div className="flex items-center justify-center w-[35px] h-[35px] max-[1220px]:w-[20px] max-[1220px]:h-[20px] p-[10px] max-[1220px]:p-[6px] bg-[#168027] rounded-[8px] mr-[14px] max-[600px]:mr-[10px] max-[600px]:w-[15px] max-[600px]:h-[15px]">
                    <div className={`${data.state === "selected" ? "scale-[1.5]" : "scale-100"} max-[1220px]:scale-[1.0]`}>
                        {/* Si es profesional, mostramos el doctor. Si no, el icono que vino por prop */}
                        {isProfessional(specialtySelected)
                            ? <FaUserDoctor size={20} color="#fff" className="max-[1220px]:w-[15px] max-[1220px]:h-[15px] max-[600px]:w-[10px] max-[600px]:h-[10px]" />
                            : icon
                        }
                    </div>
                </div>

                {/* TEXTO: NOMBRE / NOMBRE Y APELLIDO */}
                <span className="text-[#1a1d46] font-bold text-[1.4rem] mr-[25px] max-[600px]:mr-[10px] max-[1220px]:text-[1.2rem]">
                    {isProfessional(specialtySelected)
                        ? `Dr. ${specialtySelected.name} ${specialtySelected.lastname}`
                        : specialtySelected?.name
                    }
                </span>

                <span onClick={() => changeSpecialtyOrProfessional()} className="text-[#0567e8] cursor-pointer underline max-[1220px]:text-[0.9rem]">Cambiar</span>
            </div>

            {/* CHECK DE CONFIRMACIÓN */}
            <div className="flex items-center justify-center w-[50px] h-[50px] max-[1220px]:w-[35px] max-[1220px]:h-[35px] max-[600px]:w-[30px] max-[600px]:h-[30px] p-[10px] rounded-full bg-[#168027]">
                <FaCheck color="#fff" size={40} className="max-[1220px]:w-[30px] max-[1220px]:h-[30px] max-[600px]:w-[25px] max-[600px]:h-[25px]"/>
            </div>
        </div>
    );
}

export default SectionSelected;