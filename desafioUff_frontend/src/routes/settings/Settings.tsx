import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/shadcnComponents/Ui/form";
import { GetCurrentUserAction } from "@/core/actions/GetCurrentUserAction";
import { ThemeDropdown } from "@/core/components/dropdowns/ThemeDropdown"
import { AppSidebarBody } from "@/core/components/sidebar/AppSidebarBody"
import { AppSidebarCard } from "@/core/components/cards/AppSidebarCard";
import { Input } from "@/core/components/shadcnComponents/Ui/input";
import { UpdateUserAction } from "@/core/actions/UpdateUserAction";
import { formSchema } from "@/core/lib/utils/userFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/core/lib/utils/useAuth";
import type { User } from "@/core/lib/types/User";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Eye,
  EyeClosed
} from "lucide-react"
import type z from "zod";
import appSettingsIcon from "@/assets/icons/settings.svg";

export const Settings = () => {
    const [currentUser, setCurrentUser] = useState<User>()
    const [showPassword, setShowPassword] = useState(false);
    const { userId } = useAuth()

    const getCurrentUser = async () => {
        const currentUserRes = await GetCurrentUserAction.execute(userId!)
        const currentUserMessage = currentUserRes.data

        switch (currentUserRes.status) {
            case "SUCCESS":
                setCurrentUser(currentUserMessage)
                break;
            
            case "USER_NOT_FOUND":
            case "ACCESS_DENIED":
            case "INVALID_TOKEN":
            case "TOKEN_NOT_FOUND":    
            case "UNKNOWN":
                toast.error(currentUserMessage, {
                    className: "!bg-red-700 !border-red-800 !text-white"
                });
                break;
            
            default:
                toast.error("Não foi possível encontrar sua conta no momento. Tente novamente mais tarde.", {
                    className: "!bg-red-700 !border-red-800 !text-white"
                });
                break;
        }
    }

    const updateUser = async (authValues: z.infer<typeof formSchema>) => {
        const { username, email, password } = authValues;

        const updateUserRes = await UpdateUserAction.execute({ username, email, password }, userId!)
        const updateUserMessage = updateUserRes.data

        switch (updateUserRes.status) {
            case "SUCCESS":
                toast.success(updateUserMessage, {
                    className: "!bg-emerald-700 !border-emerald-800 !text-white"
                });
                break;
            
            case "EMAIL_ALREADY_EXISTS":
            case "UNKNOWN":
                toast.error(updateUserMessage, {
                    className: "!bg-red-700 !border-red-800 !text-white"
                });
                break;
            
            default:
                toast.error("Não foi possível atualizar a conta no momento. Tente novamente mais tarde.", {
                    className: "!bg-red-700 !border-red-800 !text-white"
                });
                break;
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        },
    })

    useEffect(() => {
        getCurrentUser()

        if (currentUser) {
          form.reset({
            username: currentUser.username,
            email: currentUser.email,
            password: currentUser.password
          })
        }
    }, [userId])
    
    return (
        <AppSidebarBody appSidebarTitle="TaskFlow - Configurações" appSidebarIcon={appSettingsIcon} appSidebarBodyStyle="flex-col">
            <div className="mt-8 xl:max-w-[90%]! h-fit w-full flex justify-center align-middle">
                <AppSidebarCard cardTitle="Configurações" cardDescription="Ajuste as opções conforme suas preferências" cardAction={<ThemeDropdown />}>
                    {/* <div className="flex flex-col gap-4 max-w-2xl">
                        <div className="flex flex-col">
                            <p className="text-card-foreground font-semibold">Conta</p>
                            <p className="text-sm text-muted-foreground">Altere os dados da sua conta</p>
                        </div>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(updateUser)}>
                                <div className="grid gap-4">
                                    <FormField 
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-3">
                                                <FormLabel>
                                                    Nome de usuário
                                                </FormLabel>
                                        
                                                <FormControl>
                                                    <Input id="username-1" type="text" {...field}/>
                                                </FormControl>
                                        
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
    
                                    <FormField 
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-3">
                                                <FormLabel>
                                                    Email
                                                </FormLabel>
                                        
                                                <FormControl>
                                                    <Input id="email-1" type="text" {...field}/>
                                                </FormControl>
                                        
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
    
                                    
                                    <FormField 
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-3">
                                                <FormLabel>
                                                    Senha
                                                </FormLabel>
                                        
                                                <div className="relative">
                                                    <FormControl>
                                                        <Input  
                                                            type={showPassword ? "text" : "password"} 
                                                            autoComplete="off"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                        
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-black cursor-pointer"
                                                    >
                                                        {showPassword ? <Eye /> : <EyeClosed />}
                                                    </button>
                                                </div>
                                        
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                    
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                                    </DialogClose>
                                
                                    {dialogAction !== "view" ? (
                                        <Button type="submit" className="cursor-pointer">Confirmar</Button>
                                    ) : (null)}
                                </DialogFooter>
                            </form>
                        </Form>
                    </div> */}
                    <></>
                </AppSidebarCard>
            </div>
        </AppSidebarBody>
    )
}