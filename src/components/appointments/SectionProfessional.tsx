import { FaUserDoctor } from "react-icons/fa6";
import { PiProhibitLight } from "react-icons/pi";
import { useAppointmentContext } from "../../context/AppointmentContext";
import Rating from '@mui/material/Rating';

const SectionProfessional: React.FC = () => {
    const { states, actions } = useAppointmentContext();
    const { professionals } = states;
    const { } = actions;

    console.log(professionals);

    return (
        <>
            {professionals.length === 0 ?
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="relative">
                        <FaUserDoctor color="#a3a6ab" size={90} className="flex-shrink-0" />
                        <PiProhibitLight color="#a3a6ab" size={200} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-shrink-0" />
                    </div>
                    <p className="text-[#282e3d] text-[1.2rem] font-300 text-center mt-[80px]">Primero seleccione una <strong>especialidad</strong> para ver nuestros profesionales.</p>
                </div>

                :

                <div className="w-full h-full flex flex-col items-center gap-[20px] justify-center">
                    <div className="flex items-start gap-[10px] justify-start flex-wrap">
                        <div className="flex items-center justify-center px-[10px] py-[8px] bg-[#fff] rounded-[24px] text-[#0047ba] text-[0.9rem] ">Todas</div>
                        <div className="flex items-center justify-center px-[10px] py-[8px] bg-[#fff] rounded-[24px] text-[0.9rem] text-[#0047ba]">Belgrano</div>
                        <div className="flex items-center justify-center px-[10px] py-[8px] bg-[#fff] rounded-[24px] text-[#0047ba] text-[0.9rem] ">Recoleta</div>
                        <div className="flex items-center justify-center px-[10px] py-[8px] bg-[#fff] rounded-[24px] text-[#0047ba] text-[0.9rem] ">Palermo</div>
                        <div className="flex items-center justify-center px-[10px] py-[8px] bg-[#fff] rounded-[24px] text-[#0047ba] text-[0.9rem] ">Almagro</div>
                    </div>
                    <div className=" w-[90%] h-[80%] rounded-[14px] flex flex-col items-center justify-start">
                        <div className="flex items-center w-full gap-[12px] justify-start bg-[#fff] rounded-[14px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] py-[16px] px-[22px]">
                            <div className="flex items-center justify-center w-[55px] h-[55px] p-[5px] rounded-full bg-[#a6cae6] ">
                                <FaUserDoctor size={40} color="#fff" className="flex-shrink-0" />
                            </div>
                            <div className="flex flex-col items-start justify-start">
                                <span style={{ fontWeight: "bold", color: "#000" }}>Dr. Oldani</span>
                                <span style={{ color: "#919191", fontWeight: "400", marginBottom: "10px", fontSize: "0.9rem" }}>Cardiologia</span>
                                <Rating
                                    name="read-only"
                                    value={4.5}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                />
                            </div>
                            <button
                                className="mx-auto hover:opacity-[0.8] transition-all duration-300 flex cursor-pointer items-center w-[100px] justify-center bg-[#0047ba] text-[#fff] border-none rounded-[24px] self-end text-[1rem] px-[8px] py-[5px]">
                                Seleccionar
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SectionProfessional;