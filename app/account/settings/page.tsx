import { InfoPage } from "../../info-page";

export default function AccountSettingsPage() {
  return (
    <InfoPage
      title="Account Settings"
      description="Manage account preferences and support options."
      sections={[
        {
          heading: "Profile preferences",
          body: "Profile editing is available from the account overview. Additional preferences can be added here as the account system grows.",
        },
        {
          heading: "Need changes?",
          body: "Contact support for help updating account details that cannot be changed from the current demo interface.",
        },
      ]}
    />
  );
}
