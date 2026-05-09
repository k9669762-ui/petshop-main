import { allPets } from '@/lib/petBreeds'
import PetDetailClient from '@/components/pets/PetDetailClient'

// Generate static params for all pets
export function generateStaticParams() {
  return allPets.map((pet) => ({
    id: pet.id,
  }))
}

interface PageProps {
  params: { id: string }
}

export default function PetDetailPage({ params }: PageProps) {
  return <PetDetailClient petId={params.id} />
}
