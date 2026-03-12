import { ChevronUp, Home, Settings, User2, LayoutDashboardIcon, ChevronsRight, LayoutList, StickyNote } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/core/components/shadcnComponents/Ui/sidebar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../shadcnComponents/Ui/dropdown-menu"
import { Toaster } from "../shadcnComponents/Ui/sonner";
import { useAuth } from "@/core/lib/utils/useAuth";
import { useNavigate } from "react-router-dom";

const items = [
  // {
  //   title: "Página principal",
  //   url: "/TaskFlow",
  //   icon: Home,
  // },
  {
    title: "Dashboard",
    url: "/TaskFlow/Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Configurações",
    url: "/TaskFlow/Settings",
    icon: Settings,
  },
]

// const taskItems = [
//   {
//     title: "Próximas",
//     url: "/TaskFlow/Upcoming",
//     icon: ChevronsRight,
//   },
//   {
//     title: "Hoje",
//     url: "/TaskFlow/Today",
//     icon: LayoutList,
//   },
//     {
//     title: "Stickers",
//     url: "/TaskFlow/Stickers",
//     icon: StickyNote,
//   },
// ]

export function AppSidebar() {
  const { username, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            TaskFlow
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
              .map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild {...(location.pathname === item.url ? { isActive: true } : {})}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <SidebarGroup>
          <SidebarGroupLabel>
            Tarefas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {taskItems
              .map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild {...(location.pathname === item.url ? { isActive: true } : {})}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="cursor-pointer">
                  <User2 /> {username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem className="cursor-pointer">
                  <span>Conta</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {logout(); navigate("/Login")}} className="cursor-pointer">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <Toaster position="bottom-left"/>
    </Sidebar>
  )
}