import { Link, useNavigate } from "react-router";
import { FaPlusCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useAppointmentContext } from "../context/AppointmentContext";

const NavBarAppointments: React.FC = () => {
    const { states, actions } = useAppointmentContext();
    const { } = states;
    const { setPatient } = actions;

    const navigate = useNavigate();

    const removePatientFromStorage = () => {
        localStorage.removeItem('current_patient');
        setPatient(undefined);
        navigate('/login-appointments');
    }

    return (
        <nav className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] w-full flex max-[700px]:justify-start items-center justify-center h-[75px] relative">
            <Link to={'/'}>
                <div className="flex items-center justify-center gap-[10px] max-[700px]:ml-[20px]">
                    <FaPlusCircle color="#0047ba" size={30} className="flex-shrink-0 max-[400px]:w-[25px] max-[400px]:h-[25px]" />
                    <h1 className="w-[200px] h-auto text-[#fff] max-[400px]:text-[24px]" >HealthPoint</h1>
                </div>
            </Link>

            <div
                onClick={removePatientFromStorage}
                className="absolute top-1/2 right-[100px] max-[700px]:right-[20px] -translate-y-1/2 cursor-pointer flex items-center justify-center gap-[10px] border-[0.5px] border-[#fff] px-[10px] py-[4px] rounded-[14px] transition-all duration-[0.3s] hover:bg-[#fff] hover:text-[#000] text-[#fff]">
                <span className="max-[420px]:hidden">Cerrar Sesion</span>
                <MdLogout size={30} className="flex-shrink-0 max-[400px]:w-[25px] max-[400px]:h-[25px]" />
            </div>
        </nav>
    )
}

export default NavBarAppointments;