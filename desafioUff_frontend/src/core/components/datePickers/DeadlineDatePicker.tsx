import { format, addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { ptBR } from "date-fns/locale"
import { cn } from "@/core/lib/shadcnUtils/utils"

import { Button } from "@/core/components/shadcnComponents/Ui/button"
import { Calendar } from "@/core/components/shadcnComponents/Ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/components/shadcnComponents/Ui/popover"

type DeadlineDatePickerProps = {
  value?: Date
  onChange?: (date?: Date) => void
  disabled?: boolean
}

export function DeadlineDatePicker({
  value,
  onChange,
  disabled,
}: DeadlineDatePickerProps) {
  const presets = [
    { label: "Hoje", value: 0 },
    { label: "Amanhã", value: 1 },
    { label: "Em 3 dias", value: 3 },
    { label: "Em 1 semana", value: 7 },
    { label: "Em 2 semanas", value: 14 },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />

          {value ? format(value, "PPP", { locale: ptBR }) : "Selecione uma data"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 mx-auto max-w-75" align="start">
        <div className="p-3 border-b flex flex-wrap gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.value}
              size="sm"
              variant="outline"
              className="flex-1"
              onClick={() => onChange?.(addDays(new Date(), preset.value))}
            >
              {preset.label}
            </Button>
          ))}
        </div>

        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={ptBR}
          className="p-0 [--cell-size:--spacing(10.5)]"
        />

        <div className="p-3 border-t flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange?.(undefined)}
          >
            Limpar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}