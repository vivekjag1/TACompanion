import react from "react";
interface navItemProps{
  children: React.ReactNode;
  page: string;
  name:string;
}

const NavItem = (props: navItemProps) =>{
  return(
    <a href = {props.page} className="flex cursor-pointer p-1 rounded hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-100 place-items-center gap-3 hover:bg-neutral-700/30  transition-colors duration-100">
      {props.children}
      <p className = "text-inherit font-mono whitespace-nowrap overflow-clip tracking-wide">
        {props.name}
      </p>
    </a>
  )

}
export default NavItem;