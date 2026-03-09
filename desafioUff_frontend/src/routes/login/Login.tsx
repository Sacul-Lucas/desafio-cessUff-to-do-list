import { Toaster } from "@/core/components/shadcnComponents/Ui/sonner";
import type { formSchema } from "@/core/lib/utils/userFormSchema";
import { AuthUserAction } from "@/core/actions/AuthUserAction";
import { DefineApp } from "@/core/components/utils/DefineApp";
import { AuthForm } from "@/core/components/forms/AuthForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type z from "zod";
import appAuthIcon from "@/assets/icons/auth-user.svg";

export const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = async (authValues: z.infer<typeof formSchema>) => {
    const { email, password } = authValues;

    const authRes = await AuthUserAction.execute({ email, password });
    const message = authRes.data;

    switch (authRes.status) {
      case "SUCCESS":
        localStorage.setItem("jwtToken", authRes.token.access_token);
        toast.success(message, {
          duration: 1500,
          className: "!bg-emerald-700 !border-emerald-800 !text-white"
        });
        setTimeout(() => navigate("/Dashboard"), 1500);
        break;

      case "EMAIL_NOT_FOUND":
      case "INVALID_PASSWORD":
      case "UNKNOWN":
        toast.error(message, {
          className: "!bg-red-700 !border-red-800 !text-white !align-middle"
        });
        break;

      default:
        toast.error("Não foi possível fazer login no momento. Tente novamente mais tarde.", {
          className: "!bg-red-700 !border-red-800 !text-white"
        });
        break;
    }
  };

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