import {motion, useAnimationControls} from "framer-motion";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useEffect, useState} from "react";

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
  }, [open]);


  return(
    <motion.nav variants={animation} animate={containerControls} initial="close"  className="bg-neutral-900 fkex flex-col  z-10 gap-20 p-5 absolute top-0 left-0 h-full shadow-neutral-600 rounded-tr">
      <div className="flex flex-row w-full justify-between place-items-center">
        {open && <div className = "justify-between items-center w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full"/>}
        <button className="p-1 rounded-full flex" onClick={ changeState}>
          {open? <ArrowBackIosIcon/>:<ArrowForwardIosIcon/>}

        </button>

      </div>
      <div className = "flex flex-col gap-3">

      </div>
    </motion.nav>

  )
}
export default NavBar;