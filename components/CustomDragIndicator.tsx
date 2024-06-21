interface dragProps{
  beforeID: number;
  column: string;
}

export const CustomDragIndicator = (props:dragProps)=>{
  return(
    <div data-before = {props.beforeID} data-column = {props.column} className="my-0.5 h-0.5 w-full bg-blue-500 opacity-0"/>

  )
}