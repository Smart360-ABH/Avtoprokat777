import { Router } from "express";
import { db, carsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { ListCarsQueryParams, ListCarsResponse, ListPopularCarsResponse, GetCarParams, GetCarResponse } from "@workspace/api-zod";

const router = Router();

const MOCK_CARS = [
  { id: 1, name: "Mercedes-Benz S-Class", category: "sedan", pricePerDay: 15000, description: "Премиальный седан для максимального комфорта", seats: 5, transmission: "автомат", year: 2023, popular: true, available: true },
  { id: 2, name: "BMW X5", category: "crossover", pricePerDay: 12000, description: "Мощный кроссовер для любых дорог", seats: 5, transmission: "автомат", year: 2022, popular: true, available: true },
  { id: 3, name: "Audi A6", category: "sedan", pricePerDay: 9000, description: "Стильный и технологичный седан", seats: 5, transmission: "автомат", year: 2021, popular: false, available: true },
  { id: 4, name: "Porsche 911", category: "convertible", pricePerDay: 25000, description: "Легендарный спорткар", seats: 2, transmission: "робот", year: 2023, popular: true, available: true },
];

router.get("/cars", async (req, res): Promise<void> => {
  const parsed = ListCarsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { category } = parsed.data;
  let cars;
  try {
    if (category) {
      cars = await db.select().from(carsTable).where(eq(carsTable.category, category));
    } else {
      cars = await db.select().from(carsTable);
    }
  } catch (err) {
    console.warn("Database unavailable, using mock cars");
    cars = category ? MOCK_CARS.filter(c => c.category === category) : MOCK_CARS;
  }

  res.json(ListCarsResponse.parse(cars));
});

router.get("/cars/popular", async (req, res): Promise<void> => {
  let cars;
  try {
    cars = await db.select().from(carsTable).where(eq(carsTable.popular, true));
  } catch (err) {
    console.warn("Database unavailable, using mock popular cars");
    cars = MOCK_CARS.filter(c => c.popular);
  }
  res.json(ListPopularCarsResponse.parse(cars));
});

router.get("/cars/:id", async (req, res): Promise<void> => {
  const parsed = GetCarParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  let car;
  try {
    const cars = await db.select().from(carsTable).where(eq(carsTable.id, parsed.data.id));
    car = cars[0];
  } catch (err) {
    console.warn("Database unavailable, using mock car detail");
    car = MOCK_CARS.find(c => c.id === parsed.data.id);
  }

  if (!car) {
    res.status(404).json({ error: "Car not found" });
    return;
  }

  res.json(GetCarResponse.parse(car));
});

export default router;
