import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="z-100 bg-black p-4 flex justify-between items-center sticky w-full top-0">
      {/* Logo */}
      <div className="text-white text-2xl font-bold">
        <img
          src="https://cdn4.iconfinder.com/data/icons/logos-brands-in-colors/3000/figma-logo-512.png"
          alt="Logo"
          className="w-8 h-8"
        />
      </div>

      {/* Search Bar */}
      <div className="relative w-4/12">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white-100 text-white w-full rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span className="absolute right-3 top-2 text-black">
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
              strokeWidth="2"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
            />
          </svg>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-4 text-white">
        <Link
          to="./certificate"
          className="hover:text-gray-400"
        >
          Certifications
        </Link>
        <Link
          to="./practicalExam"
          className="hover:text-gray-400"
        >
          Practice Exams
        </Link>
        <Link
          to="./about"
          className="hover:text-gray-400"
        >
          About Us
        </Link>
        <Link
          to="./majors"
          className="hover:text-gray-400"
        >
          Majors
        </Link>
        <Link
          to="/job"
          className="hover:text-gray-400"
        >
          Job Position
        </Link>
      </nav>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-gray-100 border border-purple-500 text-purple-500 px-4 py-2 rounded hover:bg-purple-500 hover:text-white">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Register
          </button>
        </Link>
      </div>
    </header>
  );
};
export default Header;