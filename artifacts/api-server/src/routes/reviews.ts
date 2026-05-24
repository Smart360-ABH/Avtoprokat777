import { Router } from "express";
import { db, reviewsTable } from "@workspace/db";
import { ListReviewsResponse } from "@workspace/api-zod";

const router = Router();

const MOCK_REVIEWS = [
  { id: 1, author: "Алексей", text: "Отличный сервис, машина была в идеальном состоянии!", rating: 5, date: "2024-05-15", avatarUrl: null },
  { id: 2, author: "Мария", text: "Очень удобно, привезли машину прямо к отелю.", rating: 5, date: "2024-05-10", avatarUrl: null },
  { id: 3, author: "Сергей", text: "Хорошие цены и вежливый персонал.", rating: 4, date: "2024-05-01", avatarUrl: null },
];

router.get("/reviews", async (req, res): Promise<void> => {
  let reviews;
  try {
    reviews = await db.select().from(reviewsTable);
  } catch (err) {
    console.warn("Database unavailable, using mock reviews");
    reviews = MOCK_REVIEWS;
  }
  res.json(ListReviewsResponse.parse(reviews));
});

export default router;
