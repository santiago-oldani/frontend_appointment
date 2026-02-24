import { Link } from 'react-router';
import About from './About';
import Coverage from './Coverage';
import HeadQuarters from './HeadQuarters/HeadQuarters';
import imagenBanner from '../assets/imgs/imagen5.jpg';

const Welcome: React.FC = () => {
    return (
        <main className='relative w-full'>
            

            <div
                id='banner'
                style={{ backgroundImage: `url(${imagenBanner})` }}
                className='w-full h-[80vh] max-[1300px]:h-[60vh] max-[900px]:h-[47vh] bg-cover opacity-[0.9] bg-no-repeat flex flex-col items-start justify-center'
            >
                <div className='flex flex-col max-[600px]:w-[200px] max-[600px]:mt-[120px] max-[600px]:p-[20px] max-[600px]:ml-[20px] max-[600px]:h-[175px] max-[600px]:gap-[8px] ml-[50px] gap-[35px] bg-[#fff] mt-[100px] items-start p-[44px] justify-center rounded-[16px] opacity-[0.9] w-[400px] max-[1300px]:w-[300px] max-[1300px]:h-[300px] h-[400px] shadow-xl max-[900px]:px-[30px] max-[900px]:py-[30px] max-[900px]:mt-[10px] max-[900px]:gap-[15px] max-[900px]:h-fit'>
                    <h2 className='m-[0px] text-[2rem] text-[#0047ba] w-full font-semibold max-[1300px]:text-[1.5rem] max-[600px]:text-[1.1rem]'>¿Necesitás asistencia médica?</h2>
                    <h2 className='m-[0px] text-[2rem] text-[#12caff] max-[1300px]:text-[1.5rem] max-[600px]:text-[1.1rem]'>Solicitala de forma online.</h2>
                    <p className='text-[1.5rem] text-[#346cc8] w-full max-[1300px]:text-[1rem] max-[600px]:text-[0.8rem]'>Podés hacerlo de forma ágil y segura: contanos para quién es la solicitud, informá los síntomas y confirmá los datos.</p>

                    <Link to={'/login-appointments'} className='w-full'>
                        <div className='border hover:bg-[#0047ba] hover:text-[#fff] duration-500 border-solid border-[#12caff] text-[24px] flex items-center justify-center px-[60px] py-[20px] text-[#346cc8] rounded-[6px] cursor-pointer max-[1300px]:text-[1.5rem] max-[1300px]:px-[40px] max-[1300px]:py-[10px] max-[600px]:py-[5px] max-[600px]:px-[20px] max-[600px]:text-[1.3rem]'>
                            Solicitar Turno
                        </div>
                    </Link>
                </div>
            </div>


            <About />
            <Coverage />
            <HeadQuarters />
        </main>
    )
}

export default Welcome;