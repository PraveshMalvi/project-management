import { useState, useMemo, useEffect } from "react";
import { Project } from "@/types/project";
import projectsData from "@/data/projects.json";
import dynamic from "next/dynamic";
import Link from "next/link";

const ProjectMap = dynamic(() => import("@/components/MiniMap"), {
  ssr: false,
  loading: () => <div className="w-[70px] h-[70px] bg-gray-100 rounded" />,
});

export default function Projects() {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project: Project) =>
      `${project.title} ${project.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    // const sorted = [...filtered].sort((a, b) => {
    //   const titleA = a.title.toLowerCase();
    //   const titleB = b.title.toLowerCase();
    //   return sortAsc
    //     ? titleA.localeCompare(titleB)
    //     : titleB.localeCompare(titleA);
    // });

    // return sorted;
  }, [search]);

  return (
    <div className="w-full">
      <div className="w-full flex md:flex-row flex-col justify-start items-center gap-6 bg-white shadow sm:px-12 px-8 py-2">
        <input
          type="text"
          className="form-control !rounded-full px-4"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div
          className="bg-blue-100 py-2 w-[130px] rounded-full flex justify-center items-center text-blue-700 font-bold text-sm cursor-pointer"
          onClick={() => setSortAsc((prev) => !prev)}
        >
          {sortAsc ? "A-Z Sort" : "Z-A Sort"}
        </div>
        <button className="btn btn-primary w-[180px] !rounded-full">
          + New Project
        </button>
      </div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8 sm:px-12 px-8">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.id}
            className="border rounded-xl p-4 shadow-md hover:shadow-lg transition duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-base font-bold mb-1">{project.title}</p>
                <p className="text-sm text-gray-600 mb-0">{project.location}</p>
              </div>
              <ProjectMap
                key={project.id}
                center={[project.geolocation.lat, project.geolocation.lng]}
              />
            </div>
            <hr />
            <div className="">
              <Link
                href="/map"
                className="border py-1 px-2 rounded-full w-fit text-black hover:bg-black/10 duration-200"
              >
                Map
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
