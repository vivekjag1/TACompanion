import type {CourseItem} from "../mongoose/course/schema";
import { Button } from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
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
import {useState} from "react";

export type Course = {
  courseName: string;
  title:string;
  term:string;
  role:string;
  credits:number;
}

export const columns: ColumnDef<CourseItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "courseCode",
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
   cell: ({row}) => <div className = "text-center">{row.getValue("courseCode")}</div>

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
    accessorKey:"credits",
    header:"credits",
    cell: ({row}) => <div className = "text-center">{row.getValue("credits")}</div>

  },

  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original
      return (
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
              onClick={() => navigator.clipboard.writeText(course.courseCode as string)}
            >
              Edit course details
            </DropdownMenuItem>
            <DropdownMenuItem>Remove Course</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },


]
