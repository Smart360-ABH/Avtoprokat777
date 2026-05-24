import { useState } from "react";
import { useListPopularCars } from "@workspace/api-client-react";
import CarCard from "./CarCard";
import CarModal from "./CarModal";
import BookingModal from "./BookingModal";
import type { Car } from "@/types";

export default function PopularCarsSection() {
  const { data: cars, isLoading } = useListPopularCars();
  const [viewCar, setViewCar] = useState<Car | null>(null);
  const [bookCar, setBookCar] = useState<Car | null>(null);

  if (!isLoading && (!Array.isArray(cars) || cars.length === 0)) return null;

  return (
    <section style={{ background: "#0f1218", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="gold-divider" />
            <span className="text-xs tracking-widest uppercase font-light" style={{ color: "#b8892a", letterSpacing: "0.2em" }}>
              Выбор экспертов
            </span>
          </div>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight" style={{ color: "#f7f4ef" }}>
            Особая<br />
            <span style={{ color: "#c9a040" }}>Рекомендация</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(184,137,42,0.06)" }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse" style={{ background: "#0d1018", height: "360px" }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(184,137,42,0.08)" }}>
            {cars?.map((car) => (
              <CarCard key={car.id} car={car} onBook={(c) => setBookCar(c)} onView={(c) => setViewCar(c)} />
            ))}
          </div>
        )}
      </div>

      {viewCar && (
        <CarModal car={viewCar} onClose={() => setViewCar(null)} onBook={(c) => { setViewCar(null); setBookCar(c); }} />
      )}
      {bookCar && <BookingModal car={bookCar} onClose={() => setBookCar(null)} />}
    </section>
  );
}
