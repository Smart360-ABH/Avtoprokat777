import { useEffect } from "react";
import type { Car } from "@/types";
import toyotaSoarerImg from "@/assets/toyota-soarer.png";
import mercedesSlkImg from "@/assets/mercedes-slk320.png";
import toyotaAlphardImg from "@/assets/toyota-alphard.png";
import toyotaMarkXImg from "@/assets/toyota-mark-x.png";
import hondaFitImg from "@/assets/honda-fit-rs.png";

const carImages: Record<string, string> = {
  "toyota soarer": toyotaSoarerImg,
  "mercedes-benz slk 320": mercedesSlkImg,
  "toyota alphard": toyotaAlphardImg,
  "toyota mark x premium": toyotaMarkXImg,
  "honda fit rs": hondaFitImg,
};

function getCarImage(car: Car): string {
  const key = car.name.toLowerCase();
  for (const [k, v] of Object.entries(carImages)) {
    if (key.includes(k.split(" ")[0]) && key.includes(k.split(" ").slice(-1)[0])) return v;
  }
  for (const [k, v] of Object.entries(carImages)) {
    if (key.includes(k.split(" ")[0])) return v;
  }
  return toyotaSoarerImg;
}

interface Props {
  car: Car;
  onClose: () => void;
  onBook: (car: Car) => void;
}

export default function CarModal({ car, onClose, onBook }: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  const img = car.imageUrl || getCarImage(car);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="aspect-[16/9] overflow-hidden rounded-t-2xl">
          <img src={img} alt={car.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-serif font-bold text-2xl text-foreground">{car.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{car.year} г.</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary font-serif">{car.pricePerDay.toLocaleString("ru-RU")} ₽</div>
              <div className="text-muted-foreground text-sm">в сутки</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-5 p-4 bg-gray-50 rounded-xl">
            {car.seats && (
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{car.seats}</div>
                <div className="text-xs text-muted-foreground">мест</div>
              </div>
            )}
            {car.transmission && (
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{car.transmission}</div>
                <div className="text-xs text-muted-foreground">коробка</div>
              </div>
            )}
            {car.year && (
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{car.year}</div>
                <div className="text-xs text-muted-foreground">год</div>
              </div>
            )}
          </div>

          {car.description && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{car.description}</p>
          )}

          <button
            onClick={() => onBook(car)}
            className="w-full bg-primary hover:bg-amber-500 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-primary/30"
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
}
