"use client";

import dynamic from "next/dynamic";

const AccomodationMap = dynamic(() => import("./MaratuaMap"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full bg-muted/50 animate-pulse flex items-center justify-center rounded-xl">
            Loading map…
        </div>
    ),
});

export default function MapWrapper(props: any) {
    return <AccomodationMap {...props} />;
}
