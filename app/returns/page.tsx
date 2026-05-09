import { InfoPage } from "../info-page";

export default function ReturnsPage() {
  return (
    <InfoPage
      title="Returns"
      description="How returns, exchanges, and live arrival claims are handled."
      sections={[
        {
          heading: "Product returns",
          body: "Unused accessories and supplies can be returned within 7 days in original condition with packaging and invoice details.",
        },
        {
          heading: "Live arrival guarantee",
          body: "For live fish concerns, contact support within 2 hours of delivery with clear photos or video so we can review a replacement or refund.",
        },
        {
          heading: "Refund processing",
          body: "Approved refunds are processed to the original payment method. Cash on delivery refunds are coordinated by support.",
        },
      ]}
    />
  );
}
