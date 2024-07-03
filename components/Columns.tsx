import type {CourseItem} from "../mongoose/course/schema";
import { Button } from "@/components/ui/button"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import Link from "next/link";

export type Course = {
  courseName: string;
  title:string;
  term:string;
  role:string;
}

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "courseName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"

        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
   cell: ({row}) => <div className = "text-center">{row.getValue("courseName")}</div>

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
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original

      return (
        // <>
        //   <Link href={"/idkYet"}/>
        //     <Button type="button" variant="ghost" >View {course.courseName} Details</Button>
        // </>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(course.courseName)}
            >
              View Canvas Page
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View course details</DropdownMenuItem>
            <DropdownMenuItem> Email course staff</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },


]
