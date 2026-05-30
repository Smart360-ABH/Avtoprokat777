import { Router } from "express";
import { db, branchesTable } from "@workspace/db";
import { ListBranchesResponse } from "@workspace/api-zod";

const router = Router();

const ORDER_PHONE = "+7 (940) 993-84-97";

const MOCK_BRANCHES = [
  { id: 1, name: "Новый Афон", address: "ул. Харазия", phone: ORDER_PHONE, city: "Новый Афон", workingHours: "08:00 - 21:00", mapUrl: "https://yandex.ru/maps/?pt=40.812557,43.085066&z=16&l=map", lat: 43.085066, lng: 40.812557 },
  { id: 2, name: "Гагра", address: "ул. Адыгаа", phone: ORDER_PHONE, city: "Гагра", workingHours: "08:00 - 21:00", mapUrl: "https://yandex.ru/maps/?pt=40.268407,43.281321&z=16&l=map", lat: 43.281321, lng: 40.268407 },
  { id: 3, name: "Гудаута", address: "ул. Маргания, 3", phone: ORDER_PHONE, city: "Гудаута", workingHours: "08:00 - 21:00", mapUrl: "https://yandex.ru/maps/?pt=40.634209,43.100905&z=16&l=map", lat: 43.100905, lng: 40.634209 },
];

router.get("/branches", async (req, res): Promise<void> => {
  let branches;
  try {
    branches = await db.select().from(branchesTable);
  } catch (err) {
    console.warn("Database unavailable, using mock branches");
    branches = MOCK_BRANCHES;
  }
  res.json(ListBranchesResponse.parse(branches));
});

export default router;
