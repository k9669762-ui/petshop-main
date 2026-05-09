import { InfoPage } from "../info-page";

export default function TrackOrderPage() {
  return (
    <InfoPage
      title="Track Order"
      description="Order tracking help for recent purchases."
      sections={[
        {
          heading: "Where to find tracking",
          body: "After an order is confirmed, tracking details are shared by email or phone. You can also sign in and check your account page.",
        },
        {
          heading: "Need manual help",
          body: "If you do not have a tracking number yet, contact support with your order ID, phone number, or email address.",
        },
      ]}
    />
  );
}
