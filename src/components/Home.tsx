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
                className='w-full h-[80vh] bg-cover opacity-[0.9] bg-no-repeat flex flex-col items-start justify-center'
            >
                <div className='flex flex-col ml-[50px] gap-[35px] bg-[#fff] mt-[100px] items-start p-[44px] justify-center rounded-[16px] opacity-[0.9] w-[400px] h-[400px] shadow-xl'>
                    <h2 className='m-[0px] text-[2rem] text-[#0047ba] w-full font-semibold'>¿Necesitás asistencia médica?</h2>
                    <h2 className='m-[0px] text-[2rem] text-[#12caff]'>Solicitala de forma online.</h2>
                    <p className='text-[1.5rem] text-[#346cc8] w-full'>Podés hacerlo de forma ágil y segura: contanos para quién es la solicitud, informá los síntomas y confirmá los datos.</p>

                    <Link to={'/appointments'} className='w-full'>
                        <div className='border hover:bg-[#0047ba] hover:text-[#fff] duration-500 border-solid border-[#12caff] text-[24px] flex items-center justify-center px-[60px] py-[20px] text-[#346cc8] rounded-[6px] cursor-pointer'>
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