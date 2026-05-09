import { InfoPage } from "../info-page";

export default function RefundsPage() {
  return (
    <InfoPage
      title="Refund Policy"
      description="How refunds and order adjustments are handled."
      sections={[
        {
          heading: "Refund eligibility",
          body: "Refunds are reviewed for damaged, missing, incorrect, or unavailable items. Live arrival issues must be reported promptly with order details.",
        },
        {
          heading: "Processing time",
          body: "Approved refunds are processed back to the original payment method where possible. Cash on delivery refunds may require bank or UPI details.",
        },
        {
          heading: "Support",
          body: "Contact support with your order number, photos where relevant, and delivery details so we can resolve the issue quickly.",
        },
      ]}
    />
  );
}
