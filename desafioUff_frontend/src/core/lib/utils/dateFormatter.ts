export const formatDate = (date: string | Date | number | undefined) => {
  if (!date) return "-";
  return new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};