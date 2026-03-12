import { TasksDataColumn } from "@/core/components/tables/dataTables/Columns/TasksDataColumn"
import { TasksDataTable } from "@/core/components/tables/dataTables/TasksDataTable"
import { AppSidebarBody } from "@/core/components/sidebar/AppSidebarBody"
import { Toaster } from "@/core/components/shadcnComponents/Ui/sonner"
import type { Tasks } from "@/core/lib/types/Tasks"
import { useEffect, useState, useMemo, useCallback } from "react"
import appDashboardIcon from "../../assets/icons/dashboard.svg"
import { GetTasksAction } from "@/core/actions/GetTasksAction"
import { toast } from "sonner"

export const Dashboard = () => {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);

    const fetchTasksRes = await GetTasksAction.execute();
    const fetchTasksMessage = fetchTasksRes.data;

    switch (fetchTasksRes.status) {
      case 'SUCCESS':
        setTasks(fetchTasksMessage);
        break;

      case 'TASKS_NOT_FOUND':
        toast.error(fetchTasksMessage, {
          className: "!bg-red-700 !border-red-800 !text-white !align-middle"
        });
        break;

      case 'TOKEN_NOT_FOUND':
      case 'INVALID_TOKEN':
      case 'UNKNOWN':
        toast.error(fetchTasksMessage, {
          className: "!bg-red-700 !border-red-800 !text-white !align-middle"
        });
        break;

      default:
        break;
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const columns = useMemo(() => TasksDataColumn(fetchTasks), [fetchTasks])
  
  return (
    <AppSidebarBody appSidebarTitle="TaskFlow - Dashboard" appSidebarIcon={appDashboardIcon} appSidebarBodyStyle="flex-col">
      <div className="mt-8 xl:max-w-[85%]! h-fit w-full">
        {!loading ? <TasksDataTable columns={columns} data={tasks} /> : <></>}
      </div>
    <Toaster position="bottom-left"/>
    </AppSidebarBody>
  )
}