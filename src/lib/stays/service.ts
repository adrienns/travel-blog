import { dedupeByNameAddress } from "@/lib/stays/utils";
import { scrapeJadestaVillage } from "@/lib/stays/jadesta";
import { fetchGooglePlacesCached } from "@/lib/stays/google_places";
import { Stay } from '@/lib/stays/types';

const uniqueStaysList = (
    fetchedJadestaStays: Stay[],
    googleMapsStays: Stay[]
): Stay[] => {
    // helper: normalize names for loose comparison
    const normalizeName = (name: string) =>
        name
            .toLowerCase()
            .replace(/\b(home\s*stay|homestay|resort|maratua)\b/g, "") // remove filler words
            .replace(/\s+/g, " ") // collapse spaces
            .trim();

    const mergedStays = [...googleMapsStays, ...fetchedJadestaStays];

    return mergedStays.reduce<Stay[]>((acc, curr) => {
        const normCurr = normalizeName(curr.name);

        const existing = acc.find(
            (a) => normalizeName(a.name) === normCurr
        );

        if (existing) {
            // merge: prefer non-null values from curr
            for (const key of Object.keys(curr) as (keyof Stay)[]) {
                if (curr[key] != null) {
                    (existing as Record<keyof Stay, unknown>)[key] = curr[key];
                }
            }
            return acc;
        }

        return [...acc, { ...curr }];
    }, []);
};

export async function getUnifiedStays(urls: string[]): Promise<Stay[]> {
    const jadestaStays = (
        await Promise.all(urls.map((u) => scrapeJadestaVillage(u)))
    ).flat();

    const googleStays = await fetchGooglePlacesCached();
    const filteredStays: Stay[] = uniqueStaysList(jadestaStays, googleStays);

    return dedupeByNameAddress(filteredStays);
}
