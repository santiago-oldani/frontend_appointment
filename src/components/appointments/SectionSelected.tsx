import { FaCheck } from "react-icons/fa";
import type { Professional, SelectDiv, Specialty } from "../../utils/models";
import { FaUserDoctor } from "react-icons/fa6";

interface AppointmentData {
    data: SelectDiv;
    specialtySelected?: Specialty | Professional;
    changeSpecialtyOrProfessional: Function;
}

const SectionSelected: React.FC<AppointmentData> = ({ data, specialtySelected, changeSpecialtyOrProfessional }) => {
    
    // Función para verificar si es un Profesional (si tiene apellido, es médico)
    const isProfessional = (item: any): item is Professional => {
        return item && (item as Professional).lastname !== undefined;
    };

    // Función para verificar si es una Especialidad (si tiene la propiedad icono)
    const isSpecialty = (item: any): item is Specialty => {
        return item && (item as Specialty).icono !== undefined;
    };

    return (
        <div className="flex flex-col items-center justify-around w-full h-full ">
            <div className="h-[20px]"></div>

            <div className="bg-[#fff] flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[14px] p-[20px] border-[2px] border-[#168027]">
                
                {/* CONTENEDOR DEL ICONO */}
                <div className="flex items-center justify-center w-[35px] h-[35px] p-[10px] bg-[#168027] rounded-[8px] mr-[14px]">
                    <div className={data.state === "selected" ? "scale-[1.5]" : "scale-100"}>
                        {isSpecialty(specialtySelected) && specialtySelected.icono}
                        {isProfessional(specialtySelected) && <FaUserDoctor size={20} color="#fff" />}
                    </div>
                </div>

                {/* TEXTO: NOMBRE / NOMBRE Y APELLIDO */}
                <span className="text-[#1a1d46] font-bold text-[1.4rem] mr-[25px]">
                    {isProfessional(specialtySelected) 
                        ? `Dr. ${specialtySelected.name} ${specialtySelected.lastname}`
                        : specialtySelected?.name
                    }
                </span>

                <span onClick={() => changeSpecialtyOrProfessional()} className="text-[#0567e8] cursor-pointer underline">Cambiar</span>
            </div>

            {/* CHECK DE CONFIRMACIÓN */}
            <div className="flex items-center justify-center w-[50px] h-[50px] p-[10px] rounded-full bg-[#168027]">
                <FaCheck color="#fff" size={40} />
            </div>
        </div>
    );
}

export default SectionSelected;