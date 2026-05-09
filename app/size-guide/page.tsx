import { InfoPage } from "../info-page";

export default function SizeGuidePage() {
  return (
    <InfoPage
      title="Size Guide"
      description="Sizing guidance for aquariums, fish, and accessories."
      sections={[
        {
          heading: "Aquarium sizing",
          body: "Choose a tank based on adult fish size, number of fish, filtration, and swimming space. Larger tanks are generally more stable for beginners.",
        },
        {
          heading: "Fish size notes",
          body: "Product pages list approximate sizes when available. If you need an exact current size before purchase, contact support.",
        },
        {
          heading: "Accessory fit",
          body: "Filters, heaters, lights, and pumps should be matched to tank volume. Check product descriptions or ask support before ordering.",
        },
      ]}
    />
  );
}
