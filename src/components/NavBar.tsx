import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="flex flex-col items-center justify-center bg-[#0047ba] h-auto">
      <div className="flex flex-row relative items-center justify-center w-full h-[50px]">
        <p className="text-[#fff]">Atencion al 4444-5555/11-1111-1111 de Lunes a viernes de 8:00 a 20:00hs</p>
        <div className="flex flex-row items-center justify-center gap-[20px] absolute top-[50%] bottom-[50%] right-[300px]">
          <FaFacebook size={18} color='#fff'/>
          <FaInstagram size={18} color='#fff'/>
          <FaLinkedin size={18} color='#fff'/>
          <FaYoutube size={18} color='#fff'/>
        </div>
      </div>

      <div className="flex flex-row items-center w-full justify-center bg-[#fff] h-[90px]">
        <ul className="list-none flex flex-row items-center justify-center gap-[50px]">
          <Link to={'/'}><li>Inicio</li></Link>
          <li>Turnos</li>
          <li>Nosotros</li>
          <li>Coberturas</li>
          <li>Sedes</li>
        </ul>
      </div>
      
      <div className="">

      </div>

    </nav>
  )
}

export default NavBar