import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/core/components/shadcnComponents/Ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcnComponents/Ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../shadcnComponents/Ui/form";
import { Button } from "@/core/components/shadcnComponents/Ui/button"
import { CreateTaskAction } from "@/core/actions/CreateTaskAction";
import { UpdateTaskAction } from "@/core/actions/UpdateTaskAction";
import { DeleteTaskAction } from "@/core/actions/DeleteTaskAction";
import { taskFormSchema } from "@/core/lib/utils/taskFormSchema";
import { useEffect } from "react";
import { Textarea } from "../shadcnComponents/Ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../shadcnComponents/Ui/input";
import type { Tasks } from "@/core/lib/types/Tasks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DeadlineDatePicker } from "../datePickers/DeadlineDatePicker";

interface TaskDialogProps {
    task?: Tasks
    taskAction: "create" | "view" | "edit" | "delete"
    open: boolean
    setOpen: (open: boolean) => void,
    onTasksChange?: () => void,
}

export const TaskDialog: React.FC<TaskDialogProps> = ({
    task,
    taskAction,
    open,
    setOpen,
    onTasksChange
}) => {
    const dialogAction = taskAction
    const isEditable = dialogAction === "edit" || dialogAction === "create"

    const getDialogContent = () => {
        switch (dialogAction) {
            case "create":
                return {
                    title: "Criar item",
                    description: "Aqui você pode criar um novo item."
                }
            case "view":
                return {
                    title: "Visualizar item",
                    description: "Aqui você pode visualizar os detalhes do item."
                }
            case "edit":
                return {
                    title: "Editar item",
                    description: "Modifique as informações do item abaixo."
                }
            case "delete":
                return {
                    title: "Tem certeza?",
                    description: "Essa ação não pode ser desfeita. Deseja excluir o item?"
                }
            default:
                return { title: "", description: "" }
        }
    }

    const { title, description } = getDialogContent()

    const createTask = async (taskValues: z.infer<typeof taskFormSchema>) => {
        const { title, description, status, deadline } = taskValues;
    
        const registerTaskRes = await CreateTaskAction.execute({ title, description, status, deadline });
        const message = registerTaskRes.data;
    
        switch (registerTaskRes.status) {
            case "SUCCESS":
                toast.success(message, {
                    className: "!bg-emerald-700 !border-emerald-800 !text-white"
                });
                onTasksChange?.()
                setOpen(false);
                break;
    
            case "UNKNOWN":
                toast.error(message, {
                    className: "!bg-red-700 !border-red-800 !text-white"
                });
                break;
            
            default:
                toast.error("Não foi possível criar a tarefa no momento. Tente novamente mais tarde.", {
                    className: "!bg-red-700 !border-red-800 !text-white"
                });
                break;
        }
      };

    const updateTask = async (taskValues: z.infer<typeof taskFormSchema>) => {
        const { title, description, status, deadline } = taskValues;

        const updateTaskRes = await UpdateTaskAction.execute({ title, description, status, deadline }, task!._id)
        const updateTaskMessage = updateTaskRes.data

        switch (updateTaskRes.status) {
            case "SUCCESS":
                toast.success(updateTaskMessage, {
                    className: "!bg-emerald-700 !border-emerald-800 !text-white"
                });
                onTasksChange?.()
                setOpen(false);
                break;
            
            case "UNKNOWN":
                toast.error(updateTaskMessage, {
                    className: "!bg-red-700 !border-red-800 !text-white"
                });
                break;
            
            default:
                toast.error("Não foi possível criar a conta no momento. Tente novamente mais tarde.", {
                    className: "!bg-red-700 !border-red-800 !text-white"
                });
                break;
        }
    }

    const deleteTask = async () => {
        const deleteTaskRes = await DeleteTaskAction.execute(task!._id);
        const deleteTaskMessage = deleteTaskRes.data

        switch (deleteTaskRes.status) {
            case 'SUCCESS':
                toast.success(deleteTaskMessage, {
                    className: "!bg-emerald-700 !border-emerald-800 !text-white"
                });
                onTasksChange?.()
                setOpen(false);
                break;
            
            case 'TASK_NOT_FOUND':
                toast.error(deleteTaskMessage, {
                  className: "!bg-red-700 !border-red-800 !text-white !align-middle"
                });
                break;
            
            case 'TOKEN_NOT_FOUND':  
            case 'INVALID_TOKEN':
            case 'ACCESS_DENIED':
            case 'UNKNOWN':
                toast.error(deleteTaskMessage, {
                  className: "!bg-red-700 !border-red-800 !text-white !align-middle"
                });
                break;
            
            default:
                break;
        }
    };

    const form = useForm<z.infer<typeof taskFormSchema>>({
      resolver: zodResolver(taskFormSchema),
      defaultValues: {
        title: "",
        description: "",
        status: "pending",
        deadline: undefined,
      },
    })

    useEffect(() => {
        if (!open) return
        if (!dialogAction || dialogAction === "delete") return

        if (dialogAction !== "create" && task) {
          form.reset({
            title: task.title,
            description: task.description,
            status: task.status,
            deadline: task.deadline ? new Date(task.deadline) : undefined,
          })
        } else {
          form.reset({
            title: "",
            description: "",
            status: "pending",
            deadline: undefined,
          })
        }
    }, [task, open, dialogAction, form])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {dialogAction !== "delete" ? (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(dialogAction === "create" ? createTask : updateTask)}>
                            <div className="grid gap-4">
                                <FormField 
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-3">
                                            <FormLabel>
                                                Título da tarefa
                                            </FormLabel>

                                            <FormControl>
                                                <Input id="title-1" type="text" readOnly={!isEditable} {...field}/>
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField 
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-3">
                                            <FormLabel>
                                                Descrição
                                            </FormLabel>

                                            <FormControl>
                                                <Textarea readOnly={!isEditable} {...field} />
                                            </FormControl>

                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                  control={form.control}
                                  name="status"
                                  render={({ field }) => (
                                    <FormItem className="grid gap-3">
                                      <FormLabel>Status</FormLabel>
                                
                                      <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={!isEditable}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Selecione o status" />
                                          </SelectTrigger>
                                        </FormControl>
                                
                                        <SelectContent>
                                          <SelectItem value="pending">Pendente</SelectItem>
                                          <SelectItem value="completed">Concluída</SelectItem>
                                          <SelectItem value="archived">Arquivada</SelectItem>
                                        </SelectContent>
                                      </Select>
                                
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="deadline"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-col gap-3">
                                      <FormLabel>Prazo</FormLabel>
                                
                                      <FormControl>
                                        <DeadlineDatePicker
                                          value={field.value}
                                          onChange={field.onChange}
                                          disabled={!isEditable}
                                        />
                                      </FormControl>
                                
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                            </div>

                            <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                    <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                                </DialogClose>

                                {dialogAction !== "view" ? (
                                    <Button type="submit" className="cursor-pointer">Confirmar</Button>
                                ) : (null)}
                            </DialogFooter>
                        </form>
                    </Form>
                ) : (null)}

                {dialogAction === 'delete' ? (
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                        </DialogClose>

                        <Button variant="destructive" onClick={deleteTask} className="cursor-pointer">Confirmar exclusão</Button>
                    </DialogFooter>
                ) : (null)}
          </DialogContent>
        </Dialog>
    )
}
