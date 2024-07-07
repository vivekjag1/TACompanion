import {
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {Input} from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useState} from "react";
import {DataTablePagination} from "@/components/DataTablePagination";
import CreateCourseModal from "@/components/CreateCourseModal";
import {CourseItem} from "@/mongoose/course/schema";
import {Checkbox} from "@/components/ui/checkbox";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import EditCourseModal from "../components/EditCourseModal";

interface DataTableProps<TData, TValue> {
  data: TData[]
  addCourse: (course:CourseItem) => void;
  changeCourse:(course:CourseItem, toReplace:string, action:string ) => void;

}
export function DataTable<TData extends CourseItem, TValue>({
                                           data,
                                           addCourse,
                                            changeCourse
                                         }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [courseModalOpen, setCourseModalOpen ] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [clickedCourse, setClickedCourse] = useState<CourseItem>({});




   const columns: ColumnDef<TData>[]  = [
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
                onClick={() =>{
                  setUpdateModalOpen(true);
                  const clickedCourseCode = row.getValue('courseCode');
                  const item = data.filter((item) => item.courseCode === clickedCourseCode);
                  setClickedCourse(item[0]);

                }}
              >
                Edit course details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() =>{
                changeCourse(clickedCourse, row.getValue('courseCode'), 'delete');
              }}>Remove Course</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },


  ]
  const table = useReactTable({
    data,
     columns,
    state:{
      sorting,
      columnFilters
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting
  })



  return (
    <div>
      <EditCourseModal open={updateModalOpen} changeCourse={changeCourse} handleClose={() =>  setUpdateModalOpen(false)} course={clickedCourse}/>

      <CreateCourseModal open={courseModalOpen} handleClose={() => setCourseModalOpen(false)} addCourse = {addCourse}/>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter By Course Code"
          value={(table.getColumn("courseCode")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("courseCode")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button onClick={() => setCourseModalOpen(true)}>New Course</Button>
      </div>

      <div className="flex flex-row mb-4 justify-center rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table}/>

    </div>


  )
}
