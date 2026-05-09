import { InfoPage } from "../info-page";

export default function CarePage() {
  return (
    <InfoPage
      title="Care Guide"
      description="Simple care guidance for pets, fish, and aquarium supplies."
      sections={[
        {
          heading: "Acclimation",
          body: "Introduce fish and pets gradually after delivery. Keep water temperature, food, and surroundings stable during the first few days.",
        },
        {
          heading: "Feeding",
          body: "Use species-appropriate food and avoid overfeeding. Contact support if you need help choosing the right diet.",
        },
        {
          heading: "Maintenance",
          body: "For aquariums, maintain filtration, test water regularly, and perform partial water changes based on tank size and stocking level.",
        },
      ]}
    />
  );
}
