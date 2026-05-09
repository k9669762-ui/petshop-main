import { InfoPage } from "../info-page";

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Privacy Policy"
      description="How Rainbow Aqua handles customer information."
      sections={[
        {
          heading: "Information we collect",
          body: "We collect details needed to process orders, provide support, manage accounts, and improve the shopping experience.",
        },
        {
          heading: "How we use it",
          body: "Customer information is used for order fulfilment, delivery updates, account access, customer support, and service communication.",
        },
        {
          heading: "Your choices",
          body: "You can contact support to update account details, ask privacy questions, or request help with stored information.",
        },
      ]}
    />
  );
}
