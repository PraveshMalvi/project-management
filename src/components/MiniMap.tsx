"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { useRouter } from "next/router";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type MiniMapProps = {
  center: LatLngExpression;
};

export default function MiniMap({ center }: MiniMapProps) {
  const router = useRouter();
  return (
    <div onClick={() => router.push("/map")} className="cursor-pointer">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "70px",
          width: "70px",
          zIndex: 1,
          borderRadius: "6px",
        }}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center} />
      </MapContainer>
    </div>
  );
}
