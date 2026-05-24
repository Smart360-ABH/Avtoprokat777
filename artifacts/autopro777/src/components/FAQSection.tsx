import { useState } from "react";

const faqs = [
  {
    q: "Как забронировать автомобиль?",
    a: "Позвоните нам по номеру +7 (940) 993-84-97, напишите в WhatsApp/Telegram или оставьте заявку на сайте. Мы подтвердим бронь и согласуем время выдачи в течение 15 минут.",
  },
  {
    q: "Какие документы нужны для аренды?",
    a: "Водительское удостоверение (стаж от 2 лет) и паспорт. Иностранным гражданам — загранпаспорт и международные права.",
  },
  {
    q: "Можно ли выехать за пределы Абхазии?",
    a: "Аренда предполагает использование автомобиля на территории Абхазии. Выезд в другие страны — по дополнительному соглашению.",
  },
  {
    q: "Нужен ли залог?",
    a: "Да, залог зависит от класса автомобиля. Он возвращается в полном объёме при возврате авто без повреждений и в срок.",
  },
  {
    q: "Можно ли взять автомобиль с водителем?",
    a: "Да, мы предоставляем услугу аренды с профессиональным водителем. Укажите это в заявке или при звонке.",
  },
  {
    q: "Есть ли доставка автомобиля?",
    a: "Да, мы можем привезти автомобиль к вашей гостинице, аэропорту или другому удобному месту. Стоимость уточняйте при заказе.",
  },
  {
    q: "Что если автомобиль сломается?",
    a: "Свяжитесь с нами немедленно. Мы обеспечим техническую помощь или замену автомобиля в кратчайшие сроки.",
  },
  {
    q: "Как производится оплата?",
    a: "Оплата наличными или переводом. Полная оплата производится при получении автомобиля. Возможна предоплата для подтверждения брони.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-primary text-sm font-semibold">FAQ</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Частые вопросы
          </h2>
          <p className="text-muted-foreground text-lg">
            Ответы на самые популярные вопросы об аренде автомобилей.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                open === i ? "border-primary/40 shadow-md shadow-primary/10" : "border-border"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium text-foreground text-sm sm:text-base">{faq.q}</span>
                <div className={`w-6 h-6 rounded-full border border-border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${open === i ? "bg-primary border-primary text-white rotate-45" : "text-muted-foreground"}`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
