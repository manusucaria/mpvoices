import SectionHero from "./sections/section-hero/Hero";
import SectionEspacioVoices from "./sections/section-espacio-voices/SectionEspacioVoices";
import SectionMariaPeña from "./sections/section-maria-peña/SectionMariaPeña"
import SectionSeparadorVoices from "./sections/section-separador-voices/SeparadorVoices";
import SectionSeparadorAlas from "./sections/section-separador-alas/SeparadorAlas";

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
