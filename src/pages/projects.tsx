"use client";

export default function Projects() {
  return (
    <div className="w-full sm:px-12 px-8">
      <div className="w-full flex md:flex-row flex-col justify-start items-center gap-6 mt-3">
        <input
          type="text"
          className="form-control !rounded-full px-4"
          placeholder="Search..."
        />
        <div className="bg-blue-100  py-2 w-[130px] rounded-full flex justify-center items-center text-blue-700 font-bold text-sm">
          A-Z Sort
        </div>
        <button className="btn btn-primary w-[180px] !rounded-full">
          + New Project
        </button>
      </div>
    </div>
  );
}
