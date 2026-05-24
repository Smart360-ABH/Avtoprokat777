import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";
import { CreateBookingBody } from "@workspace/api-zod";

const router = Router();

router.post("/bookings", async (req, res): Promise<void> => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid booking request body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, phone, carId, carName, startDate, endDate, city, comment, withDriver } = parsed.data;

  const inserted = await db.insert(bookingsTable).values({
    name,
    phone,
    carId: carId ?? null,
    carName: carName ?? null,
    startDate,
    endDate: endDate ?? null,
    city,
    comment: comment ?? null,
    withDriver: withDriver ?? false,
  }).returning();

  const booking = inserted[0];
  req.log.info({ bookingId: booking.id }, "New booking created");

  res.status(201).json({
    ...booking,
    createdAt: booking.createdAt.toISOString(),
  });
});

export default router;
