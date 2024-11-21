import bannerImage from "../../assets/images/Carousel/Banner.jpg";

import React from "react";
import { Link } from "react-router-dom";
interface BannerProps {
  title?: string;
  // content?: JSX.Element;
  imageUrl?: string;
  button1Text?: string;
  linkto?: string;
}
const Banner: React.FC<BannerProps> = (props) => {
  return (
    <div className="relative w-full h-[70vh] bg-gray-100 dark:bg-gray-800 border-t">
      <div className="absolute w-full h-full">
        <img
          // src={bannerImage}
          src={props.imageUrl || bannerImage}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-gray-900 via-white dark:via-gray-900 w-1/2 to-transparent opacity-100"></div>
      <div className="relative z-10 flex flex-col justify-center items-start h-full px-10 ml-20">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white break-words whitespace-normal w-1/3">
          {props.title}
        </h1>
        <div className="mt-6 flex space-x-4">
          <Link to={props.linkto||"/"}>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition duration-200">
              {/* See All Certifications */}
              {props.button1Text}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
