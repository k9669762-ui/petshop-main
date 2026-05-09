import { InfoPage } from "../info-page";

export default function CareersPage() {
  return (
    <InfoPage
      title="Careers"
      description="Join the Rainbow Aqua team."
      sections={[
        {
          heading: "Current openings",
          body: "We are always interested in people who understand pets, aquariums, logistics, customer care, and ecommerce operations.",
        },
        {
          heading: "How to apply",
          body: "Send your profile through the contact page with the role you are interested in and your preferred location.",
        },
        {
          heading: "What we value",
          body: "We look for reliable teammates who care about customer trust, animal welfare, and careful delivery practices.",
        },
      ]}
    />
  );
}
