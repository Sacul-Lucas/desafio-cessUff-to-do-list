import { RegisterUserAction } from "@/core/actions/RegisterUserAction";
import { Toaster } from "@/core/components/shadcnComponents/Ui/sonner"
import type { formSchema } from "@/core/lib/utils/userFormSchema";
import { DefineApp } from "@/core/components/utils/DefineApp";
import { AuthForm } from "@/core/components/forms/AuthForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type z from "zod";
import appAuthIcon from "@/assets/icons/auth-user.svg";

export const Register = () => {
  const navigate = useNavigate()

  const handleSubmit = async (authValues: z.infer<typeof formSchema>) => {
    const { username, email, password } = authValues;

    const registerRes = await RegisterUserAction.execute({ username, email, password });
    const message = registerRes.data;

    switch (registerRes.status) {
      case "SUCCESS":
        toast.success(message, {
          duration: 1500,
          className: "!bg-emerald-700 !border-emerald-800 !text-white"
        });
        setTimeout(() => navigate("/Login"), 1500);
        break;

      case "EMAIL_ALREADY_EXISTS":
      case "UNKNOWN":
        toast.error(message, {
          className: "!bg-red-700 !border-red-800 !text-white"
        });
        break;

      default:
        toast.error("Não foi possível criar a conta no momento. Tente novamente mais tarde.", {
          className: "!bg-red-700 !border-red-800 !text-white"
        });
        break;
    }
  };

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