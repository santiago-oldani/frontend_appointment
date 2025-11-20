import letrero from "../assets/imgs/letrero.webp";
import healthpoint_hombre from "../assets/imgs/hombre_healthpoint.webp";

const About: React.FC = () => {
    return (
        <section className="bg-[#f1f0f0] h-auto w-full  flex flex-col items-center justify-center">
            <div className="flex relative items-center justify-center py-[10px] w-full h-[40px] bg-[#0047ba]">
                <h1 className="text-[#fff] absolute left-[16%] text-[1.8rem]">Quienes somos</h1>
            </div>
            <div className="flex items-center justify-center bg-[#fff] h-[400px] py-[40px] w-full">
                <div className="flex flex-row items-start justify-start w-[70%] gap-[40px]">
                    <div className="flex flex-col items-center justify-center gap-[30px]">
                        <div className="border-l-3 border-l-solid border-l-[#000] py-[10px] px-[20px]">
                            <h2 className="text-[#57c9e8] mt-[0px] mb-[0px] font-[500]">Somos la plataforma digital líder en gestión de turnos y teleconsultas, dedicada a simplificar el acceso a la salud para pacientes y profesionales en diversas especialidades.</h2>
                        </div>
                        <p>Estamos comprometidos con los más altos estándares de seguridad digital y usabilidad, orientados a la satisfacción del paciente a través de un diseño centrado en el usuario (UX). Nuestra forma de trabajo se basa en los valores de confianza, innovación, integridad y privacidad de datos.</p>
                        <p>Brindamos un servicio de conexión médica de vanguardia, adecuado a las necesidades dinámicas de nuestros usuarios, con la más alta calidad de prestación digital, en un marco de permanente actualización tecnológica y científica.</p>
                        <p>Desarrollamos una clara vocación de e-Health (Salud Digital) y una decidida intención de fortalecer la investigación sobre la optimización del flujo de pacientes, siempre dentro de las normas de bioética digital.</p>
                    </div>
                    <img src={healthpoint_hombre} alt="" className="w-[350px] h-[350px] rounded-[38px] opacity-[0.8]" />
                </div>
            </div>

            <div className="flex flex-col items-center justify-center w-[70%] gap-[30px] p-[75px]">
                <div className="flex flex-col items-start justify-center border-l-3 border-l-solid border-l-[#000] py-[10px] px-[20px]">
                    <h2 className="text-[#0047ba] mt-[0px] font-[600]">Nuestra historia</h2>
                    <h3 className="text-[#0094ce] mt-[0px] mb-[0px] font-[500]">Con los años, HealthPoint no solo se consolidó como una plataforma de gestión de turnos, sino como el ecosistema digital líder para conectar a profesionales de la salud con pacientes en todo el país.</h3>
                </div>
                <div className="flex flex-row items-start justify-between gap-[50px]">
                    <img src={letrero} alt="" className="w-[370px] h-[450px] rounded-[24px]" />
                    <div className="flex flex-col items-start justify-start gap-[30px] w-[100%]">
                        <p className=""><strong>Nuestra trayectoria comenzó en Argentina en el 2019</strong>, cuando un equipo multidisciplinario de ingenieros de software y médicos clínicos se unió con la misión de eliminar las barreras de la atención tradicional. Apostaron por inaugurar una plataforma de servicios de salud 100% digital y ambulatoria, centrada en la experiencia del usuario (UX) y la rapidez en la asignación de turnos. De esta visión nació HealthPoint.</p>

                        <p>Desde sus inicios, HealthPoint revolucionó el mercado al introducir el <strong>primer sistema de Teleconsulta Inteligente</strong>, obteniendo rápidamente el reconocimiento de los principales financiadores y del público. Hoy, mantenemos ese liderazgo gracias a la excelencia de nuestro core tecnológico, el rigor de nuestro staff de asesores de salud digital y la interfaz intuitiva que ofrecemos.</p>

                        <p>HealthPoint ha desarrollado <strong>su propio Laboratorio de Innovación Tecnológica (LIT)</strong>, compuesto por ingenieros de datos y especialistas en machine learning, quienes promueven y gestionan la mejora continua de la plataforma y la precisión en la búsqueda de especialistas.</p>

                        <p>Además, contamos con un <strong>Consejo de Privacidad y Ética Digital (CPED)</strong>, acreditado por organismos internacionales. Este grupo multidisciplinario tiene el propósito de asegurar la máxima confidencialidad de los datos de salud de nuestros usuarios, garantizando su autonomía y control en cada interacción.</p>

                        <p><strong>En el 2022 lanzamos nuestra iniciativa de Inclusión Digital en Salud (IDS)</strong>, cuyo objetivo es reducir la brecha de acceso a la tecnología en zonas rurales, ofreciendo capacitaciones gratuitas a centros de atención primaria.</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default About;