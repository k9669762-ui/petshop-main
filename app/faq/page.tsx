import { InfoPage } from "../info-page";
import { faqs } from "@/lib/data";

export default function FAQPage() {
  return (
    <InfoPage
      title="Frequently Asked Questions"
      description="Quick answers about orders, shipping, live arrival, payments, and support."
      sections={faqs.map((faq) => ({
        heading: faq.question,
        body: faq.answer,
      }))}
    />
  );
}
