import { InfoPage } from "../info-page";

export default function CookiesPage() {
  return (
    <InfoPage
      title="Cookie Policy"
      description="How cookies help Rainbow Aqua run and improve the site."
      sections={[
        {
          heading: "Essential cookies",
          body: "Some cookies are used to keep the shopping cart, login state, wishlist, and checkout flow working correctly.",
        },
        {
          heading: "Experience cookies",
          body: "We may use local preferences to remember settings and improve browsing, search, and product discovery.",
        },
        {
          heading: "Managing cookies",
          body: "You can manage browser cookies through your browser settings. Disabling some cookies may affect checkout and account features.",
        },
      ]}
    />
  );
}
