const terms = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
    title: "Документы",
    desc: "Водительское удостоверение и паспорт. Стаж вождения — от 2 лет.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Залог",
    desc: "Залог зависит от класса автомобиля. Возвращается в полном объёме после аренды.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Страховка",
    desc: "Все автомобили застрахованы по ОСАГО. Каско — по договорённости.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 00-1 1v4a1 1 0 001 1h3.28a1 1 0 01.948.684l.74 2.316A2 2 0 009.879 14H10a1 1 0 001 1v1a2 2 0 002 2h4a2 2 0 002-2v-1a1 1 0 001-1v-2a1 1 0 00-1-1h-.879a2 2 0 01-1.911-1.515l-.74-2.17A1 1 0 0015.52 9H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
      </svg>
    ),
    title: "Топливо",
    desc: "Автомобиль выдаётся с полным баком. Возврат — также с полным баком.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Минимальный срок",
    desc: "Минимальный срок аренды — 1 сутки. Аренда посуточная.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    title: "Доставка",
    desc: "Доставляем автомобиль к гостинице или месту прибытия — уточняйте стоимость.",
  },
];

export default function RentalTermsSection() {
  return (
    <section id="terms" className="py-20 lg:py-28 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/20 rounded-full px-4 py-1.5 mb-4 border border-primary/30">
            <span className="text-primary text-sm font-semibold">Аренда</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Условия аренды
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Всё прозрачно. Никаких скрытых платежей — только честные условия.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {terms.map((term, i) => (
            <div
              key={i}
              className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/8 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                {term.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{term.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{term.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/50 text-sm mb-4">Остались вопросы по условиям?</p>
          <a
            href="tel:+79409938497"
            className="inline-flex items-center gap-2 bg-primary hover:bg-amber-500 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-primary/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Позвонить: +7 (940) 993-84-97
          </a>
        </div>
      </div>
    </section>
  );
}
