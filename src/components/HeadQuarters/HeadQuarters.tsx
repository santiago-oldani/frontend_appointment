import ContainerHeadQuarters from "./ContainerHeadQuarters";
import belgrano from "../../assets/imgs/belgrano.png";
import recoleta from "../../assets/imgs/recoleta.png";
import palermo from "../../assets/imgs/palermo.png";
import almagro from "../../assets/imgs/almagro.png";

interface Sedes {
    location: string;
    address: string;
    img_url: string;
    map_url: string;
    description: string;
    colectivo: string;
    subte: string;
}

const sedesArray: Sedes[] = [
    {
        location: "Belgrano",
        address: "Av. Cabildo 2140, CABA",
        img_url: belgrano,
        map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.870318536647!2d-58.45524312339578!3d-34.557432372996116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5989b5c329d%3A0xc6659c049d560738!2sAv.%20Cabildo%202140%2C%20C1428%20DQE%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700438400000!5m2!1ses-419!2sar",
        description: "Centro de Consultas Externas y Telemedicina de alta complejidad, ubicado en un moderno edificio corporativo. Cuenta con boxes privados para video consultas asistidas, salas dedicadas a la toma de muestras de laboratorio y gabinetes para procedimientos de baja complejidad. HealthPoint Belgrano es nuestro hub de innovación en atención virtual y seguimiento crónico.",
        colectivo: "41, 59, 60, 67, 68, 152, 161, 168, 194",
        subte: "D"
    },
    {
        location: "Recoleta",
        address: "Pacheco de Melo 2780, CABA",
        img_url: recoleta,
        map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.6293998184517!2d-58.4061596!3d-34.5888252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca96210f9247%3A0x6b4c10a4e7f8e874!2sPacheco%20de%20Melo%202780%2C%20C1425%20BIA%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700438400000!5m2!1ses-419!2sar",
        description: "Unidad de Diagnóstico Preventivo y Terapéutico focalizada en la salud integral. Situada dentro de un predio histórico restaurado, la sede ofrece un sector exclusivo para chequeos ejecutivos, salas de kinesiología y wellness, y consultorios equipados con tecnología de diagnóstico por imagen de última generación. La recuperación se realiza en espacios con diseño biofílico.",
        colectivo: "10,17,37,59,60,67,92,102,108",
        subte: "H"
    },
    {
        location: "Palermo",
        address: "Av. Santa Fe 4755, CABA",
        img_url: palermo,
        map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.5101664531865!2d-58.4286129!3d-34.591866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca784381e4b3%3A0x33b1e32f5f14e7a0!2sAv.%20Santa%20Fe%204755%2C%20C1425%20BIA%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700438400000!5m2!1ses-419!2sar",
        description: "Especializado en la atención ambulatoria rápida y el manejo del dolor. Este centro cuenta con unidades modulares para la rápida evaluación de urgencias menores, consultorios de trauma y ortopedia, y un área de farmacia y retiro de medicación. El enfoque es en la eficiencia del flujo de pacientes y en la comodidad gracias a sus amplios espacios de espera y estacionamiento.",
        colectivo: "12,15,29,39,41,57,64,68,111,152",
        subte: "D"
    },
    {
        location: "Almagro",
        address: "Av. Corrientes 4160, CABA",
        img_url: almagro,
        map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.145028591873!2d-58.4150531!3d-34.6015694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca69581c818b%3A0xb33887c9f80a6b7d!2sAv.%20Corrientes%204160%2C%20C1194%20AAH%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700438400000!5m2!1ses-419!2sar",
        description: "Centro de Salud Mental y Rehabilitación Cognitiva. Ubicado estratégicamente cerca de las principales líneas de transporte, esta sede se dedica a la neurociencia aplicada a la salud mental. Ofrece espacios terapéuticos individuales y grupales, laboratorios para evaluación neurocognitiva y áreas de rehabilitación física y ocupacional, operando en convenio con instituciones académicas líderes.",
        colectivo: "24,26,71,92,99,124,127,146,168",
        subte: "B"
    },
]

const HeadQuarters: React.FC = () => {
    return (
        <section id="sedes" className="bg-[#f9fafb] h-auto w-full flex flex-row  flex-wrap items-center justify-center">
            <div className="flex relative items-center justify-center py-[10px] w-full h-[40px] bg-[#0047ba]">
                <h1 className="text-[#fff] text-[1.8rem] max-[550px]:text-[1.5rem]">Sedes</h1>
            </div>
            <div className="w-full h-full flex flex-row flex-wrap items-center gap-[20px] justify-center py-[80px]">
                {sedesArray.map((sede) => {
                    return (
                        <ContainerHeadQuarters sede={sede} />
                    )
                })}
            </div>
        </section>
    )
}

export default HeadQuarters;