import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AvatarImage from "../UI/AvatarImage";
import Logo from "./Logo";
import { ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";
import useCartByUserId from "../../hooks/Cart/useCartByUserId";
import Cookies from "js-cookie";
import SearchDropdown from "./SearchDropdown";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = Cookies.get("userId");
  const { state, getCart } = useCartByUserId();
  const token = Cookies.get("token");
  // console.log(token);
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    if (userId) {
      getCart(userId);
    }
  }, [userId]);
  const cartCount =
    state?.currentCart?.courseDetails?.length +
      state?.currentCart?.examDetails?.length || 0;
  return (
    <header className="z-100 bg-gray-950 px-4 py-2 sm:px-8 sm:py-4 flex justify-between items-center sticky w-full top-0">
      {/* Logo */}
      <div className="w-2/5 md:w-1/6 lg:w-1/6">
        <Logo />
      </div>

      <SearchDropdown />

      {/* Hamburger Icon for Mobile */}
      <div className="block lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          <MenuOutlined style={{ fontSize: "28px" }} />
        </button>
      </div>

      {/* Navigation Links (Show in hamburger menu on mobile) */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-14 left-0 bg-gray-950 w-full lg:static lg:w-auto lg:flex lg:space-x-4 lg:text-white`}
      >
        <Link
          to="./certificate"
          className="block py-2 px-4 text-white  hover:text-gray-400"
        >
          Certifications
        </Link>
        <Link
          to="./courses"
          className="block py-2 px-4 text-white hover:text-gray-400"
        >
          Courses
        </Link>        
        <Link
          to="./majors"
          className="block py-2 px-4 text-white hover:text-gray-400"
        >
          Majors
        </Link>
        <Link
          to="/job"
          className="block py-2 px-4 text-white hover:text-gray-400"
        >
          Job Position
        </Link>
        <Link
          to="./about"
          className="block py-2 px-4 text-white hover:text-gray-400"
        >
          About Us
        </Link>
      </nav>

      {/* User Actions */}
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <div className="text-white mr-2 md:mr-6">
              <Link
                to="/cart"
                className="relative"
              >
                {cartCount > 0 ? (
                  <span
                    className="bg-red-500 text-white 
                h-5 w-5 flex items-center justify-center
                left-3 bottom-3
                rounded-full absolute"
                  >
                    {" "}
                    {cartCount}{" "}
                  </span>
                ) : null}
                <ShoppingCartOutlined style={{ fontSize: "24px" }} />
              </Link>
            </div>
            <AvatarImage />
          </div>
        ) : (
          <div className="flex space-x-2 sm:space-x-4">
            <Link to="/login">
              <button className="bg-gray-100 border border-purple-500 text-purple-500 px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-purple-500 hover:text-white">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-purple-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-purple-600">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
