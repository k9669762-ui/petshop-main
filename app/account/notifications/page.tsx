import { InfoPage } from "../../info-page";

export default function AccountNotificationsPage() {
  return (
    <InfoPage
      title="Notifications"
      description="Manage updates about orders, offers, and account activity."
      sections={[
        {
          heading: "Order updates",
          body: "Delivery and order status alerts help you follow purchases from confirmation through delivery.",
        },
        {
          heading: "Offers",
          body: "Marketing notifications can include new arrivals, seasonal offers, and pet care reminders.",
        },
      ]}
    />
  );
}
