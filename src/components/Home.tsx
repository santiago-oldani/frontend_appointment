import { Link } from 'react-router';
import img1 from '../assets/imgs/imagen1.jpg';

const Welcome: React.FC = () => {
    return (
        <div className='relative w-full'>
            <img src={img1} alt="" className='w-full h-auto' />

            <div className='flex flex-col bg-[#fff] items-start p-[44px] justify-center rounded-[16px] absolute top-[120px] left-[100px] opacity-[0.9] w-[450px] h-[450px]'>
                <h2 className='m-[0px] text-[36px] text-[#0047ba] w-full font-semibold'>¿Necesitás asistencia médica?</h2>
                <h2 className='m-[0px] text-[36px] text-[#12caff]'>Solicitala de forma online.</h2>
                <p className='text-[24px] text-[#346cc8] w-[400px]'>Podés hacerlo de forma ágil y segura: contanos para quién es la solicitud, informá los síntomas y confirmá los datos.</p>
                <Link to={'/appointments'} >
                    <div className='border border-solid border-1 border-[#12caff] text-[24px] flex items-center justify-center px-[60px] py-[20px] text-[#346cc8] rounded-[6px]'>Solicitar Turno</div>
                </Link>
            </div>

        </div>
    )
}

export default Welcome;