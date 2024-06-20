import {CustomDragIndicator} from "../components/CustomDragIndicator";
interface cardProps{
  title:string;
  key: number;
  column: string;
}
export const Card = (props:cardProps) =>{
  return(
    <>
      <CustomDragIndicator beforeID = {props.key} column = {props.column}/>
      <div draggable={true}>
        <p  className = "cursor-grab rounded border border-neutral-700 bg-white p-3 active:cursor-grabbing text-sm text-black">{`Title: ${props.title}`}</p>
      </div>
    </>
  )

}