import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/core/components/shadcnComponents/Ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/core/components/shadcnComponents/Ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shadcnComponents/Ui/select"
import { Separator } from "@/core/components/shadcnComponents/Ui/separator"
import { Button } from "@/core/components/shadcnComponents/Ui/button"
import { taskStatusRecord } from "@/core/lib/utils/taskStatusRecord"
import { Input } from "../../shadcnComponents/Ui/input"
import { DeadlineDatePicker } from "../../datePickers/DeadlineDatePicker"

interface TasksDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function TasksDataTable<TData, TValue>({
  columns,
  data,
}: TasksDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })
  
  return (
    <div>
        <div className="space-y-1">
          <h1 className="text-sm leading-none font-medium">Tarefas</h1>
          <p className="text-muted-foreground text-sm">
            Visão completa dos dados das tarefas criadas por você
          </p>
        </div>

        <Separator className="my-2" />

        <div className="flex flex-row items-center py-4 gap-4">
          <div className="flex flex-row items-center gap-2">
            <p className="text-muted-foreground text-sm">
              Status: 
            </p>

            <Select
              value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
              onValueChange={(value) =>
                table.getColumn("status")?.setFilterValue(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger className="w-55">
                <SelectValue placeholder="Filtrar status..." />
              </SelectTrigger>
            
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
            
                {Object.entries(taskStatusRecord).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="text-muted-foreground text-sm">
              Título: 
            </p>

            <Input
              placeholder="Filtrar título..."
              value={table.getColumn("title")?.getFilterValue() as string}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="text-muted-foreground text-sm">
              Prazo:
            </p>

            <DeadlineDatePicker
              value={table.getColumn("deadline")?.getFilterValue() as Date}
              onChange={(date) => table.getColumn("deadline")?.setFilterValue(date)}
            />
          </div>

          <div className="flex flex-row gap-2 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Colunas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter(
                    (column) => column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="overflow-hidden rounded-md border">
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
                          )
                        }
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
                    Sem resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="text-muted-foreground flex-1 text-sm mt-2">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
    </div>
  )
}