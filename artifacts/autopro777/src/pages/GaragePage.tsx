import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "@/components/BookingModal";
import CarModal from "@/components/CarModal";
import type { Car } from "@/types";
import { useListCars } from "@workspace/api-client-react";
import { resolveCarImage } from "@/lib/car-image";

const CATEGORIES = [
  { value: "", label: "Все" },
  { value: "sedan", label: "Седан" },
  { value: "hatchback", label: "Хэтчбек" },
  { value: "convertible", label: "Кабриолет" },
  { value: "minivan", label: "Минивэн" },
];

const categoryColors: Record<string, string> = {
  "": "#f59e0b",
  sedan: "#3b82f6",
  hatchback: "#22c55e",
  convertible: "#ec4899",
  minivan: "#f97316",
};

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.88,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.88,
    filter: "blur(8px)",
  }),
};

const infoVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/* ─── Spotlight ─── */
function Spotlight({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top cone spotlight */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-10 w-[600px] h-[700px] opacity-30 transition-all duration-700"
        style={{
          background: `conic-gradient(from 265deg at 50% 0%, transparent 0%, ${color}55 5%, ${color}22 15%, transparent 20%)`,
        }}
      />
      {/* Floor glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 opacity-40 blur-2xl transition-all duration-700"
        style={{ background: `radial-gradient(ellipse, ${color}88 0%, transparent 70%)` }}
      />
      {/* Ambient side glow */}
      <div
        className="absolute inset-0 opacity-10 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${color} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

/* ─── Floor Grid ─── */
function FloorGrid() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(400px) rotateX(60deg) translateY(40px) scaleX(1.5)",
          transformOrigin: "bottom center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ─── Category Tabs ─── */
function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 justify-center flex-wrap px-4 py-4">
      {CATEGORIES.map((c) => {
        const isActive = c.value === active;
        const color = categoryColors[c.value] ?? "#f59e0b";
        return (
          <button
            key={c.value}
            onClick={() => onChange(c.value)}
            className="relative px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 overflow-hidden"
            style={{
              color: isActive ? "#000" : "rgba(255,255,255,0.5)",
              background: isActive ? color : "rgba(255,255,255,0.05)",
              boxShadow: isActive ? `0 0 20px ${color}80, 0 0 40px ${color}30` : "none",
              border: `1px solid ${isActive ? color : "rgba(255,255,255,0.08)"}`,
            }}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Car Counter ─── */
function CarDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-1.5 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 20 : 6,
            height: 6,
            background:
              i === current ? "#f59e0b" : "rgba(255,255,255,0.2)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function GaragePage() {
  const [category, setCategory] = useState("");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [bookCar, setBookCar] = useState<Car | null>(null);
  const [viewCar, setViewCar] = useState<Car | null>(null);
  const touchStart = useRef<number | null>(null);

  const { data: allCars = [], isLoading } = useListCars(
    category ? { category } : {},
    { query: { queryKey: ["cars", category] } }
  );

  const cars = allCars;
  const car = cars[index] ?? null;
  const accent = car
    ? categoryColors[car.category ?? ""] ?? "#f59e0b"
    : "#f59e0b";

  const go = useCallback(
    (dir: number) => {
      if (!cars.length) return;
      setDirection(dir);
      setIndex((i) => (i + dir + cars.length) % cars.length);
    },
    [cars.length]
  );

  /* Category change → reset index */
  useEffect(() => {
    setIndex(0);
    setDirection(1);
  }, [category]);

  /* Keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  /* Touch */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col pt-16 lg:pt-20">
      {/* Page header */}
      <div className="text-center pt-8 pb-2 px-4">
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-3 border text-xs font-bold uppercase tracking-widest"
          style={{
            background: `${accent}18`,
            borderColor: `${accent}40`,
            color: accent,
            boxShadow: `0 0 20px ${accent}20`,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
          Выберите автомобиль
        </div>
        <h1
          className="font-bold text-3xl sm:text-5xl tracking-widest uppercase mb-1"
          style={{
            fontFamily: "'Russo One', sans-serif",
            textShadow: `0 0 40px ${accent}60`,
          }}
        >
          Гараж
        </h1>
        <p className="text-white/30 text-sm">Автопрокат 777 · Абхазия</p>
      </div>

      {/* Category tabs */}
      <CategoryTabs active={category} onChange={setCategory} />

      {/* Main scene */}
      <div
        className="flex-1 relative flex flex-col items-center justify-center overflow-hidden select-none"
        style={{ minHeight: "60vh" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Static garage atmosphere */}
        <div className="absolute inset-0">
          {/* Deep dark gradient */}
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse 120% 80% at 50% 30%, ${accent}10 0%, transparent 60%), 
                           linear-gradient(180deg, #080a10 0%, #0d1117 50%, #060810 100%)`,
            }}
          />
          {/* Wall panels */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 120px)`,
            }}
          />
          {/* Top arch glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 opacity-20 blur-3xl transition-colors duration-700"
            style={{ background: accent }}
          />
        </div>

        {/* Spotlight */}
        <Spotlight color={accent} />

        {/* Floor */}
        <FloorGrid />

        {/* ── Car image area ── */}
        {isLoading ? (
          <div className="relative z-10 flex items-center justify-center h-72">
            <div className="flex flex-col items-center gap-4 text-white/30">
              <div
                className="w-16 h-16 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: `${accent}50`, borderTopColor: "transparent" }}
              />
              <span className="text-sm tracking-widest uppercase">Загрузка...</span>
            </div>
          </div>
        ) : cars.length === 0 ? (
          <div className="relative z-10 text-center py-20 text-white/30">
            <div className="text-5xl mb-4">🚗</div>
            <p className="text-lg tracking-wide">Автомобилей нет</p>
          </div>
        ) : (
          <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
            {/* Car image */}
            <div className="relative w-full flex justify-center items-end" style={{ height: "280px" }}>
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={car?.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0 flex items-end justify-center"
                >
                  {car && (
                    <>
                      {/* Car shadow/reflection */}
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-12 blur-xl opacity-50"
                        style={{ background: `radial-gradient(ellipse, ${accent}88 0%, transparent 70%)` }}
                      />
                      <img
                        src={resolveCarImage(car)}
                        alt={car.name}
                        className="relative max-h-full max-w-full object-contain drop-shadow-2xl"
                        style={{
                          filter: `drop-shadow(0 20px 40px ${accent}40) drop-shadow(0 4px 20px rgba(0,0,0,0.8))`,
                          maxHeight: "240px",
                        }}
                        draggable={false}
                      />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Car info panel */}
            <AnimatePresence mode="wait">
              {car && (
                <motion.div
                  key={car.id}
                  variants={infoVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="mt-6 w-full max-w-2xl"
                >
                  {/* Glass panel */}
                  <div
                    className="rounded-2xl p-6 relative overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(20px)",
                      border: `1px solid rgba(255,255,255,0.08)`,
                      boxShadow: `0 0 60px ${accent}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
                    }}
                  >
                    {/* Accent top stripe */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                    />

                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                      {/* Name & price */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                          <h2
                            className="font-bold text-2xl sm:text-3xl text-white tracking-wide truncate"
                            style={{ fontFamily: "'Russo One', sans-serif" }}
                          >
                            {car.name}
                          </h2>
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded uppercase tracking-widest flex-shrink-0"
                            style={{ background: `${accent}25`, color: accent, border: `1px solid ${accent}40` }}
                          >
                            {car.year ?? ""}
                          </span>
                        </div>

                        {/* Specs row */}
                        <div className="flex flex-wrap gap-4 mb-3 text-sm">
                          {car.seats && (
                            <div className="flex items-center gap-1.5 text-white/60">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span>{car.seats} мест</span>
                            </div>
                          )}
                          {car.transmission && (
                            <div className="flex items-center gap-1.5 text-white/60">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                              </svg>
                              <span>{car.transmission}</span>
                            </div>
                          )}
                          {car.steeringWheel && (
                            <div className="flex items-center gap-1.5 text-white/60">
                              <span>{car.steeringWheel} руль</span>
                            </div>
                          )}
                          {(car as any).fuelType && (
                            <div className="flex items-center gap-1.5 text-white/60">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              <span>{(car as any).fuelType}</span>
                            </div>
                          )}
                        </div>

                        {car.description && (
                          <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{car.description}</p>
                        )}
                      </div>

                      {/* Price + buttons */}
                      <div className="flex flex-col items-start sm:items-end gap-3 flex-shrink-0">
                        <div className="text-right">
                          <div
                            className="text-3xl font-black"
                            style={{
                              fontFamily: "'Russo One', sans-serif",
                              color: accent,
                              textShadow: `0 0 20px ${accent}80`,
                            }}
                          >
                            {car.pricePerDay.toLocaleString("ru-RU")} ₽
                          </div>
                          <div className="text-white/30 text-xs">в сутки</div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setBookCar(car)}
                            className="px-5 py-2.5 rounded-xl font-bold text-sm text-black transition-all duration-300 hover:scale-105"
                            style={{
                              background: accent,
                              boxShadow: `0 4px 20px ${accent}50`,
                            }}
                          >
                            Забронировать
                          </button>
                          <button
                            type="button"
                            onClick={() => setViewCar(car)}
                            className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ── Nav arrows ── */}
        {cars.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: `0 0 20px ${accent}20`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${accent}20`;
                (e.currentTarget as HTMLElement).style.borderColor = `${accent}60`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => go(1)}
              className="absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: `0 0 20px ${accent}20`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${accent}20`;
                (e.currentTarget as HTMLElement).style.borderColor = `${accent}60`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots + counter */}
      {cars.length > 1 && (
        <div className="py-4 flex flex-col items-center gap-2">
          <CarDots total={cars.length} current={index} />
          <p className="text-white/20 text-xs tracking-widest uppercase">
            {index + 1} / {cars.length}
          </p>
        </div>
      )}

      {/* Keyboard hint */}
      <div className="pb-6 text-center text-white/15 text-xs tracking-widest hidden sm:block">
        ← → клавиши · свайп на мобильном
      </div>

      {/* Booking modal */}
      {viewCar && (
        <CarModal
          car={viewCar}
          onClose={() => setViewCar(null)}
          onBook={(c) => {
            setViewCar(null);
            setBookCar(c);
          }}
        />
      )}
      {bookCar && (
        <BookingModal car={bookCar} onClose={() => setBookCar(null)} />
      )}
    </div>
  );
}
