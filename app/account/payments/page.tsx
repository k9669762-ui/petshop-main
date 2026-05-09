import { InfoPage } from "../../info-page";

export default function AccountPaymentsPage() {
  return (
    <InfoPage
      title="Payment Methods"
      description="Review available payment options for your account."
      sections={[
        {
          heading: "Available methods",
          body: "Rainbow Aqua supports secure online payments and cash on delivery where serviceable.",
        },
        {
          heading: "Saved payment details",
          body: "Saved cards and UPI mandates are not enabled in this demo build. Checkout will ask for payment details when needed.",
        },
      ]}
    />
  );
}
