import { TaskDialog } from "@/core/components/dialogs/TaskDialog"
import { Button } from "@/core/components/shadcnComponents/Ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/core/components/shadcnComponents/Ui/dropdown-menu"
import type { Tasks } from "@/core/lib/types/Tasks"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"

interface TaskActionsCellProps {
    task?: Tasks
    onTasksChange?: () => void
}

export const TaskActionsCell: React.FC<TaskActionsCellProps> = ({
    task,
    onTasksChange
}) => {
    const [open, setOpen] = useState(false)
    const [action, setAction] = useState<"create" | "view" | "edit" | "delete">("view")

    const handleOpen = (actionType: typeof action) => {
        setAction(actionType)
        setOpen(true)
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => handleOpen("create")}>
                        Criar nova tarefa
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleOpen("view")}>
                        Visualizar tarefa
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleOpen("edit")}>
                        Editar tarefa
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => handleOpen("delete")}>
                        Excluir tarefa
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <TaskDialog
                task={task}
                taskAction={action}
                open={open}
                setOpen={setOpen}
                onTasksChange={onTasksChange}
            />
        </div>
    )
}