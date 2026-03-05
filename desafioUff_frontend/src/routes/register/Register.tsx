import { Toaster } from "@/core/components/shadcnComponents/Ui/sonner"
import { DefineApp } from "@/core/components/utils/DefineApp"
import { AuthForm } from "@/core/components/forms/AuthForm"
import appAuthIcon from "@/assets/icons/auth-user.svg";

const handleSubmit = () => {
  console.log("registro")
}

export const Register = () => {
    return (
        <DefineApp
          appTitle="TaskFlow - Registro"
          appIcon={appAuthIcon}
          bodyStyle="flex w-full min-h-dvh bg-no-repeat justify-center items-center"
        >
          <AuthForm formType="Register" formAction={handleSubmit} formMethod="POST" />

          <Toaster position="bottom-left"/>
        </DefineApp>
    )
}