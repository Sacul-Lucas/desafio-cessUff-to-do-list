import { z } from "zod"

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Título deve possuir ao menos 2 caracteres",
    })
    .max(50, {
      message: "Título não pode ter mais de 50 caracteres",
    }),

  description: z
    .string()
    .min(10, {
      message: "Descrição deve possuir ao menos 10 caracteres",
    })
    .max(250, {
      message: "Descrição não pode ter mais de 250 caracteres",
    }),

  status: z
    .enum(["pending", "completed", "archived"])
    .optional(),

  deadline: z
    .date({
      error: "Data inválida",
    })
    .optional()
})