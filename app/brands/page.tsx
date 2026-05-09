import { InfoPage } from "../info-page";

export default function BrandsPage() {
  return (
    <InfoPage
      title="Our Brands"
      description="Trusted products and supplies selected by Rainbow Aqua."
      sections={[
        {
          heading: "Curated range",
          body: "We focus on reliable aquarium, pet food, grooming, and care products that work well for everyday pet parents and hobbyists.",
        },
        {
          heading: "Quality checks",
          body: "Products are selected for practical use, customer feedback, and suitability for Indian home and aquarium conditions.",
        },
        {
          heading: "Need a recommendation?",
          body: "Contact our support team for help choosing food, filters, tanks, medication, or accessories.",
        },
      ]}
    />
  );
}
