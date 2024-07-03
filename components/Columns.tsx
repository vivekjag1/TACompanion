import type {CourseItem} from "../mongoose/course/schema";

import { ColumnDef } from "@tanstack/react-table"

export type Course = {
  courseName: string;
  title:string;
  term:string;
  role:string;
}

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "courseName",
    header: "Course Code",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "term",
    header: "Term",
  },
  {
    accessorKey: "role",
    header: "Role",
  },


]
