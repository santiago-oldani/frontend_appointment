import { Link } from 'react-router';
import img1 from '../assets/imgs/imagen1.webp';
import About from './About';
import Coverage from './Coverage';
import swiss from '../assets/imgs/avalian_logo-color.png'
import HeadQuarters from './HeadQuarters/HeadQuarters';

const Welcome: React.FC = () => {
    return (
        <main className='relative w-full'>
            <div className="flex relative items-center justify-center py-[7px] w-full h-[20px] bg-[#f1f0f0]">
            </div>

            <div id='banner' className='flex flex-col w-full h-[100vh] items-start justify-start'>
                <div className='flex flex-col gap-[35px] bg-[#fff] mt-[30px] items-start p-[44px] justify-center rounded-[16px] opacity-[0.9] w-[450px] h-[450px]'>
                    <h2 className='m-[0px] text-[36px] text-[#0047ba] w-full font-semibold'>¿Necesitás asistencia médica?</h2>
                    <h2 className='m-[0px] text-[36px] text-[#12caff]'>Solicitala de forma online.</h2>
                    <p className='text-[24px] text-[#346cc8] w-[400px]'>Podés hacerlo de forma ágil y segura: contanos para quién es la solicitud, informá los síntomas y confirmá los datos.</p>
                    <Link to={'/appointments'} >
                        <div className='border hover:bg-[#0047ba] hover:text-[#fff] duration-[1s] border-solid border-1 border-[#12caff] text-[24px] flex items-center justify-center px-[60px] py-[20px] text-[#346cc8] rounded-[6px]'>Solicitar Turno</div>
                    </Link>
                </div>
                <div className='flex flex-row gap-[20px] justify-center items-center w-full mt-[80px] h-[30vh] bg-[#fff]'>


                </div>
            </div>


            <About />
            <Coverage/>
            <HeadQuarters/>
        </main>
    )
}

export default Welcome;