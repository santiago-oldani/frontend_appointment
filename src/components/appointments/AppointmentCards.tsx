import type { SelectDiv } from "../../utils/models";
import SectionProfessional from "./SectionProfessional";
import SectionDate from "./SectionDate";
import SectionSpecialty from "./SectionSpecialty";

// 1. Definimos la interfaz de las props
interface AppointmentCardsProps {
    data: SelectDiv;
    index: number; // Agregamos el index para mostrar el número 1, 2 o 3
}

// 2. Pasamos la interfaz al generic de React.FC
const AppointmentCards: React.FC<AppointmentCardsProps> = ({ data, index }) => {

    const stateColors: Record<string, string> = {
        blocked: "border-[#a3a6ab]",
        next: "border-[#0047ba]",
        selected: "border-[#168027]"
    };

    const getCardHeight = () => {
        if (data.state === "selected") return "h-[450px]";

        if (data.state === "next" && data.title.toLowerCase() === "fecha y hora") {
            return "h-auto";
        }

        return "h-[550px]";
    };

    const borderColor = stateColors[data.state];
    const cardHeight = getCardHeight();

    return (
        <div className={`flex flex-col p-[20px] ${cardHeight} max-[600px]:border-[5px] ${data.state === 'blocked' && 'max-[600px]:h-[400px]'} ${data.state === 'selected' && 'max-[600px]:h-[380px]'} ${data.state === 'next' && data.title.toLocaleLowerCase() === "especialidad" && "max-[600px]:h-auto"} max-[1220px]:w-[250px] max-[600px]:w-[240px] items-start shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[315px] p-8 bg-[#eeeff1] rounded-[32px] shadow-2xl transition-all duration-500 border-[6px] ${borderColor}`}>
            {/* Círculo con el número del paso */}
            <div className={`flex items-center justify-center w-[45px] h-[45px] max-[600px]:w-[30px] max-[600px]:h-[30px] flex-shrink-0 mb-6 rounded-full ${borderColor} max-[600px]:border-[4px] border-[8px] bg-transparent`}>
                <span
                    style={{
                        fontWeight: 900,
                        fontFamily: '"Inter", sans-serif',
                        color: "#1e335f"
                    }}
                    className="text-[#1e335f] leading-none max-[600px]:text-[18px] text-[24px]"
                >
                    {index + 1}
                </span>
            </div>

            <div className="text-start mb-[30px]">
                <h2 className="text-[#1e335f] text-2xl font-bold mb-2 max-[600px]:text-[1.4rem]">{data.title}</h2>
                <p className="text-[#282e3d] text-[1.2rem] mb-6 max-[600px]:text-[1rem]">{data.desc}</p>
            </div>

            {/* SECCION DE ESPECIALIDAD */}
            {data.title === "Especialidad" && <SectionSpecialty data={data} />}

            {data.title === "Profesional" && <SectionProfessional data={data} />}

            {data.title === "Fecha y Hora" && <SectionDate data={data} />}
        </div>
    );
};

export default AppointmentCards;