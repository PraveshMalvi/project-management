"use client";

import React, { useState } from "react";
import projectsData from "@/data/projects.json";
import { Project } from "@/types/project";

const Media = () => {
  const [mediaType, setMediaType] = useState<"images" | "videos">("images");
  const [currentIndex, setCurrentIndex] = useState<{ [key: string]: number }>(
    {}
  );

  const handleToggle = (type: "images" | "videos") => {
    setMediaType(type);
    setCurrentIndex({});
  };

  const handlePrev = (projectId: string) => {
    setCurrentIndex((prev) => ({
      ...prev,
      [projectId]: Math.max((prev[projectId] || 0) - 1, 0),
    }));
  };

  const handleNext = (projectId: string, total: number) => {
    setCurrentIndex((prev) => ({
      ...prev,
      [projectId]: Math.min((prev[projectId] || 0) + 1, total - 1),
    }));
  };

  console.log(currentIndex);

  return (
    <div className="w-full sm:px-12 px-8 py-4">
      <div className="flex gap-4 mb-6">
        <button
          className={`btn ${
            mediaType === "images" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleToggle("images")}
        >
          Images
        </button>
        <button
          className={`btn ${
            mediaType === "videos" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleToggle("videos")}
        >
          Videos
        </button>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {projectsData.map((project: Project) => {
          const mediaArray =
            mediaType === "images" ? project.images : project.videos;
          const index = currentIndex[project.id] || 0;

          return (
            <div key={project.id} className="border rounded-xl p-4 shadow-md">
              <p className="text-base font-bold mb-2">{project.title}</p>
              <p className="text-sm text-gray-600 mb-2">{project.location}</p>

              <div className="relative w-full h-60 mb-3 flex justify-center items-center bg-gray-100">
                {mediaType === "images" ? (
                  <img
                    src={mediaArray[index]}
                    alt={`Project ${project.title} image ${index + 1}`}
                    className="max-h-56 object-contain"
                  />
                ) : (
                  <iframe
                    src={mediaArray[index]}
                    title={`Project ${project.title} video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handlePrev(project.id)}
                  disabled={index === 0}
                >
                  Previous
                </button>
                <span className="text-sm">
                  {index + 1} / {mediaArray.length}
                </span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleNext(project.id, mediaArray.length)}
                  disabled={index === mediaArray.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Media;
