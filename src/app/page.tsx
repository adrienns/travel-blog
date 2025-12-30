
import TravelBlogLandingClient from "../components/TravelBlogLandingClient";
import { getUnifiedStays } from "@/lib/stays/service";


export default async function TravelBlogLanding() {

  const stays = await getUnifiedStays([
    "https://jadesta.kemenparekraf.go.id/desa/bohesilian_1",
    "https://jadesta.kemenparekraf.go.id/desa/payungpayung",
    "https://jadesta.kemenparekraf.go.id/desa/teluk_harapan",
    "https://jadesta.kemenparekraf.go.id/desa/_teluk_alulu_maratua",
  ]);


  return (
    <TravelBlogLandingClient stays={stays} />
  );
}
