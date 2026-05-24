import type { Car } from "@/types";
import toyotaSoarerImg from "@/assets/toyota-soarer.png";
import mercedesSlkImg from "@/assets/mercedes-slk320.png";
import toyotaAlphardImg from "@/assets/toyota-alphard.png";
import toyotaMarkXImg from "@/assets/toyota-mark-x.png";
import hondaFitImg from "@/assets/honda-fit-rs.png";

const carImages: Record<string, string> = {
  "toyota soarer": toyotaSoarerImg,
  "mercedes": mercedesSlkImg,
  "alphard": toyotaAlphardImg,
  "mark x": toyotaMarkXImg,
  "honda fit": hondaFitImg,
};

function getCarImage(car: Car): string {
  const key = car.name.toLowerCase();
  for (const [k, v] of Object.entries(carImages)) {
    if (key.includes(k)) return v;
  }
  return toyotaSoarerImg;
}

const categoryLabels: Record<string, string> = {
  sedan: "Представительский седан",
  crossover: "Элитный кроссовер",
  minivan: "Премиум минивэн",
  convertible: "Элегантный кабриолет",
  economy: "Эконом",
  sport: "Спортивный",
};

interface Props {
  car: Car;
  onBook: (car: Car) => void;
  onView?: (car: Car) => void;
}

export default function CarCard({ car, onBook, onView }: Props) {
  const img = car.imageUrl || getCarImage(car);

  return (
    <div
      className="luxury-card group overflow-hidden"
      style={{
        background: "#0d1018",
        border: "1px solid rgba(184,137,42,0.1)",
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ aspectRatio: "16/10" }}
        onClick={() => onView?.(car)}
      >
        <img
          src={img}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.9) saturate(0.85)" }}
        />
        {/* Dark overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{ background: "rgba(9,12,20,0.3)" }}
        />
        {/* Category badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className="text-xs tracking-widest uppercase font-light px-3 py-1"
            style={{
              background: "rgba(9,12,20,0.7)",
              backdropFilter: "blur(8px)",
              color: "rgba(194,194,198,0.8)",
              border: "1px solid rgba(184,137,42,0.2)",
              letterSpacing: "0.12em",
            }}
          >
            {categoryLabels[car.category] ?? car.category}
          </span>
        </div>
        {car.popular && (
          <div className="absolute top-4 right-4">
            <span
              className="text-xs tracking-widest uppercase font-medium px-3 py-1"
              style={{
                background: "rgba(184,137,42,0.85)",
                color: "#090c14",
                letterSpacing: "0.1em",
              }}
            >
              Выбор экспертов
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="font-serif font-semibold text-lg mb-1 cursor-pointer transition-colors duration-300 group-hover:text-yellow-400"
          style={{ color: "#f7f4ef", letterSpacing: "0.01em" }}
          onClick={() => onView?.(car)}
        >
          {car.name}
        </h3>

        {/* Specs */}
        <div className="flex flex-wrap gap-4 mb-4" style={{ marginTop: "0.5rem" }}>
          {car.seats && (
            <span className="text-xs tracking-wide flex items-center gap-1.5" style={{ color: "rgba(194,194,198,0.5)" }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {car.seats} мест
            </span>
          )}
          {car.transmission && (
            <span className="text-xs tracking-wide flex items-center gap-1.5" style={{ color: "rgba(194,194,198,0.5)" }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              {car.transmission}
            </span>
          )}
          {car.year && (
            <span className="text-xs tracking-wide" style={{ color: "rgba(194,194,198,0.5)" }}>
              {car.year}
            </span>
          )}
        </div>

        {car.description && (
          <p className="text-xs leading-relaxed mb-5 line-clamp-2 font-light" style={{ color: "rgba(194,194,198,0.45)" }}>
            {car.description}
          </p>
        )}

        {/* Price + CTA */}
        <div
          className="flex items-end justify-between pt-5"
          style={{ borderTop: "1px solid rgba(184,137,42,0.1)" }}
        >
          <div>
            <div
              className="font-serif font-bold leading-none"
              style={{
                fontSize: "1.75rem",
                color: "#c9a040",
              }}
            >
              {car.pricePerDay.toLocaleString("ru-RU")}
            </div>
            <div className="text-xs mt-1 tracking-widest uppercase" style={{ color: "rgba(194,194,198,0.35)" }}>
              ₽ / сутки
            </div>
          </div>
          <button
            onClick={() => onBook(car)}
            className="btn-luxury px-5 py-2.5 rounded-sm"
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
}
