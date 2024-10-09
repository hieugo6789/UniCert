import bannerImage from "../../assets/images/Carousel/Banner.jpg";

import React from "react";
import { Link } from "react-router-dom";

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-[70vh] bg-gray-100 border-t">
      <div className="absolute  w-full h-full">
        <img
          src={bannerImage}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-start h-full px-10 ml-20">
        <h1 className="text-5xl font-bold text-gray-800">
          You Can't Stop Now, You're <br />
          Almost There
        </h1>
        <div className="mt-6 flex space-x-4">
          <Link to="/certificate">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md font-semibold">
              See All Certifications
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
