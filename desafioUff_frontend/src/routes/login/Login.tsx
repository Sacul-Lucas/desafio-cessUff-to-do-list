import { Toaster } from "@/core/components/shadcnComponents/Ui/sonner"
import { DefineApp } from "@/core/components/utils/DefineApp"
import { AuthForm } from "@/core/components/forms/AuthForm"
import appAuthIcon from "@/assets/icons/auth-user.svg";

const handleSubmit = () => {
    console.log("login")
}

export const Login = () => {
    return (
        <DefineApp
          appTitle="TaskFlow - Login"
          appIcon={appAuthIcon}
          bodyStyle="flex w-full min-h-dvh bg-no-repeat justify-center items-center"
        >
          <AuthForm formType="Login" formAction={handleSubmit} formMethod="POST" />

          <Toaster position="bottom-left"/>
        </DefineApp>
    )
}