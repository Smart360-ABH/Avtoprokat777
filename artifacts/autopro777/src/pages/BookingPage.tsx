import RentalTermsSection from "@/components/RentalTermsSection";
import BookingSection from "@/components/BookingSection";
import FAQSection from "@/components/FAQSection";

export default function BookingPage() {
  return (
    <div className="pt-20">
      <RentalTermsSection />
      <BookingSection />
      <FAQSection />
    </div>
  );
}
