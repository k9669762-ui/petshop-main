import { InfoPage } from "../info-page";

export default function ShippingPage() {
  return (
    <InfoPage
      title="Shipping Info"
      description="Delivery details for fish, accessories, and pet supplies."
      sections={[
        {
          heading: "Delivery timeline",
          body: "Most product orders are delivered within 2 to 5 business days. Live fish are packed with oxygen support and shipped using the safest available delivery window.",
        },
        {
          heading: "Shipping charges",
          body: "Orders above Rs. 2,000 qualify for free shipping. Smaller orders show the shipping charge during checkout before payment.",
        },
        {
          heading: "Live fish handling",
          body: "Please be available to receive live fish deliveries. Inspect the package immediately and contact support if anything looks wrong.",
        },
      ]}
    />
  );
}
