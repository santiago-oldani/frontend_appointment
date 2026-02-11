import { FaUserDoctor } from "react-icons/fa6";
import { PiProhibitLight } from "react-icons/pi";
import { useAppointmentContext } from "../../context/AppointmentContext";
import Rating from '@mui/material/Rating';
import { useEffect, useState } from "react";
import type { Professional, SelectDiv } from "../../utils/models";
import SectionSelected from "./SectionSelected";

interface AppointmentData {
    data: SelectDiv;
}

const SectionProfessional: React.FC<AppointmentData> = ({ data }) => {
    const { states, actions } = useAppointmentContext();
    const { professionals, assignedAppointment } = states;
    const { selectProfessional, changeProfessional } = actions;
    const [selectedHeadQuarters, setSelectedHeadQuarters] = useState<Array<string>>(["Todas"]);
    const sedes = ["Todas", "Belgrano", "Recoleta", "Palermo", "Almagro"];

    const filtrarSede = (sede: string) => {
        setSelectedHeadQuarters((prev) => {
            if (sede === "Todas") return ["Todas"];
            if (prev.includes(sede)) {
                const newFilters = prev.filter((s) => s !== sede);
                return newFilters.length === 0 ? ["Todas"] : newFilters;
            }
            const filteredPrev = prev.filter(s => s !== "Todas");
            return [...filteredPrev, sede];
        });
    };

    const profesionalesFiltrados = professionals.filter((prof) => {
        if (selectedHeadQuarters.includes("Todas") || selectedHeadQuarters.length === 0) {
            return true;
        }
        return selectedHeadQuarters.includes(prof.headQuarters);
    });

    return (
        <>
            {professionals.length === 0 ? (
                /* CASO 1: No hay profesionales seleccionados por especialidad */
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="relative">
                        <FaUserDoctor color="#a3a6ab" size={90} className="flex-shrink-0" />
                        <PiProhibitLight color="#a3a6ab" size={200} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-shrink-0" />
                    </div>
                    <p className="text-[#282e3d] text-[1.2rem] font-300 text-center mt-[80px]">Primero seleccione una <strong>especialidad</strong> para ver nuestros profesionales.</p>
                </div>
            ) : !assignedAppointment?.professional ? (
                /* CASO 2: Hay profesionales, pero todavía NO se seleccionó uno del listado */
                <div className="w-full h-full flex flex-col items-center gap-[20px] justify-start overflow-y-auto py-[5px]">
                    <div className="flex items-start gap-[5px] justify-start flex-wrap">
                        {sedes.map((sede) => {
                            const isActive = selectedHeadQuarters.includes(sede);
                            return (
                                <div
                                    key={sede}
                                    className={`flex items-center justify-center px-[10px] py-[8px] rounded-[24px] cursor-pointer text-[0.9rem] transition-colors 
              ${isActive ? "bg-[#0047ba] text-[#fff]" : "bg-[#fff] text-[#0047ba] border border-[#0047ba]"}`}
                                    onClick={() => filtrarSede(sede)}
                                >
                                    {sede}
                                </div>
                            );
                        })}
                    </div>

                    <div className=" w-[90%] h-[80%] rounded-[14px] flex flex-col gap-[10px] items-center justify-start">
                        {profesionalesFiltrados.map((professional) => {
                            return (
                                <div key={professional.id} className="flex items-center w-full gap-[12px] justify-start bg-[#fff] rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-[16px] px-[10px]">
                                    <div className="flex items-center justify-center w-[50px] h-[50px] p-[5px] rounded-full bg-[#a6cae6] flex-shrink-0">
                                        <FaUserDoctor size={35} color="#fff" className="flex-shrink-0" />
                                    </div>
                                    <div className="flex flex-col items-start justify-start">
                                        <span style={{ fontWeight: "bold", color: "#000", whiteSpace: "nowrap", fontSize: "0.9rem" }}>Dr. {professional.name} {professional.lastname}</span>
                                        <span style={{ color: "#919191", fontWeight: "400", marginBottom: "10px", fontSize: "0.85rem" }}>{professional.specialty.name}</span>
                                        <Rating
                                            name="read-only"
                                            value={professional.ratingValue}
                                            precision={0.5}
                                            readOnly
                                            size="small"
                                        />
                                    </div>
                                    <button
                                        onClick={() => selectProfessional(professional.id)}
                                        className="ml-auto hover:opacity-[0.8] transition-all duration-300 flex cursor-pointer items-center w-[100px] justify-center bg-[#0047ba] text-[#fff] border-none rounded-[24px] self-end justify-self-end text-[0.9rem] px-[8px] py-[5px]">
                                        Seleccionar
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                /* CASO 3: Ya se seleccionó un profesional */
                <SectionSelected data={data} specialtySelected={assignedAppointment.professional} changeSpecialtyOrProfessional={changeProfessional} />
            )}
        </>
    )
}

export default SectionProfessional;