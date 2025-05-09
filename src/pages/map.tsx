"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";

// Fix default marker icons (again for safety)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Map = () => {
  const center: [number, number] = [19.7515, 75.7139]; // Center of Maharashtra

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
};

export default Map;
