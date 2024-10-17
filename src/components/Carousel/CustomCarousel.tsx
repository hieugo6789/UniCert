import React, { useState, useEffect } from "react";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import Banner from "./banner";

interface Slide {
  title?: string;
  content?: JSX.Element;
  imageUrl?: string;
  button1Text?: string;
}


const slides: Slide[] = [
  {
    content: <Banner
      title="You Can't Stop Now, You're Almost There"
      linkto="/certificate"
      button1Text="See All Certifications"
    />,
  },
  {
    content: <Banner
      title="Quick and Easy to Enroll"
      linkto="/practice"
      imageUrl="https://m.media-amazon.com/images/S/pv-target-images/d6e25ce8c6cdf788ec947effcec7854aee7090812cb73e536adf6b75b9eb7ca6._SX1080_FMjpg_.jpg"
      button1Text="Enroll now"
    />,
  },
  {
    content: <Banner
      title="Get Ready for the Future"
      linkto="/practice"
      imageUrl="https://www.michaelpage.co.uk/sites/michaelpage.co.uk/files/2023-10/shutterstock_1606546678_970x388.jpg"
      button1Text="Enroll now"
    />,
  },
  {
    content: <Banner
      title="Get Ready for the Future"
      linkto="/practice"
      imageUrl="https://tinybeans.com/wp-content/uploads/2022/05/little-boy-smiling-people-born-in-June.jpg"
      button1Text="Enroll now"
    />,
  },
  {
    content: <Banner
      title="Get Ready for the Future"
      linkto="/practice"
      imageUrl="https://getdex.com/blog/content/images/size/w960/2022/09/how-to-be-a-people-person-1662995088.jpg"
      button1Text="Enroll now"
    />,
  }
];

const CustomCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const delay = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, delay);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (

    <div className="relative w-full  mx-auto">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-full flex flex-col items-center bg-gray-100  rounded-lg"
            >
              {slide.content ? (
                slide.content
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
                  {slide.button1Text && (
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-2">
                      {slide.button1Text}
                    </button>
                  )}
                  {slide.imageUrl && (
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="mt-6 max-w-full h-auto rounded-lg"
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2  text-white  py-2 rounded-r-lg"
        onClick={prevSlide}
      >
        <CaretLeftOutlined style={{ fontSize: "64px", color: "skyblue" }} />
      </button>

      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2  text-white  py-2 rounded-l-lg"
        onClick={nextSlide}
      >
        <CaretRightOutlined style={{ fontSize: "64px", color: "skyblue" }} />
      </button>
    </div>
  );
};

export default CustomCarousel;
