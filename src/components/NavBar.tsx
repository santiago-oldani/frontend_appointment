import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/imgs/logo2.png";

const NavBar = () => {
  return (
    <nav className="flex flex-col items-center justify-center bg-[#0047ba] h-auto">
      <div className="flex flex-row relative items-center justify-center w-full h-[35px]">
        <p className="text-[#fff] text-[0.8rem]">Atencion al 4444-5555/11-1111-1111 de Lunes a viernes de 8:00 a 20:00hs</p>
        <div className="flex flex-row items-center justify-center gap-[20px] absolute top-[50%] bottom-[50%] right-[300px]">
          <FaFacebook size={18} color='#fff' />
          <FaInstagram size={18} color='#fff' />
          <FaLinkedin size={18} color='#fff' />
          <FaYoutube size={18} color='#fff' />
        </div>
      </div>

      <div className="flex flex-row relative items-center w-full justify-center bg-[#fff] h-[65px]">
        <Link to={'/'}><img src={logo} alt="" className="w-[200px] absolute top-[22%] left-[4%] h-auto"/></Link>
        <ul className="list-none flex flex-row items-center justify-center gap-[50px]">
          <Link to={'/appointments'}><li>Turnos</li></Link>
          <li id="li_azul">Nosotros</li>
          <li id="li_azul">Coberturas</li>
          <li id="li_azul">Sedes</li>
        </ul>
      </div>

      <div className="">

      </div>

    </nav>
  )
}

export default NavBar