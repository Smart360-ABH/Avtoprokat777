const principles = [
  {
    num: "01",
    title: "Мгновенный отклик",
    desc: "Ваш персональный консьерж-сервис готов к ответу в течение 15 минут — в любое время суток.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Безупречное состояние",
    desc: "Премиум-детейлинг и технический осмотр перед каждым использованием. Только безупречные автомобили.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Три точки выдачи",
    desc: "Новый Афон, Гагра, Гудаута. Возврат в любом из филиалов — по вашему маршруту, а не нашему удобству.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Экспертный подбор",
    desc: "Мы знаем дороги Абхазии. Поможем выбрать автомобиль точно под ваш маршрут и запросы.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Прозрачный договор",
    desc: "Никаких скрытых платежей. Цена, залог, условия возврата — всё зафиксировано письменно заранее.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Доставка к вам",
    desc: "Привезём автомобиль к вашей гостинице, вилле или месту прибытия. Путешествие начинается с порога.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

export default function AdvantagesSection() {
  return (
    <section className="py-24 lg:py-36 bg-marble">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-divider" />
            <span className="text-xs tracking-widest uppercase font-light" style={{ color: "#b8892a", letterSpacing: "0.2em" }}>
              Наш стандарт
            </span>
          </div>
          <h2
            className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-xl"
            style={{ color: "#090c14", letterSpacing: "-0.01em" }}
          >
            Принципы<br />
            <span style={{ color: "#b8892a" }}>Безупречности</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "rgba(184,137,42,0.1)", border: "1px solid rgba(184,137,42,0.1)" }}>
          {principles.map((p, i) => (
            <div
              key={i}
              className="group p-8 lg:p-10 transition-all duration-500 cursor-default"
              style={{ background: "rgba(245,242,236,0.97)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(9,12,20,0.96)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(245,242,236,0.97)";
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className="transition-colors duration-500"
                  style={{ color: "#b8892a" }}
                >
                  {p.icon}
                </div>
                <span
                  className="font-serif text-xs font-light transition-colors duration-500"
                  style={{ color: "rgba(184,137,42,0.4)" }}
                >
                  {p.num}
                </span>
              </div>
              <h3
                className="font-serif font-semibold text-lg mb-3 transition-colors duration-500"
                style={{ color: "#090c14", letterSpacing: "0.01em" }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm leading-relaxed font-light transition-colors duration-500"
                style={{ color: "rgba(34,37,58,0.6)" }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="tel:+79409938497"
            className="btn-luxury px-10 py-4 rounded-sm inline-block"
          >
            Заказать консультацию
          </a>
        </div>
      </div>
    </section>
  );
}
