import { InfoPage } from "../info-page";

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms of Service"
      description="The basic terms for shopping with Rainbow Aqua."
      sections={[
        {
          heading: "Orders and availability",
          body: "Products are subject to availability. Live fish and pet orders may require confirmation before dispatch to protect animal health and delivery quality.",
        },
        {
          heading: "Payments",
          body: "We support secure online payments and cash on delivery where available. Orders may be held if payment verification is incomplete.",
        },
        {
          heading: "Customer responsibility",
          body: "Customers should provide accurate contact and delivery details and follow care guidance provided for live pets, fish, and aquarium products.",
        },
      ]}
    />
  );
}
