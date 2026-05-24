import { useState } from "react";
import { useListReviews } from "@workspace/api-client-react";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-primary" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const { data: reviews, isLoading } = useListReviews();
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = reviews?.length ?? 0;
  const visible = 3;
  const maxStart = Math.max(0, total - visible);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(maxStart, i + 1));

  const shown = reviews?.slice(currentIndex, currentIndex + visible) ?? [];

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-primary text-sm font-semibold">Отзывы</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-2">
              Что говорят клиенты
            </h2>
            <div className="flex items-center gap-3">
              <Stars rating={5} />
              <span className="text-muted-foreground text-sm">
                {total} отзывов · Средняя оценка 5.0
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground/70 hover:border-primary/40 hover:text-primary disabled:opacity-30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxStart}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground/70 hover:border-primary/40 hover:text-primary disabled:opacity-30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="bg-gray-50 rounded-2xl p-6 h-48 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shown.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{review.author}</div>
                      {review.date && (
                        <div className="text-xs text-muted-foreground">
                          {new Date(review.date).toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}
                        </div>
                      )}
                    </div>
                  </div>
                  <Stars rating={review.rating} />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Dots */}
        {total > visible && (
          <div className="flex justify-center gap-1.5 mt-8">
            {Array.from({ length: maxStart + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-full transition-all duration-200 ${
                  i === currentIndex ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-gray-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
