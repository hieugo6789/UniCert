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
    content: <Banner />,
  },
  // {
  //   title: "Second Slide Title",
  //   imageUrl: "/path-to-another-image",
  //   button1Text: "Another Action",
  // },
  // {
  //   title: "Third Slide Title",
  //   imageUrl: "/path-to-third-image",
  //   button1Text: "Third Slide Action",
  // },
  // {
  //   title: "Third Slide Title",
  //   imageUrl: "/path-to-third-image",
  //   button1Text: "Third Slide Action",
  // },
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
        <CaretLeftOutlined style={{ fontSize: "64px" }} />
      </button>

      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2  text-white  py-2 rounded-l-lg"
        onClick={nextSlide}
      >
        <CaretRightOutlined style={{ fontSize: "64px" }} />
      </button>
    </div>
  );
};

export default CustomCarousel;
