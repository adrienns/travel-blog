"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- Custom Marker Icons ---
// Using a custom SVG for a more premium look
const createCustomIcon = (color: string) => {
  const svg = `
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4C15.1634 4 8 11.1634 8 20C8 30.2 22.2 43.2 22.8 43.7C23.5 44.3 24.5 44.3 25.2 43.7C25.8 43.2 40 30.2 40 20C40 11.1634 32.8366 4 24 4Z" fill="${color}" stroke="white" stroke-width="2"/>
    <circle cx="24" cy="20" r="6" fill="white"/>
  </svg>`;

  return new L.DivIcon({
    className: "bg-transparent",
    html: svg,
    iconSize: [48, 48],
    iconAnchor: [24, 48], // Bottom tip
    popupAnchor: [0, -48],
  });
};

const HOTEL_ICON = createCustomIcon("#0ea5e9"); // Sky blue (Tailwind primary-ish)

// Types
type HotelPin = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  url?: string;
  price?: string;
  rating?: number;
  image?: string;
  tags?: string[];
};

type AccomodationMapProps = {
  hotels?: HotelPin[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: number;
};

export default function AccomodationMap({
  hotels,
  center = { lat: 2.21, lng: 118.60 },
  zoom = 11,
  height = 480,
}: AccomodationMapProps) {
  return (
    <div className="w-full h-full overflow-hidden rounded-3xl shadow-lg border border-white/20 relative group">
      <div className="absolute inset-0 pointer-events-none rounded-3xl ring-1 ring-inset ring-black/10 z-[400]" />

      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        scrollWheelZoom={false} // Better for page scrolling
        style={{ height: "100%", width: "100%" }}
        className="z-0 bg-[#f0f3f5]" // Fallback color matching Voyager tiles
      >
        {/* CartoDB Voyager Tiles - Cleaner, softer, modern look */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {hotels && hotels.map((h) => (
          <Marker
            key={h.name}
            position={[h.lat, h.lng]}
            icon={HOTEL_ICON}
          >
            {/* Custom Popup/Tooltip Styling */}
            <Tooltip
              direction="top"
              offset={[0, -48]}
              opacity={1}
              className="!bg-transparent !border-0 !shadow-none !p-0"
            >
              <div className="bg-white px-3 py-2 rounded-lg shadow-xl border border-black/5 text-foreground font-sans whitespace-nowrap transform transition-all duration-200">
                <div className="font-semibold text-xs tracking-wide text-neutral-800">{h.name}</div>
                {/* Tiny triangle for speech bubble effect */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-black/5" />
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
