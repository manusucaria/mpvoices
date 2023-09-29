import Hero from "./components/Hero";
import EspacioVoices from "./sections/Espacio-Voices/Espacio-Voices";
import MariaPeña from "./sections/Maria-Peña/MariaPeña"
import SeparadorVoices from "./components/SeparadorVoices";
import SeparadorAlas from "./components/SeparadorAlas";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <EspacioVoices />
      <MariaPeña />
      <SeparadorVoices />
      <SeparadorAlas />
    </main>
  )
}
