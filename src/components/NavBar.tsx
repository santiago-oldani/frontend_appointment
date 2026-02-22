import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/imgs/logo2.png";
import { Drawer, List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";



const NavBar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // El contenido del menú desplegable de MUI
  const DrawerList = (
    <div className="w-[250px] flex flex-col h-full bg-[#f9fafb]" onClick={toggleDrawer(false)}>
      <div className="bg-[#346cc8] w-full relative h-[30px]">
        <CloseIcon className="cursor-pointer absolute top-[5px] right-[10px] text-[#fff]" />
      </div>

      <div className="">
        <List>
          {[
            { text: 'Turnos', path: '/login-appointments', isLink: true },
            { text: 'Quienes Somos', path: '#quienes_somos', isLink: false },
            { text: 'Coberturas', path: '#coberturas', isLink: false },
            { text: 'Sedes', path: '#sedes', isLink: false }
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={item.isLink ? Link : 'a'}
                href={!item.isLink ? item.path : undefined}
                to={item.isLink ? item.path : undefined}
              >
                <ListItemText
                  primary={item.text}
                  slotProps={{ primary: { sx: { color: '#346cc8', fontSize: '1.2rem', fontWeight: 'bold' } } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>

    </div>
  );

  return (
    <nav className="flex flex-col items-center justify-center bg-[#0047ba] h-auto">
      {/* Tu Top Bar se mantiene igual */}
      <div className="flex flex-row items-center justify-around w-full h-[35px] max-[550px]:flex-col max-[550px]:gap-[10px]">
        <div className="w-[100px] max-[700px]:hidden"></div>
        <p className="text-[#fff] text-[0.8rem] max-[550px]:text-[0.7rem] max-[550px]:text-center max-[550px]:w-[80%]">Atencion al 4444-5555/11-1111-1111 de Lunes a viernes de 8:00 a 20:00hs</p>
        <div className="flex flex-row items-center justify-center gap-[20px] max-[550px]:hidden">
          <a target="_blank" className="hover:scale-110 transition-transform" href="http://facebook.com"><FaFacebook color="#fff" size={18} /></a>
          <a target="_blank" className="hover:scale-110 transition-transform" href="https://www.instagram.com"><FaInstagram color="#fff" size={18} /></a>
          <a target="_blank" className="hover:scale-110 transition-transform" href="https://www.youtube.com"><FaYoutube color="#fff" size={18} /></a>
          <a target="_blank" className="hover:scale-110 transition-transform" href="https://www.linkedin.com"><FaLinkedin color="#fff" size={18} /></a>
        </div>
      </div>

      <div className="flex flex-row relative items-center w-full justify-center bg-[#f9fafb] h-[65px]">
        <Link to={'/'}><img src={logo} alt="" className="w-[200px] absolute top-[22%] left-[4%] h-auto" /></Link>

        {/* Lista Desktop: Se oculta a los 1000px */}
        <ul className="list-none flex flex-row items-center justify-center gap-[50px] max-[1000px]:hidden">
          <Link to={'/login-appointments'} className="text-[1.2rem] rounded-[14px] px-[8px] py-[4px] hover:bg-[#64aade] hover:text-[#fff] text-[#346cc8] transition-all duration-[0.3s]"><li>Turnos</li></Link>
          <a href="#quienes_somos" className="text-[1.2rem] px-[8px] rounded-[14px] py-[4px] hover:bg-[#64aade] hover:text-[#fff] text-[#346cc8] transition-all duration-[0.3s]"><li >Quienes Somos</li></a>
          <a href="#coberturas" className="text-[1.2rem] px-[8px] py-[4px] rounded-[14px] hover:bg-[#64aade] hover:text-[#fff] text-[#346cc8] transition-all duration-[0.3s]"><li >Coberturas</li></a>
          <a href="#sedes" className="text-[1.2rem] px-[8px] py-[4px] rounded-[14px] hover:bg-[#64aade] hover:text-[#fff] text-[#346cc8] transition-all duration-[0.3s]"><li>Sedes</li></a>
        </ul>

        {/* Botón de MUI para abrir el Drawer (Solo visible < 1000px) */}
        <div className="hidden max-[1000px]:block absolute right-[4%]">
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ color: '#346cc8', fontSize: 35 }} />
          </IconButton>
        </div>

        {/* COMPONENTE DRAWER DE MUI */}
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar