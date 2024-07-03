import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Button} from '../components/ui/button';
import Link from "next/link";

interface courseProps{
  courseName:string;
  term:string;
  imageSrc:string;
  role:string;
}
export default function CourseCard(props:courseProps){
  return (
  <Link href={props.courseName}>
    <Card sx = {{width:"21.5625rem", height: "22rem", background:"lightgray"}} className = "hover:shadow-2xl">
      {/*<CardMedia*/}
      {/*  component="img"*/}
      {/*  alt = {props.courseName}*/}
      {/*  height = "140"*/}
      {/*  image = {props.imageSrc}*/}
      {/*  className="object-fit"*/}
      {/*/>*/}
      <CardContent>
        <h1 className = "font-bold font-xl">{props.courseName}</h1>
        <h2 className="font-semibold font-lg">{`${props.term}, Role:${props.role}`}</h2>
      </CardContent>
    </Card>
  </Link>
  );
}