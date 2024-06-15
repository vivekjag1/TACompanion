import {motion, useAnimationControls, AnimatePresence} from "framer-motion";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useEffect, useState} from "react";
import NavItem from "../components/NavItem";
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import LinkIcon from '@mui/icons-material/Link';
import PersonIcon from '@mui/icons-material/Person';
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
  close: {opacity:0},
  open: {opacity:1, duration:0.5}
}



const NavBar = () =>{
  const [open, setOpen] = useState<boolean>(false);
  const containerControls = useAnimationControls();
  const changeState = () => setOpen(!open);

  const iconControl = useAnimationControls();

  useEffect(() =>{
    console.log("useEffect running!");
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
                className="bg-black fkex flex-col  z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow-neutral-600 rounded-tr-xl rounded-br-xl">
      <div className="flex flex-row w-full justify-between place-items-center">
        {open && <motion.p variants={textAnimation} className=" whitespace-nowrap flex items-center text-2xl font-mono font-bold">TA Companion</motion.p> }
        <button className="p-1 rounded-full flex" onClick={changeState}>
          {open ? <ArrowBackIosIcon/> : <ArrowForwardIosIcon/>}
        </button>

      </div>
      <div className="flex flex-col gap-3 flex-grow">
        <NavItem name="TODO items" page="/todo">
          <NoteAltIcon/>
        </NavItem>
        <NavItem name="Hours" page="/hours">
          <AccessTimeIcon/>
        </NavItem>
        <NavItem name="Courses" page="/courses">
          <SchoolIcon/>
        </NavItem>
        <NavItem name="Links" page="/links">
          <LinkIcon/>
        </NavItem>
        {/*This is a placeholder that will eventually have sign out/sign in when i get around to it!*/}
        <div className="absolute bottom-0 items-center justify-center cursor-pointer mt-auto">
          <PersonIcon/>
        </div>

      </div>



    </motion.nav>

  )
}
export default NavBar;