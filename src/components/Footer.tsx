import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="w-full h-[75px] max-[400px]:flex-col max-[400px]:h-[110px] flex items-center justify-around bg-[#0047ba]">
            <div className="w-[180px] max-[700px]:hidden"></div>
            <div className="justify-self-center">
                <h1 className="text-[#fff] m-[0px] text-[1.5rem] max-[700px]:text-[1.2rem]">Santiago Oldani © 2026</h1>
            </div>
            <div className="flex items-center justify-self-end justify-center gap-[20px]">
                <a target="_blank" className="hover:scale-110 transition-transform" href="http://facebook.com"><FaFacebook color="#fff" size={30} className="max-[700px]:h-[22px] max-[700px]:w-[22px]"/></a>
                <a target="_blank" className="hover:scale-110 transition-transform" href="https://www.instagram.com"><FaInstagram color="#fff" size={30} className="max-[700px]:h-[22px] max-[700px]:w-[22px]"/></a>
                <a target="_blank" className="hover:scale-110 transition-transform" href="https://www.youtube.com"><FaYoutube color="#fff" size={30} className="max-[700px]:h-[22px] max-[700px]:w-[22px]"/></a>
                <a target="_blank" className="hover:scale-110 transition-transform" href="https://www.linkedin.com"><FaLinkedin color="#fff" size={30} className="max-[700px]:h-[22px] max-[700px]:w-[22px]"/></a>
            </div>

        </footer>
    )
}

export default Footer