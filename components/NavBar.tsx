import {motion, useAnimationControls, AnimatePresence} from "framer-motion";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useEffect, useState} from "react";
import NavItem from "../components/NavItem";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import LinkIcon from '@mui/icons-material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
const animation = {
  close : {
    width: "5rem",
    transition:{
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open:{
    width:"16rem",
    transition: {
      type:"spring",
      damping:15,
      duration:0.5,
    }
  }
}

const iconAnimation = {
  close:{
    rotate:360
  },
  open:{
    rotate:180
  }
};
const textAnimation = {
  close: {opacity: 0},
  open: {opacity: 1, duration: 0.5}
}
const NavBar = () =>{
  const [open, setOpen] = useState<boolean>(false);
  const containerControls = useAnimationControls();
  const changeState = () => setOpen(!open);

  const iconControl = useAnimationControls();

  useEffect(() =>{
    if(open){
      containerControls.start("open");
      iconControl.start("open");
    }
    else{
      containerControls.start("close");

      iconControl.start("close");

    }
  }, [containerControls, iconControl, open]);


  return(
    <motion.nav variants={animation} animate={containerControls} initial="close"
                className="bg-black fkex flex-col  z-10 gap-20 p-5 fixed top-0 left-0 h-screen shadow-neutral-600 rounded-tr-xl rounded-br-xl ">
      <div className="flex flex-row w-full justify-between place-items-center">
        {open && <motion.p variants={textAnimation} className=" whitespace-nowrap flex items-center text-2xl text-white font-mono font-bold">TA Companion</motion.p> }
        <button className="p-1 rounded-full flex" onClick={changeState}>
          {open ? <ArrowBackIosIcon sx ={{color:'white'}}/> : <ArrowForwardIosIcon sx ={{color:'white'}}/>}
        </button>

      </div>
      <div className="flex flex-col gap-3 flex-grow">
        <NavItem name="TODO items" page="/todo" open = {open}>
          <NoteAltIcon sx ={{color:'white'}}/>
        </NavItem>
        <NavItem name="Hours" page="/hours" open = {open}>
          <AccessTimeIcon sx ={{color:'white'}}/>
        </NavItem>
        <NavItem name="Courses" page="/courses" open = {open}>
          <SchoolIcon  sx ={{color:'white'}} />
        </NavItem>
        <NavItem name="Tracking Sheet" page="/Tracking" open = {open}>
          <DocumentScannerIcon  sx ={{color:'white'}}/>
        </NavItem>
        <div className="absolute bottom-0 items-center justify-center cursor-pointer mt-auto mb-5">
          <NavItem page={"/api/auth/logout"} name={"Logout"} open={open}>
            <LogoutIcon sx = {{color:'white'}}/>
          </NavItem>
        </div>

      </div>


    </motion.nav>

  )
}
export default NavBar;