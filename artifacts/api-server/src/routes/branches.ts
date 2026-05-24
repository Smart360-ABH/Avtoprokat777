import { Router } from "express";
import { db, branchesTable } from "@workspace/db";
import { ListBranchesResponse } from "@workspace/api-zod";

const router = Router();

const MOCK_BRANCHES = [
  { id: 1, name: "Новый Афон", address: "ул. Харазия", phone: "+7 (940) 111-22-33", city: "Новый Афон", workingHours: "08:00 - 21:00", mapUrl: "#", lat: 43.084, lng: 40.815 },
  { id: 2, name: "Гагра", address: "ул. Адыгаа", phone: "+7 (940) 444-55-66", city: "Гагра", workingHours: "08:00 - 21:00", mapUrl: "#", lat: 43.281, lng: 40.264 },
  { id: 3, name: "Гудаута", address: "ул. Маргания, 3", phone: "+7 (940) 777-88-99", city: "Гудаута", workingHours: "08:00 - 21:00", mapUrl: "#", lat: 43.102, lng: 40.627 },
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
