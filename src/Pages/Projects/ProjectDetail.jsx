import React from "react";
import { useParams } from "react-router";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Dummy from "../../Constants/Dummy.webp";
import { motion } from "framer-motion";
const ProjectDetail = () => {
  const { id } = useParams();

  const projectImages = [
    "https://placehold.co/1920x1080",
    "https://placehold.co/1920x1080",
    "https://placehold.co/1920x1080",
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };
  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen  bg-gray-50">
      <div className="max-w-7xl flex flex-col-reverse lg:flex-col gap-12 mx-auto px-4 py-12">
        {/* Proje Başlığı ve Teknolojiler */}
        <div className="mb-6 hidden lg:block">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Project Title
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
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
              <span className="text-sm">React, Tailwind, GSAP</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="text-sm">2024</span>
          </div>
        </div>

        {/* Ana İçerik Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon - Proje Detayları */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-light text-gray-900 mb-6">
                Project Details
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">Client</h4>
                  <p className="text-gray-900">Client Name</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">Timeline</h4>
                  <p className="text-gray-900">3 months</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      React
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      Tailwind CSS
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      GSAP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8.5">
              <h3 className="text-xl font-light text-gray-900 mb-6">Links</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                >
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                >
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Slider ve Açıklama */}
          <div className="lg:col-span-2 space-y-8">
            {/* Slider */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="w-full aspect-video"
              >
                {projectImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Proje Açıklaması */}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-light text-gray-900 mb-8 relative after:absolute after:bottom-[-10px] after:left-0 after:w-20 after:h-1 after:bg-blue-500 after:rounded-full">
            About Project
          </h2>
          <div className="prose prose-gray max-w-none">
            <p>
              Detailed description of the project, its goals, and the problems
              it solves. This section can be quite lengthy and include multiple
              paragraphs.
            </p>
            <h3>Key Features</h3>
            <ul>
              <li>Feature 1 with detailed explanation</li>
              <li>Feature 2 with detailed explanation</li>
              <li>Feature 3 with detailed explanation</li>
            </ul>
          </div>
        </div>

        <div className="p-4 block lg:hidden">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Project Title
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
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
              <span className="text-sm">React, Tailwind, GSAP</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="text-sm">2024</span>
          </div>
        </div>
      </div>

      {/* Swiper Styles */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #3B82F6;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }

        .swiper-pagination-bullet {
          background: #3B82F6;
        }

        .swiper-pagination-bullet-active {
          background: #3B82F6;
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectDetail;
