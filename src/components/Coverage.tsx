import { useState } from "react";
import CoverageItem from "./CoverageItem";
import { FaRegCheckCircle } from "react-icons/fa";

interface Coverages {
    title: string;
    plans: string[];
}

const coveragesList: Coverages[] = [
    {
        title: "AMCI | Asociación Mutual de Control Integral",
        plans: ["MI 600", "MI 700", "MI 900"]
    },
    {
        title: "ANDAR | Obra Social de Viajantes Vendedores de la República Argentina",
        plans: ["Plus"]
    },
    {
        title: "APRES S.A.",
        plans: ["Global Classic", "Global Plus", "Global Premium"]
    },
    {
        title: "APSOT | Asoc. Personal Sup. Org Techint",
        plans: ["Plan Unico"]
    },
    {
        title: "SADAIC | Sociedad Argentina de Autores y Compositores de Música",
        plans: ["Plan Unico"]
    },
    {
        title: "Centro Médico Pueyrredón",
        plans: ["Alfa -OM6", "Sr. Alfa", "Beta – OM4", "Sr. Beta", "Delta"]
    },
    {
        title: "Caja Notarial Complementaria de Seguridad Social | Colegio de Escribanos de la Ciudad de Buenos Aires",
        plans: ["Plan A Plus", "Plan B"]
    },
    {
        title: "AVALIAN",
        plans: ["Plan Cerca AS-100", "Plan Clásico", "Plan Integral AS-200", "Plan Integral AS-204", "Plan Superior AS-300", "Plan Selecta AS-400", "Plan Selecta AS-500"]
    },
    {
        title: "COMEI | Mutual de Odontólogos",
        plans: ["Todos los planes"]
    },
    {
        title: "Plan de Salud Hospital Austral",
        plans: ["Todos los planes"]
    },
    {
        title: "FTT | Fundación Techint",
        plans: ["Planes: APSOT"]
    },
    {
        title: "Grupo Roisa",
        plans: ["Doctored 1000", "Doctored 2000", "Doctored 3000"]
    },
    {
        title: "MEDIN",
        plans: ["Optimo", "Platino"]
    },
    {
        title: "OPDEA | Obra Social del Personal de Dirección",
        plans: ["Plan 10", "Plan 12", "Plan 15", "Plan 21", "Plan 01", "Plan 03", "Plan 04", "Plan 05", "Plan OP"]
    },
    {
        title: "Prevención Salud ART",
        plans: ["A2", "A3", "A4", "A5", "A6"]
    },
    {
        title: "Programa de salud",
        plans: ["Blanca", "Dorada", "Plateada"]
    },
    {
        title: "OSDEPYM | Obra Social de Empresarios, profesionales y monotributistas",
        plans: ["2000", "3000", "4000", "Personal", "Pyme", "Pymes 2500", "Staff"]
    },
    {
        title: "OSMITA | Obra Social Mutualidad Industrial Textil Argentina",
        plans: ["FG24", "MG5", "MG6", "MG7", "MG8", "MSIM"]
    },
    {
        title: "Galeno",
        plans: ["Oro", "Plata"]
    },
    {
        title: "OSMATA | Obra Social del Sindicato de Mecánicos y Afines del Transporte Automotor",
        plans: ["PMI: Sin coseguro.", "PMO: Con coseguro."]
    },
    {
        title: "OSDIPP | Obra Social para el Personal de Dirección de la Industria Privada del Petróleo",
        plans: ["Plan único"]
    },
    {
        title: "OSPATCA | Obra Social del Personal Administrativo y Técnico de la Construcción y Afines",
        plans: ["Credencial Azul", "Credencial Gris"]
    },
    {
        title: "OSPE | Obra Social de Petroleros",
        plans: ["OSPe-704 E", "OSPe A 600", "OSPe A606", "OSPe A 608", "OSPe A 700", "OSPe A 704", "OSPe-D 500", "OSPe D 750", "OSPe D 756", "OSPe 704 SC", "Credencial Gris"]
    },
    {
        title: "MedOSPJN | Obra Social del Poder Judicial de la Naciónicus",
        plans: ["Plan único"]
    },
    {
        title: "OSTECF",
        plans: ["Plan único"]
    },
    {
        title: "Medicus",
        plans: ["Azul", "Azul corporativo", "Celeste", "Celeste corporativo"]
    },
    {
        title: "OSSEG",
        plans: ["Integral", "Plan Adherente 2021", "Plan OSSEG 450"]
    },
    {
        title: "Medifé",
        plans: ["30", "33", "35", "35T", "Azul", "Blanco", "Bronce", "Bronce classic", "Cobre", "FIN-AMN", "FIN-E", "FIN-MF 101", "Juntos", "M40", "Medifé +", "Niquel"]
    },
    {
        title: "OMINT",
        plans: ["O", "8500/F", "6500", "Programa XXI", "4021", "Skill Plus", "4500", "Cartilla 1", "Cartilla 2", "Cartilla 3", "Cartilla 4", "2500", "2700", "1500", "Plan MI DOC"]
    },
    {
        title: "OSDE",
        plans: ["025", "110", "210", "310", "410", "459", "510", "6030", "8360", "8260", "8430"]
    },
    {
        title: "OSPOCE",
        plans: ["MI 600", "MI 700", "MI 800", "MI 900", "MI 950", "MI 1000", "MI 2000", "MI 2000 PLUS"]
    },
    {
        title: "Sancor Salud",
        plans: ["1000", "1000B", "1000R", "1500", "1500B", "1500R", "2000", "3000", "3000B", "3000R", "3500", "4000", "4065", "4500"]
    },
    {
        title: "Swiss Medical Group",
        plans: ["Todos los planes"]
    },
]

coveragesList.sort((a, b) => a.title.localeCompare(b.title));

// Antes de tu componente React:
const mitad = Math.ceil(coveragesList.length / 2);
const columnaIzquierda = coveragesList.slice(0, mitad);
const columnaDerecha = coveragesList.slice(mitad);

const Coverage: React.FC = () => {
    const [dropDowns, setDropDowns] = useState<number[]>([]);

    return (
        <section id="coberturas" className="bg-[#f1f0f0] h-auto w-full flex flex-col items-center justify-center">
            <div className="flex relative items-center justify-center py-[10px] w-full h-[40px] bg-[#0047ba]">
                <h1 className="text-[#fff] text-[1.8rem] max-[550px]:text-[1.5rem]">Coberturas</h1>
            </div>
            <div className="flex items-center justify-center bg-[#fff] h-fit py-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[32px] mt-[40px] w-[60%] max-[650px]:w-[90%] ">
                <div className="flex flex-col items-center justify-center gap-[20px] w-[90%] px-[20px]">
                    <div className="border-l-3 border-l-solid border-l-[#000] py-[10px] px-[20px]">
                        <h2 className="text-[#0047ba] mt-[0px] font-[600] max-[550px]:text-[1.2rem]">Nuestras Coberturas</h2>
                        <h3 className="text-[#0094ce] mt-[0px] mb-[0px] font-[500] max-[550px]:text-[1.1rem]">Como plataforma líder en gestión de turnos y teleconsultas, nuestro compromiso es establecer alianzas estratégicas con una amplia red de Obras Sociales y Prepagas de alcance nacional. Con nosotros usted podrá: </h3>
                    </div>
                    
                    <ul className="m-[0px] w-full flex flex-col items-start justify-start">
                        <div className="flex items-center gap-[10px] justify-center mb-[20px]">
                            <FaRegCheckCircle className="flex-shrink-0 max-[550px]:w-[20px] max-[550px]:h-[20px]" size={30} color="#346cc8"/>
                            <li className="list-none text-[#02162c] text-[1.2rem] max-[550px]:text-[1rem]">Consultar la cobertura de sus planes específicos para cada especialidad y servicio disponible.</li>
                        </div>
                        <div className="flex items-center gap-[10px] justify-center mb-[20px]">
                            <FaRegCheckCircle className="flex-shrink-0 max-[550px]:w-[20px] max-[550px]:h-[20px]" size={30} color="#346cc8"/>
                            <li className="list-none text-[#02162c] text-[1.2rem] max-[550px]:text-[1rem]">Visualizar la cartilla de prestadores que aceptan su plan en tiempo real.</li>
                        </div>
                        <div className="flex items-center gap-[10px] justify-center mb-[20px]">
                            <FaRegCheckCircle className="flex-shrink-0 max-[550px]:w-[20px] max-[550px]:h-[20px]" size={30} color="#346cc8"/>
                            <li className="list-none text-[#02162c] text-[1.2rem] max-[550px]:text-[1rem]">Obtener turnos para consultas presenciales y teleconsultas con la validación de su credencial al instante.</li>
                        </div>
                    </ul>
                    <p className=" text-[#475569] font-medium text-[1.2rem] w-[85%] max-[550px]:text-[1rem]">Mantenemos nuestros convenios y listados de profesionales en permanente actualización para garantizar que la información sobre su cobertura sea siempre precisa.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 max-[600px]:grid-cols-1 gap-x-[60px] w-[60%] h-fit p-[75px] max-[400px]:p-[30px]">
                <div className="flex flex-col gap-4">
                    {columnaIzquierda.map((cov, index) => {
                        return (
                            <CoverageItem cov={cov} itemId={index} dropDowns={dropDowns} setDropDowns={setDropDowns} />
                        )
                    })}
                </div>

                <div className="flex flex-col gap-4">
                    {columnaDerecha.map((cov, index) => {
                        return (
                            <CoverageItem cov={cov} itemId={index + 100} dropDowns={dropDowns} setDropDowns={setDropDowns} />
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default Coverage