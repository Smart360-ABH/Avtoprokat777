const WA_PHONE = "79409938497";

export interface BookingData {
  name: string;
  phone: string;
  carName?: string | null;
  startDate: string;
  endDate?: string | null;
  city: string;
  comment?: string | null;
  withDriver: boolean;
}

function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function sendWhatsAppBooking(data: BookingData) {
  const lines = [
    "🚗 *Заявка на аренду — Автопрокат 777*",
    "",
    `👤 *Имя:* ${data.name}`,
    `📞 *Телефон:* ${data.phone}`,
  ];

  if (data.carName) lines.push(`🚙 *Автомобиль:* ${data.carName}`);
  lines.push(`📅 *Дата начала:* ${fmtDate(data.startDate)}`);
  if (data.endDate) lines.push(`📅 *Дата окончания:* ${fmtDate(data.endDate)}`);
  lines.push(`📍 *Город получения:* ${data.city}`);
  if (data.withDriver) lines.push("👨‍✈️ *Нужен водитель:* Да");
  if (data.comment) lines.push(`💬 *Комментарий:* ${data.comment}`);

  const text = encodeURIComponent(lines.join("\n"));
  window.open(`https://wa.me/${WA_PHONE}?text=${text}`, "_blank");
}
