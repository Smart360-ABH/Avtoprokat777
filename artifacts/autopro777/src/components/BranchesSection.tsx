import { useListBranches } from "@workspace/api-client-react";

export default function BranchesSection() {
  const { data: branches, isLoading } = useListBranches();

  return (
    <section id="branches" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-primary text-sm font-semibold">Где нас найти</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4">
            Наши филиалы
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Три точки выдачи в ключевых городах Абхазии. Возврат автомобиля в любом из них.
          </p>
        </div>

        {/* Branch cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 animate-pulse h-56" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Array.isArray(branches) && branches.map((branch) => (
              <div key={branch.id} className="group bg-white rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>

                <h3 className="font-serif font-bold text-xl text-foreground mb-1">{branch.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{branch.address}</p>

                <div className="space-y-2 mb-5">
                  <a href={`tel:${branch.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {branch.phone}
                  </a>
                  {branch.workingHours && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {branch.workingHours}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {branch.mapUrl && (
                    <a
                      href={branch.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-sm font-medium py-2 rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      Открыть в карте
                    </a>
                  )}
                  <a
                    href={`https://yandex.ru/maps/?rtext=~${branch.lat},${branch.lng}&rtt=auto`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm font-medium py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    Маршрут
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Yandex Maps iframe */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=40.565&z=10&pt=40.8017,43.0892,pm2rdl~40.2667,43.3228,pm2rdl~40.6283,43.1017,pm2rdl"
            width="100%"
            height="400"
            className="block"
            style={{ border: 0 }}
            title="Филиалы Автопрокат 777"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
