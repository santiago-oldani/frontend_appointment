import { useState } from "react";

interface SelectDiv {
    title: string;
    desc: string;
    entity: string;
}

interface Specialty {
    id: number;
    name: string;
}

const arrayDivs: SelectDiv[] = [
    { title: "Selecciona la especialidad", desc: "Haz click aqui para elegir una especialidad", entity: "Especialidad" },
    { title: "Selecciona el profesional", desc: "Haz click aqui para elegir un profesional", entity: "Profesional" },
    { title: "Selecciona la fecha y hora", desc: "Haz click aqui para elegir una fecha y hora", entity: "Fecha y hora" }
]

const Appointment: React.FC = () => {
    const [actualDiv, setActualDiv] = useState(0);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [dataFromBack, setDataFromBack] = useState<Specialty[]>([]);;

    function showOptions(index: number): [] {
        if (index === actualDiv) {
            setOptionsVisible(true);

            switch (index) {
                case 0:
                    fetch("http://localhost:8081/api/specialties")
                        .then((res) => res.json())
                        .then((data) => setDataFromBack(data))
                        .catch((error) => console.error("Error al obtener la data: ", error))
                    break;

                default:
                    break;
            }

        }
        return [];
    }



    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-row items-center justify-center bg-[#0047ba] w-full h-[50px]">
                <p className="font-bold text-[24px] text-[#fff]">Gestiona tus turnos</p>
            </div>
            <div className="flex flex-col items-center justify-center w-full bg-[#fff]">
                <div className="flex flex-row items-start justify-around w-full h-[800px] mt-[50px]">
                    <div className="flex flex-col items-center justify-center border border-1 border-solid border-[#346cc8] ml-[50px] w-[200px] h-[600px]">

                    </div>

                    {optionsVisible ? <div className="flex flex-col items-center justify-center border-1 border-solid border-[#12caff] rounded-[12px] p-[20px]">
                        <h2>Especialidades</h2>
                        {dataFromBack.map((specialty) => {
                            return (
                                <div className="flex flex-col items-center justify-center hover:bg-[#12caff] hover:text-[#fff] hover:opacity-[0.3] cursor-pointer w-full py-[9px]">
                                    <span className="text-[20px] font-semibold">{specialty.name}</span>
                                </div>

                            )
                        })}
                    </div> : <div className="flex flex-row items-center justify-center w-full h-auto gap-[40px]">
                        {arrayDivs.map((div, index) => {
                            return (
                                <div className="flex flex-col items-center justify-center gap-[40px]">
                                    <div className={`flex items-center justify-center p-[10px] ${actualDiv === index ? "bg-[#346cc8]" : "bg-[#585a5b]"}  w-[40px] h-[40px] rounded-[100%]`}>
                                        <span className={`text-[40px] text-[#fff] m-[0px]`}>{index + 1}</span>
                                    </div>
                                    <div onClick={() => showOptions(index)} className={`flex flex-col items-center ${actualDiv === index ? "w-[450px] h-[250px] border-[#12caff] cursor-pointer border-2 shadow-xl" : "w-[400px] h-[200px] border-1 cursor-not-allowed border-[#2d2f31] opacity-[0.7]"} justify-start border  border-solid rounded-[18px] p-[20px]`}>
                                        <h2 className={`text-[30px] ${actualDiv === index ? "text-[#12caff] bg-[#fff]" : "text-[#585a5b] "}  `}>{div.title}</h2>
                                        <p className={`text-[36px] ${actualDiv === index ? "text-[#346cc8] bg-[#fff]" : "text-[#585a5b] "}`}>{div.desc}</p>
                                    </div>
                                </div>

                            )
                        })}
                    </div>}


                </div>
            </div>
        </div>
    )
}

export default Appointment;