import react from "react";
interface navItemProps{
  children: React.ReactNode;
  page: string;
  name:string;
}

const NavItem = (props: navItemProps) =>{
  return(
      <a href = {props.page} className="mt-5 flex cursor-pointer p-1 rounded hover:stroke-0  bg-black hover:bg-blue-500 transition-colors duration-200 place-items-center gap-3  ">
      {props.children}
      <p className = "text-inherit font-mono whitespace-nowrap overflow-clip tracking-wide">
        {props.name}
      </p>
    </a>
  )

}
export default NavItem;