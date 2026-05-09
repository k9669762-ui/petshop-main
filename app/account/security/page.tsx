import { InfoPage } from "../../info-page";

export default function AccountSecurityPage() {
  return (
    <InfoPage
      title="Account Security"
      description="Keep your Rainbow Aqua account protected."
      sections={[
        {
          heading: "Password",
          body: "Use a strong password and reset it from the forgot password page if you lose access.",
        },
        {
          heading: "Support",
          body: "Contact support immediately if you notice unexpected account or order activity.",
        },
      ]}
    />
  );
}
