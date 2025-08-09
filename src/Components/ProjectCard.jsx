import React from "react";
// import Dummy from "../Constants/Dummy.webp";
import { useNavigate } from "react-router";
import createSeoUrl from "../Helpers/UrlGenerator";
const ProjectCard = ({ item, index,...props }) => {
  console.log(item);
  const navigate = useNavigate();
  const coverImage = item.images.split(",")[0];
  const tecs = item.tecs.replaceAll('"', "").split(",");
  return (
    <div
      {...props}
      key={item.title}
      style={{
        backgroundImage: `url(${
          import.meta.env.VITE_FRONT_URL + "/uploads/projects/" + coverImage
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="bg-white  overflow-hidden group aspect-video scroll-image flex items-center justify-center w-full h-full rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 relative"
    >
      <div className="w-full bg-black/50 flex items-center p-6 overflow-hidden lg:justify-between justify-end absolute md:group-hover:h-1/5 h-1/5 bottom-0 rounded-b-lg lg:bg-black/50  md:group-hover:z-10 z-10 md:group-hover:opacity-100 opacity-100 md:group-hover:visible visible transition-all duration-300 backdrop-blur-sm md:h-0 md:opacity-0 md:invisible">
        <div className=" hidden md:flex items-center gap-2 text-white/80 text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="flex gap-2">
            <span className="text-white">Tech:</span>
            <span className="text-white">{tecs.join(", ")}</span>
          </span>
        </div>
        <button
          onClick={() => {
            navigate(`/project/${createSeoUrl(item.title,item.id)}`);
          }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300 font-medium text-sm flex items-center gap-2"
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
      <span className="text-gray-400 text-lg font-light"></span>
    </div>
  );
};

export default ProjectCard;
