import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

interface Sedes {
    location: string;
    address: string;
    img_url: string;
    map_url: string;
    description: string;
    colectivo: string;
    subte: string;
}

interface SedesProps {
    // Esperamos un array de objetos 'Sede'
    sede: Sedes;
}

const ContainerHeadQuarters: React.FC<SedesProps> = ({ sede }) => {
    let arrayColectivosSedes = sede.colectivo.split(',');

    return (
        <>
            <div className="flex max-[700px]:flex-col items-center w-[fit-content] gap-[30px] justify-center">
                <div className="flex flex-col w-[35%] max-[700px]:w-[70%] py-[25px] px-[10px] h-auto items-center hover:scale-105 transition duration-400 justify-center bg-[#fff] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] ">
                    <img src={sede.img_url} alt="" className="w-[250px] h-auto rounded-[40px] max-[380px]:w-[150px]" />

                    <div className="flex flex-col items-start w-[75%] mt-[30px] justify-center">
                        <h1 className="self-left text-[#1e335f] mt-[0px] max-[380px]:text-[1.5rem]">Sede {sede.location}</h1>
                        <div className="flex items-center justify-center gap-[10px]">
                            <FaMapMarkerAlt size={20} color="#1e335f" className="flex-shrink-0" />
                            <h2 className="text-[#1e335f] text-[1rem] max-[380px]:text-[0.8rem]">{sede.address}</h2>
                        </div>
                        <div className="flex items-center justify-center gap-[10px]">
                            <IoMdTime size={20} color="#1e335f" className="flex-shrink-0" />
                            <h3 className="text-[#1e335f] text-[1rem] max-[380px]:text-[0.8rem]">De lunes a viernes de 8 a 20 horas y sabados de 8 a 13 horas.</h3>
                        </div>

                        <div className="flex flex-col items-start w-full justify-center">
                            <h3 className="text-[#1e335f] max-[380px]:text-[1rem]">¿Cómo llegar?</h3>
                            <div className="flex items-center gap-[20px] justify-center">
                                <div className={`flex items-center justify-center w-[30px] h-[30px] ${sede.subte === "D" ? "bg-[#27a353]" : sede.subte === "H" ? "bg-[#fed200]" : "bg-[#ef1428]" }  rounded-full p-[10px]`}>
                                    <span className="text-[#fff] text-[2rem] font-bold">{sede.subte}</span>
                                </div>
                                <div className="flex items-center justify-center w-[80%] flex-wrap gap-[10px]">
                                    {arrayColectivosSedes.map((colectivo) => {
                                        return (
                                            <div className="flex items-center justify-center bg-[#5d9ee8] px-[6px] py-[4px] rounded-[4px]">
                                                <span className="text-[#fff] max-[380px]:text-[0.8rem]">{colectivo}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col w-[35%] max-[700px]:w-[80%] bg-[#fff] p-[20px] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] items-center justify-center">
                    <iframe
                        src={sede.map_url}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-[100%] h-[567px] max-[700px]:h-[300px]"
                    >
                    </iframe>

                </div>
            </div>
        </>
    )
}

export default ContainerHeadQuarters;