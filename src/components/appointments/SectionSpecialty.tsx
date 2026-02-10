import { IoSearchSharp, IoEyeSharp } from "react-icons/io5";
import { FaTooth, FaBrain, FaHeart } from "react-icons/fa";
import type { SelectDiv, Specialty } from "../../utils/models";
import { useEffect, useState, type ChangeEvent, type JSX } from "react";
import { MdGrain } from "react-icons/md";
import { GiLungs } from "react-icons/gi";
import { useAppointmentContext } from "../../context/AppointmentContext";
import SectionSelected from "./SectionSelected";

interface AppointmentData {
    data: SelectDiv;
}

const SectionSpecialty: React.FC<AppointmentData> = ({ data }) => {
    const { states, actions } = useAppointmentContext();
    const [specialtySelected, setSpecialtySelected] = useState<Specialty>();
    const { specialties } = states;
    const { showSpecialties, setSpecialties, selectSpecialty } = actions;
    const [searchTerm, setSearchTerm] = useState("");

    const iconMap: Record<string, JSX.Element> = {
        "Odontología": <FaTooth size={data.state === "selected" ? 60 : 15} color="#fff" className="flex-shrink-0" />,
        "Oftalmología": <IoEyeSharp size={15} color="#fff" className="flex-shrink-0" />,
        "Cardiología": <FaHeart size={15} color="#fff" className="flex-shrink-0" />,
        "Dermatologia": <MdGrain size={15} color="#fff" className="flex-shrink-0" />,
        "Neumología": <GiLungs size={15} color="#fff" className="flex-shrink-0" />,
        "Neurología": <FaBrain size={15} color="#fff" className="flex-shrink-0" />
    }

    useEffect(() => {
        showSpecialties();
    }, []);

    useEffect(() => {
        if (specialties.length > 0 && !specialties[0].icono) {
            setSpecialties(prev =>
                prev.map(esp => ({
                    ...esp,
                    icono: iconMap[esp.name]
                }))
            );
        }
    }, [specialties, setSpecialties]);

    const specialtyClicked = (specialty: Specialty | undefined) => {
        if (!specialty) {
            console.warn("Se intentó seleccionar una especialidad inexistente.");
            return;
        }
        setSpecialtySelected(specialty);
    };

    const filterSpecialties = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredList = specialties.filter(esp =>
        esp.name.toLowerCase().includes(searchTerm)
    );

    return (

        <>
            {data.state === "next" ?

                <div className="flex flex-col items-center self-center my-auto justify-center gap-[10px]">

                    <div className="flex items-center justify-center bg-[#fff] rounded-[12px] p-[8px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-[35px]">
                        <input
                            type="text"
                            placeholder="Especialidad..."
                            className="flex-1 border-none text-[1rem] outline-none bg-transparent"
                            onChange={(e) => filterSpecialties(e)}
                        />
                        <IoSearchSharp size={25} className="flex-shrink-0" color="#a3a6ab" />
                    </div>

                    <div className="grid grid-cols-2 gap-[12px] p-[12px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white rounded-[20px] ">
                        {filteredList.map((specialty) => {
                            return (
                                <div
                                    key={specialty.name}
                                    onClick={() => specialtyClicked(specialty)}
                                    className={`flex items-center justify-center w-[100px] ${specialtySelected?.name === specialty.name ? "bg-[#155c85] hover:none" : "bg-[#a6cae6] hover:bg-[#85b5d9]"}  rounded-[12px] gap-[10px] px-[20px] py-[10px] cursor-pointer  transition-colors`}>
                                    {specialty.icono}
                                    <span className="text-[#fff] font-medium whitespace-nowrap">{specialty.name}</span>
                                </div>
                            )
                        })}
                    </div>

                    <button
                        onClick={() => specialtySelected && selectSpecialty(specialtySelected.id)}
                        disabled={!specialtySelected}
                        className={`mx-auto  ${!specialtySelected ? "opacity-[0.6] cursor-not-allowed hover:none" : "cursor-pointer hover:opacity-[0.8]"} mb-[50px] transition-all duration-300 mt-[20px] flex  items-center w-full justify-center bg-[#0047ba] text-[#fff] border-none rounded-[24px] text-[1.2rem] px-[24px] py-[10px]`}>
                        Seleccionar
                    </button>
                </div> :

                /* Lo que se muestra cuando ya seleccionaste una especialidad */
                <SectionSelected data={data} specialtySelected={specialtySelected}/>

            }


        </>
    )
}

export default SectionSpecialty;