import type { Car } from "@/types";
import toyotaSoarerImg from "@/assets/toyota-soarer.png";
import mercedesSlkImg from "@/assets/mercedes-slk320.png";
import toyotaAlphardImg from "@/assets/toyota-alphard.png";
import toyotaMarkXImg from "@/assets/toyota-mark-x.png";
import hondaFitImg from "@/assets/honda-fit-rs.png";

const fallbackByName: Record<string, string> = {
  "toyota soarer": toyotaSoarerImg,
  mercedes: mercedesSlkImg,
  slk: mercedesSlkImg,
  alphard: toyotaAlphardImg,
  "mark x": toyotaMarkXImg,
  "honda fit": hondaFitImg,
  elantra: toyotaMarkXImg,
  lexus: toyotaMarkXImg,
};

/** URL из API (таблица/БД) или локальный fallback для dev-сборки */
export function resolveCarImage(car: Car): string {
  if (car.imageUrl) return car.imageUrl;
  if (car.images?.length) return car.images[0];

  const key = car.name.toLowerCase();
  for (const [fragment, src] of Object.entries(fallbackByName)) {
    if (key.includes(fragment)) return src;
  }
  return toyotaSoarerImg;
}

export function resolveCarGallery(car: Car): string[] {
  if (car.images?.length) return car.images;
  return [resolveCarImage(car)];
}
