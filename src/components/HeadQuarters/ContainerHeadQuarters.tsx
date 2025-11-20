
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
    console.log(sede);
    return (
        <>
            <div className="flex items-start w-full gap-[30px] justify-center">
                <div className="flex flex-col w-[21%] py-[20px] px-[20px] h-fit items-start justify-start bg-[#f1f0f0]">
                    <h1 className="self-left text-[#0047ba] mt-[0px]">Sede {sede.location}</h1>
                    <img src={sede.img_url} alt="" className="w-[400px] h-auto rounded-bl-[40px]" />
                    <h2 className="text-[#0047ba] border-l-3 pl-[10px] border-l-[#57c9e8]">{sede.address}</h2>
                    <h3 className="text-[#57c9e8]">De lunes a viernes de 8 a 20 horas y sabados de 8 a 13 horas.</h3>
                    <p className="text-[#0047ba] w-[400px]">{sede.description}</p>
                </div>
                <div className="flex flex-col w-[40%] items-start justify-start">
                    <iframe
                        src={sede.map_url}
                        width="800"
                        height="480"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full"
                    >
                    </iframe>
                    <h3 className="text-[#7d868c]">¿Cómo llegar?</h3>
                    <h4 className="text-[#7d868c]">En colectivo: </h4>
                    <p className="text-[#7d868c]">{sede.colectivo}</p>
                    <h4 className="text-[#7d868c]">En subte:</h4>
                    <p className="text-[#7d868c]">{sede.subte}</p>
                </div>
            </div>
        </>
    )
}

export default ContainerHeadQuarters;