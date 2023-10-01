import SectionHero from "./sections/SectionHero/Hero";
import SectionEspacioVoices from "./sections/SectionEspacioVoices/SectionEspacioVoices";
import SectionMariaPeña from "./sections/SectionMariaPeña/SectionMariaPeña"
import SectionSeparadorVoices from "./sections/SectionSeparadorVoices/SeparadorVoices";
import SectionSeparadorAlas from "./sections/SectionSeparadorAlas/SeparadorAlas";

export default function Home() {
  return (
    <main className="flex flex-col">
      <SectionHero />
      <SectionEspacioVoices />
      <SectionMariaPeña />
      <SectionSeparadorVoices />
      <SectionSeparadorAlas />
    </main>
  )
}
