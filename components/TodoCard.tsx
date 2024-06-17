import {Card, CardActions, Button, CardContent} from "@mui/material";


interface cardProps {
  title:string;
  course: string;
  role :string;
  status:string;
  description:string;
}
const TodoCard = (props:cardProps) =>{
  const courseName = `Course: ${props.course}, Role: ${props.role}`
  const descriptionName = `Description: ${props.description}`

  return(
    <Card sx = {{width:"20rem", height: "15rem", background:"lightgray", marginLeft :"6rem" ,marginRight:"4rem"}} className = " mt-5 hover:shadow-2xl ">
      <CardContent>
        <h1 className = "text-4xl text-center font-bold font-mono"> {props.title}</h1>
        <div className="flex flex-row item-center justify-center">
          <h1 className="text-xl text-center">{courseName}</h1>
        </div>
        <p className = "text-lg text-center mt-2">{descriptionName}</p>
        <h1 className = "text-lg text-center mt-2">
          {props.status}
        </h1>
      </CardContent>
      <CardActions className = "items-center justify-center">
        <Button variant="contained" size = "small">Edit Todo</Button>

        <Button variant="contained" size = "small">Mark As Done</Button>
      </CardActions>
    </Card>

  )
}

export default TodoCard;