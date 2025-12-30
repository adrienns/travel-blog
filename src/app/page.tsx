
import TravelBlogLandingClient from "../components/TravelBlogLandingClient";


export default async function TravelBlogLanding() {

  const baseUrl = `https://${process.env.VERCEL_URL}` || 'http://localhost:3000';



  const res = await fetch(
    `${baseUrl}/api/jadesta?urls=` + [
      "https://jadesta.kemenparekraf.go.id/desa/bohesilian_1",
      "https://jadesta.kemenparekraf.go.id/desa/payungpayung",
      "https://jadesta.kemenparekraf.go.id/desa/teluk_harapan",
      "https://jadesta.kemenparekraf.go.id/desa/_teluk_alulu_maratua",
    ].join(","),
    { next: { revalidate: 7776000 } }
  );
  const stays = res.ok ? await res.json() : [];


  return (
    <TravelBlogLandingClient stays={stays} />
  );
}
