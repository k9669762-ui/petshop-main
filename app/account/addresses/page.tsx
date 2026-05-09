import { InfoPage } from "../../info-page";

export default function AccountAddressesPage() {
  return (
    <InfoPage
      title="Saved Addresses"
      description="Manage delivery addresses for faster checkout."
      sections={[
        {
          heading: "Address book",
          body: "Your saved addresses will appear here after you add them during checkout or from account settings.",
        },
        {
          heading: "Delivery coverage",
          body: "Please use accurate district, city, and pincode details so our team can confirm delivery availability.",
        },
      ]}
    />
  );
}
