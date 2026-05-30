import { useEffect, useState } from "react";
import type { Car } from "@/types";
import { resolveCarGallery } from "@/lib/car-image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Props {
  car: Car;
  onClose: () => void;
  onBook: (car: Car) => void;
}

export default function CarModal({ car, onClose, onBook }: Props) {
  const gallery = resolveCarGallery(car);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  useEffect(() => {
    setActiveIndex(0);
    carouselApi?.scrollTo(0, true);
  }, [car.id, carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => setActiveIndex(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    onSelect();
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/55 text-white flex items-center justify-center transition-colors"
          aria-label="Закрыть"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-4 pb-0">
          <Carousel setApi={setCarouselApi} className="relative">
            <CarouselContent className="ml-0">
              {gallery.map((src, index) => (
                <CarouselItem key={`${car.id}-${index}`} className="pl-0">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={src}
                      alt={`${car.name} — фото ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {gallery.length > 1 && (
              <>
                <CarouselPrevious className="left-3 bg-white/90 border-0 shadow-md hover:bg-white" />
                <CarouselNext className="right-3 bg-white/90 border-0 shadow-md hover:bg-white" />
              </>
            )}
          </Carousel>

          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {gallery.map((src, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={`thumb-${car.id}-${index}`}
                    type="button"
                    onClick={() => carouselApi?.scrollTo(index)}
                    className="shrink-0 rounded-lg overflow-hidden border-2 transition-all"
                    style={{
                      width: 72,
                      height: 52,
                      borderColor: active ? "#c9a040" : "transparent",
                      opacity: active ? 1 : 0.65,
                    }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-6 pt-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h2 className="font-serif font-bold text-2xl text-foreground">{car.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{car.year} г.</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-bold text-primary font-serif">
                {car.pricePerDay.toLocaleString("ru-RU")} ₽
              </div>
              <div className="text-muted-foreground text-sm">в сутки</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5 p-4 bg-gray-50 rounded-xl">
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
            {car.steeringWheel && (
              <div className="text-center">
                <div className="text-lg font-bold text-foreground capitalize">{car.steeringWheel}</div>
                <div className="text-xs text-muted-foreground">руль</div>
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
