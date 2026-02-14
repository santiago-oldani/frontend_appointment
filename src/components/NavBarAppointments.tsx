import { Link } from "react-router";
import { FaPlusCircle } from "react-icons/fa";

const NavBarAppointments: React.FC = () => {
    return (
        <nav className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] w-full flex items-center justify-center h-[75px]">
            <Link to={'/'}>
                <div className="flex items-center justify-center gap-[10px]">
                    <FaPlusCircle color="#0047ba" size={30} className="flex-shrink-0"/>
                    <h1 className="w-[200px] h-auto text-[#fff]" >HealthPoint</h1>
                </div>
            </Link>
        </nav>
    )
}

export default NavBarAppointments;