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


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  addCourse: (course:CourseItem) => void;
}

interface tableProps{
  addCourse: (course: CourseItem) => void;


}

export function DataTable<TData, TValue>({
                                           columns,
                                           data,
                                           addCourse
                                         }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [courseModalOpen, setCourseModalOpen ] = useState<boolean>(false);
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
      <CreateCourseModal open={courseModalOpen} handleClose={() => setCourseModalOpen(false)} addCourse = {addCourse}/>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter By Course Code"
          value={(table.getColumn("courseName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("courseName")?.setFilterValue(event.target.value)
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
