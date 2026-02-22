import healthpoint_hombre from "../assets/imgs/hombre_healthpoint.webp";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegHandshake } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BiPlusMedical } from "react-icons/bi";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react"


const About: React.FC = () => {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <section id="quienes_somos" className="bg-[#fff] h-auto w-full  flex flex-col items-center justify-center">
            <div className="flex relative items-center justify-center py-[10px] w-full h-[40px] bg-[#0047ba]">
                <h1 className="text-[#fff] text-[1.8rem] max-[550px]:text-[1.5rem]">Quienes Somos</h1>
            </div>

            <div className="flex items-center flex-col justify-start bg-[#f9fafb] gap-[50px] h-fit py-[70px] w-full">
                <div className="flex flex-row max-[1050px]:flex-col max-[1050px]:w-[100%] items-center justify-center w-[70%] ">
                    <div className="flex flex-col items-center justify-center w-[50%] max-[1050px]:w-[100%] gap-[30px] ">
                        <div className="flex flex-col items-start justify-start p-[30px] gap-[20px] w-[70%] bg-[#fff] shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[18px]">
                            <h2 className="text-[#000] text-center mt-[0px] py-[10px] px-[10px] w-[90%] mb-[0px] text-[1.2rem] max-[425px]:text-[1rem] font-[400] bg-[#2d96db] border-[#188bd7] border-1 border-solid rounded-[12px]">
                                Somos la plataforma digital líder en gestión de turnos y teleconsultas.
                            </h2>
                            <div className="flex items-start justify-start gap-[30px] w-fit mt-[10px]">
                                <IoShieldCheckmarkOutline
                                    className="flex-shrink-0 mt-[5px] max-[425px]:w-[2em] max-[425px]:h-[2em]"
                                    color="#2482bc"
                                    size={'2.5em'}
                                />
                                <p className="text-[#666] leading-relaxed w-[70%]">
                                    Estamos comprometidos con los más altos estándares de seguridad digital y usabilidad,
                                    orientados a la satisfacción del paciente a través de un diseño centrado en el usuario (UX).
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col align-start justify-start p-[30px] gap-[20px] w-[70%] bg-[#fff] shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[18px]">
                            <div className="flex items-start justify-start gap-[30px] w-fit mt-[10px]">
                                <FaRegHandshake
                                    className="flex-shrink-0 mt-[5px] max-[425px]:w-[2em] max-[425px]:h-[2em]"
                                    color="#2482bc"
                                    size={'2.5em'}
                                />
                                <p className="text-[#666] leading-relaxed w-[80%]">
                                    Brindamos un servicio de conexión médica de vanguardia, adecuado a las necesidades dinámicas de nuestros usuarios, con la más alta calidad de prestación digital.
                                </p>
                            </div>
                            <div className="flex items-start justify-start gap-[30px] w-fit mt-[10px]">
                                <HiOutlineLightBulb
                                    className="flex-shrink-0 mt-[5px] max-[425px]:w-[2em] max-[425px]:h-[2em]"
                                    color="#2482bc"
                                    size={'2.5em'}
                                />
                                <p className="text-[#666] leading-relaxed w-[80%]">
                                    Desarrollamos una clara vocación de e-Health (Salud Digital) y una decidida intención de fortalecer la investigación sobre la optimización del flujo de pacientes.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="bg-[#fff] w-[35%] max-[600px]:w-[220px] max-[1050px]:mt-[40px] flex justify-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-[20px] rounded-[18px]">
                        <img src={healthpoint_hombre} alt="" className="w-full self-center h-auto rounded-[32px] opacity-[0.8]" />
                    </div>

                </div>
                <div className="flex flex-col items-center relative justify-center bg-[#2d96db] w-[65%] max-[700px]:w-[90%] h-fit shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[18px] ">
                    <div className="w-[100%] py-[20px] flex items-center justify-center">
                        <h2 className="text-[#02162c] ml-[20px] mt-[0px] mb-[0px] w-[100%] font-[600]">Nuestra historia</h2>
                    </div>

                    <div className="bg-[#fff] w-full h-auto pb-[50px] pt-[30px] rounded-b-[18px]">
                        <div className="flex items-start justify-center gap-[30px] max-[700px]:px-[25px] mt-[10px] px-[50px]">
                            <div className="bg-[#e6ebef] rounded-full w-[30px] h-[30px] max-[700px]:w-[25px] max-[700px]:h-[25px] flex items-center justify-center p-[15px]">
                                <div className="bg-[#118460] flex items-center justify-center w-[30px] h-[30px] max-[700px]:w-[25px] max-[700px]:h-[25px] rounded-full p-[4px]">
                                    <BiPlusMedical color="#fff" size={'2em'} className="flex-shrink-0 max-[700px]:w-[1.5em] max-[700px]:h-[1.5em]" />
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-start">
                                <h3 className="text-[#0094ce] mt-[0px] mb-[30px] max-[550px]:text-[1rem] font-[500]">Con los años, HealthPoint no solo se consolidó como una plataforma de gestión de turnos, sino como el ecosistema digital líder para conectar a profesionales de la salud con pacientes en todo el país.</h3>
                                <AnimatePresence>
                                    {expanded ? <motion.div
                                        key="extra-content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="flex flex-col items-start justify-start overflow-hidden gap-[30px] w-[100%] ">
                                        <p className=""><strong>Nuestra trayectoria comenzó en Argentina en el 2019</strong>, cuando un equipo multidisciplinario de ingenieros de software y médicos clínicos se unió con la misión de eliminar las barreras de la atención tradicional. Apostaron por inaugurar una plataforma de servicios de salud 100% digital y ambulatoria, centrada en la experiencia del usuario (UX) y la rapidez en la asignación de turnos. De esta visión nació HealthPoint.</p>
                                        <p>Desde sus inicios, HealthPoint revolucionó el mercado al introducir el <strong>primer sistema de Teleconsulta Inteligente</strong>, obteniendo rápidamente el reconocimiento de los principales financiadores y del público. Hoy, mantenemos ese liderazgo gracias a la excelencia de nuestro core tecnológico, el rigor de nuestro staff de asesores de salud digital y la interfaz intuitiva que ofrecemos.</p>
                                        <p>HealthPoint ha desarrollado <strong>su propio Laboratorio de Innovación Tecnológica (LIT)</strong>, compuesto por ingenieros de datos y especialistas en machine learning, quienes promueven y gestionan la mejora continua de la plataforma y la precisión en la búsqueda de especialistas.</p>
                                        <p>Además, contamos con un <strong>Consejo de Privacidad y Ética Digital (CPED)</strong>, acreditado por organismos internacionales. Este grupo multidisciplinario tiene el propósito de asegurar la máxima confidencialidad de los datos de salud de nuestros usuarios, garantizando su autonomía y control en cada interacción.</p>
                                        <p><strong>En el 2022 lanzamos nuestra iniciativa de Inclusión Digital en Salud (IDS)</strong>, cuyo objetivo es reducir la brecha de acceso a la tecnología en zonas rurales, ofreciendo capacitaciones gratuitas a centros de atención primaria.</p>
                                    </motion.div> : <p className=""><strong>Nuestra trayectoria comenzó en Argentina en el 2019</strong>, cuando un equipo multidisciplinario de ingenieros de software y médicos clínicos se unió con la misión de eliminar las barreras de la atención tradicional. Apostaron por inaugurar una plataforma de servicios de salud 100% digital y ambulatoria, centrada en la experiencia del usuario (UX) y la rapidez en la asignación de turnos. De esta visión nació HealthPoint.</p>}
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-4 text-[#fff] text-[1rem] cursor-pointer border-1 rounded-[8px] py-[10px] px-[25px] bottom-[-20px] border-[#20c7f8] bg-[#0047ba] absolute font-semibold hover:opacity-[0.9] transition-colors duration-300 flex items-center gap-[10px]"
                    >
                        {expanded ? (
                            <>
                                Leer menos <FaArrowUp />
                            </>
                        ) : (
                            <>
                                Leer más <FaArrowDown />
                            </>
                        )}
                    </button>
                </div>

            </div>

        </section>
    )
}

export default About;