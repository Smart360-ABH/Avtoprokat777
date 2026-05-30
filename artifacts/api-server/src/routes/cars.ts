import { Router } from "express";
import { db, carsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { ListCarsQueryParams, ListCarsResponse, ListPopularCarsResponse, GetCarParams, GetCarResponse } from "@workspace/api-zod";
import { MOCK_CARS } from "../data/mock-cars";

const router = Router();

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
