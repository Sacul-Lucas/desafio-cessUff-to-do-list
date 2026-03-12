import type { Tasks } from "@/core/lib/types/Tasks"
import type { ColumnDef } from "@tanstack/react-table"
import { formatDate } from "@/core/lib/utils/dateFormatter"
import { taskStatusRecord } from "@/core/lib/utils/taskStatusRecord"
import { TaskActionsCell } from "../Cells/TaskActionsCell"

export const TasksDataColumn = (onTasksChange?: () => void): ColumnDef<Tasks>[] => [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as string
      const label = taskStatusRecord[status] ?? status
      return <div className="font-medium">{label}</div>
    },
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "deadline",
    header: "Prazo",
  
    filterFn: (row, columnId, filterValue: Date) => {
      const value = row.getValue(columnId)
    
      if (!value || !filterValue) return true
    
      const rowDate = new Date(value as string)
      const selectedDate = new Date(filterValue)
    
      return rowDate.toDateString() === selectedDate.toDateString()
    },
  
    cell: ({ row }) => {
      return (
        <div>{formatDate(row.original.deadline)}</div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TaskActionsCell task={row.original} onTasksChange={onTasksChange} />
  }
]