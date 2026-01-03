
import Image from "next/image";
import { getUnifiedStays } from "@/lib/stays/service";
import VisitBeachesSection from "@/components/VisitBeachesSection";
import CavesSection from "@/components/VisitCavesSection";
import DivingSnorkelingSection from "@/components/DivingSnorkelingSection";
import VisitOtherIslandsSection from "@/components/VisitOtherIslandsSection";
import MapWrapper from "@/components/MapWrapper";

const MAINIMAGE = "/images/beach_with_palm_trees.webp";
const PLANE_MARATUA = "/images/maratua_plane.webp";
const DISSAPEARING_BEACH_HORIZONTAL = "/images/disappearing_beach_horizontal.webp";
const MARATUA_JETTY = "/images/jetty_maratua.webp";
const GRAGE_GUESTHOUSE = "/images/grage_guesthouse.webp";
const CAVE = "/images/cave_04.webp";

export default async function TravelBlogLanding() {
  const stays = await getUnifiedStays([
    "https://jadesta.kemenparekraf.go.id/desa/bohesilian_1",
    "https://jadesta.kemenparekraf.go.id/desa/payungpayung",
    "https://jadesta.kemenparekraf.go.id/desa/teluk_harapan",
    "https://jadesta.kemenparekraf.go.id/desa/_teluk_alulu_maratua",
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={MAINIMAGE}
            alt="Maratua Island Hero"
            fill
            priority
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white font-bold drop-shadow-xl tracking-tight">
            Maratua
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/90 font-light tracking-wide font-sans max-w-2xl">
            The Hidden Gem of the Derawan Archipelago
          </p>
        </div>
      </section>

      {/* Intro Section - Glass Card */}
      <section className="relative z-10 -mt-32 px-4 md:px-8 mb-24">
        <div className="max-w-5xl mx-auto bg-card/60 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl">
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground text-center font-serif italic">
            &ldquo;Think turquoise lagoons, untouched coral reefs, sea turtles everywhere, and a super laid-back vibe.&rdquo;
          </p>
          <div className="mt-8 text-base md:text-lg text-foreground/80 leading-loose max-w-3xl mx-auto text-center font-sans">
            Maratua Island is a dreamy crescent-shaped paradise. It’s the kind of place that feels far away from everything—perfect for diving, snorkeling, or just a quiet escape into nature.
          </div>
        </div>
      </section>

      {/* Visual Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96 md:h-80">
          {[DISSAPEARING_BEACH_HORIZONTAL, MARATUA_JETTY, GRAGE_GUESTHOUSE, CAVE].map((src, i) => (
            <div key={i} className="relative w-full h-full rounded-2xl overflow-hidden group shadow-lg">
              <Image
                src={src}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* How to Get There */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-secondary/20 rounded-3xl p-8 md:p-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-primary">How to Get There</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Most travelers fly into <span className="font-semibold text-foreground">Berau</span>, then take a speedboat from Tanjung Batu port. It&apos;s an adventure before you even arrive.
              </p>
              <p>
                Alternatively, fly into <span className="font-semibold text-foreground">Samarinda or Tarakan</span> for a potentially quicker route via Susi Air.
              </p>
            </div>
          </div>
          <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image src={PLANE_MARATUA} alt="Plane" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Where to Stay */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 sticky top-24">
            <h2 className="text-4xl font-serif font-bold text-primary">Where to Stay</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From luxury resorts on the water to authentic village homestays. We loved <strong>Grage Guesthouse</strong> for its perfect mix of comfort and local charm.
            </p>
            <div className="bg-card/50 backdrop-blur-sm border border-border p-6 rounded-2xl shadow-sm">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span>Luxury Resorts (Water Villas)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Beach Bungalows</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Village Homestays</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50">
            {/* Map Stay to HotelPin explicitly to match types */}
            <MapWrapper hotels={stays
              .filter(s => s.lat != null && s.lng != null)
              .map((stay, i) => ({
                id: `stay-${i}`,
                name: stay.name,
                lat: stay.lat!, // Defended by filter
                lng: stay.lng!, // Defended by filter
                url: stay.link || stay.sourceUrl,
                price: stay.price || undefined,
              }))} />
          </div>
        </div>
      </section>

      {/* Dynamic Sections Wrapper */}
      <div className="space-y-0 relative">
        <div className="absolute left-1/2 -ml-0.5 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-20 hidden md:block" />
        <VisitBeachesSection />
        <CavesSection />
        <DivingSnorkelingSection />
        <VisitOtherIslandsSection />
      </div>
    </main>
  );
}
