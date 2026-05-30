import { useState } from "react";
import { useListCars } from "@workspace/api-client-react";
import CarCard from "./CarCard";
import CarModal from "./CarModal";
import BookingModal from "./BookingModal";
import type { Car } from "@/types";

const categories = [
  { value: "", label: "Вся коллекция" },
  { value: "sedan", label: "Седан" },
  { value: "hatchback", label: "Хэтчбек" },
  { value: "convertible", label: "Кабриолет" },
  { value: "minivan", label: "Минивэн" },
];

export default function CarsSection() {
  const [category, setCategory] = useState("");
  const [viewCar, setViewCar] = useState<Car | null>(null);
  const [bookCar, setBookCar] = useState<Car | null>(null);

  const { data: cars, isLoading } = useListCars(
    category ? { category } : {},
    { query: { queryKey: ["cars", category] } }
  );

  return (
    <section id="catalog" className="py-24 lg:py-36" style={{ background: "#090c14" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-divider" />
              <span className="text-xs tracking-widest uppercase font-light" style={{ color: "#b8892a", letterSpacing: "0.2em" }}>
                Автопарк
              </span>
            </div>
            <h2
              className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight"
              style={{ color: "#f7f4ef", letterSpacing: "-0.01em" }}
            >
              Эксклюзивная<br />
              <span style={{ color: "#c9a040" }}>Коллекция</span>
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = category === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className="px-5 py-2 text-xs tracking-widest uppercase font-light transition-all duration-300"
                  style={{
                    background: active ? "rgba(184,137,42,0.15)" : "transparent",
                    border: `1px solid ${active ? "rgba(184,137,42,0.5)" : "rgba(194,194,198,0.15)"}`,
                    color: active ? "#c9a040" : "rgba(194,194,198,0.45)",
                    letterSpacing: "0.1em",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(184,137,42,0.3)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(194,194,198,0.8)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(194,194,198,0.15)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(194,194,198,0.45)";
                    }
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px"
            style={{ background: "rgba(184,137,42,0.06)" }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: "#0d1018", height: "380px" }} />
            ))}
          </div>
        ) : Array.isArray(cars) && cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px"
            style={{ background: "rgba(184,137,42,0.08)" }}>
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onBook={(c) => setBookCar(c)}
                onView={(c) => setViewCar(c)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24" style={{ color: "rgba(194,194,198,0.3)" }}>
            <p className="font-serif text-lg">Автомобили не найдены</p>
          </div>
        )}
      </div>

      {viewCar && (
        <CarModal car={viewCar} onClose={() => setViewCar(null)} onBook={(c) => { setViewCar(null); setBookCar(c); }} />
      )}
      {bookCar && (
        <BookingModal car={bookCar} onClose={() => setBookCar(null)} />
      )}
    </section>
  );
}
