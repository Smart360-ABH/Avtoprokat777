/**
 * Прайс автопарка (₽/сутки).
 */
import { CAR_PHOTO_URL_OVERRIDES } from "./car-photo-urls";
import { CAR_GALLERIES } from "./car-galleries";

const local = (file: string) => `/cars/${file}`;

const BASE_CARS = [
  {
    id: 1,
    name: "Toyota Mark X",
    category: "sedan",
    pricePerDay: 3000,
    description:
      "Этот седан сочетает комфорт, статус и надёжность — отличный выбор для поездок по Абхазии.",
    imageUrl: CAR_PHOTO_URL_OVERRIDES[1] ?? local("toyota-mark-x.jpeg"),
    steeringWheel: "левый",
    seats: 5,
    transmission: "автомат",
    year: 2012,
    popular: true,
    available: true,
  },
  {
    id: 2,
    name: "Honda Fit RS",
    category: "hatchback",
    pricePerDay: 2500,
    description:
      "Компактный хэтчбек с правым рулём — экономичный и манёвренный для города и коротких маршрутов.",
    imageUrl: CAR_PHOTO_URL_OVERRIDES[2] ?? local("honda-fit-rs.jpeg"),
    steeringWheel: "правый",
    seats: 5,
    transmission: "автомат",
    year: 2020,
    popular: true,
    available: true,
  },
  {
    id: 3,
    name: "Hyundai Elantra",
    category: "sedan",
    pricePerDay: 3000,
    description:
      "Идеальный баланс цены и комфорта — современный седан для деловых поездок и отдыха.",
    imageUrl: CAR_PHOTO_URL_OVERRIDES[3] ?? local("hyundai-elantra.jpeg"),
    steeringWheel: "левый",
    seats: 5,
    transmission: "автомат",
    year: 2019,
    popular: true,
    available: true,
  },
  {
    id: 4,
    name: "Lexus IS 2.5",
    category: "sedan",
    pricePerDay: 4000,
    description:
      "Премиальный седан с левым рулём — статус, комфорт и уверенность на любых дорогах.",
    imageUrl: CAR_PHOTO_URL_OVERRIDES[4] ?? local("lexus-is-25.jpeg"),
    steeringWheel: "левый",
    seats: 5,
    transmission: "автомат",
    year: 2018,
    popular: true,
    available: true,
  },
  {
    id: 5,
    name: "Toyota Alphard 7 мест",
    category: "minivan",
    pricePerDay: 4500,
    description:
      "Просторный минивэн на 7 мест, правый руль — серебристый кузов, идеален для семьи и компании.",
    imageUrl: CAR_PHOTO_URL_OVERRIDES[5] ?? local("alphard-silver.jpeg"),
    steeringWheel: "правый",
    seats: 7,
    transmission: "автомат",
    year: 2015,
    popular: true,
    available: true,
  },
  {
    id: 6,
    name: "Mercedes-Benz SLK 320",
    category: "convertible",
    pricePerDay: 5000,
    description:
      "Ощутите свободу открытого неба — элегантный кабриолет для незабываемых поездок.",
    imageUrl: CAR_PHOTO_URL_OVERRIDES[6] ?? local("mercedes-slk320.jpeg"),
    steeringWheel: "левый",
    seats: 2,
    transmission: "автомат",
    year: 2005,
    popular: true,
    available: true,
  },
  {
    id: 7,
    name: "Toyota Alphard 7 мест",
    category: "minivan",
    pricePerDay: 4500,
    description:
      "Премиальный минивэн на 7 мест, правый руль — белый кузов, максимум комфорта для путешествий.",
    imageUrl: CAR_PHOTO_URL_OVERRIDES[7] ?? local("alphard-white.jpeg"),
    steeringWheel: "правый",
    seats: 7,
    transmission: "автомат",
    year: 2015,
    popular: true,
    available: true,
  },
  {
    id: 8,
    name: "Toyota Soarer",
    category: "convertible",
    pricePerDay: 6000,
    description:
      "Премиальный спортивный купе — для тех, кто ценит скорость, стиль и эстетику.",
    imageUrl: CAR_PHOTO_URL_OVERRIDES[8] ?? local("toyota-soarer.jpeg"),
    steeringWheel: "правый",
    seats: 4,
    transmission: "автомат",
    year: 1995,
    popular: true,
    available: true,
  },
];

export const MOCK_CARS = BASE_CARS.map((car) => ({
  ...car,
  images: CAR_GALLERIES[car.id] ?? [car.imageUrl!],
}));
