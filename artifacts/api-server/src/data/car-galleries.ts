const gallery = (carId: number, ...files: string[]) =>
  files.map((file) => `/cars/gallery/${carId}/${file}`);

/** Галереи фото по id автомобиля */
export const CAR_GALLERIES: Record<number, string[]> = {
  2: gallery(2, "01.jpeg", "02.jpeg", "03.jpeg"),
  3: gallery(
    3,
    "01.jpeg",
    "02.jpeg",
    "03.jpeg",
    "04.jpeg",
    "05.jpeg",
    "06.jpeg",
    "07.jpeg",
    "08.jpeg",
  ),
  4: gallery(4, "01.jpeg", "02.jpeg", "03.jpeg", "04.jpeg"),
  5: gallery(5, "01.jpeg", "02.jpeg", "03.jpeg"),
  7: gallery(7, "01.jpeg", "02.jpeg", "03.jpeg", "04.jpeg"),
};
