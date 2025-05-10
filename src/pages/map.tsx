"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";
import { LatLngExpression } from "leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function Map() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const L = require("leaflet");
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  if (!isMounted) return null;

  const center: LatLngExpression = [19.7515, 75.7139];

  return (
    <div className="w-full h-[90vh] p-4">
      <MapContainer
        center={center}
        zoom={6.5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {projectsData.map((project: Project) => (
          <Marker
            key={project.id}
            position={[project.geolocation.lat, project.geolocation.lng]}
          >
            <Popup>
              <div>
                <strong>{project.title}</strong>
                <br />
                {project.location}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
