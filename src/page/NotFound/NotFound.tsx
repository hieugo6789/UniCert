import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="bg-[#2F3242] min-h-screen flex items-center justify-center">
      <svg
        className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
        width="380px"
        height="500px"
        viewBox="0 0 837 1045"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
            stroke="#007FB2"
            strokeWidth="6"
            className="animate-float"
          ></path>
          <path
            d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
            stroke="#EF4A5B"
            strokeWidth="6"
            className="animate-float delay-200"
          ></path>
          <path
            d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
            stroke="#795D9C"
            strokeWidth="6"
            className="animate-float delay-400"
          ></path>
          <path
            d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
            stroke="#F2773F"
            strokeWidth="6"
            className="animate-float delay-600"
          ></path>
          <path
            d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
            stroke="#36B455"
            strokeWidth="6"
            className="animate-float delay-800"
          ></path>
        </g>
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-10 text-white font-light w-96">
        <h1 className="text-6xl mb-10">404</h1>
        <p>Page not found</p>
        <div className="mt-10 flex space-x-4">
          <a
            href="/"
            className="bg-[#68c950] py-2 px-6 rounded-lg font-bold text-white hover:bg-[#5A5C6C] transition-all"
          >
            Go to Home Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
