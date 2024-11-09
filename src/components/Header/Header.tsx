import { Link, useLocation } from "react-router-dom";
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
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();
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

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('certificate')) setActiveTab('certificate');
    else if (path.includes('courses')) setActiveTab('courses');
    else if (path.includes('majors')) setActiveTab('majors');
    else if (path.includes('job')) setActiveTab('job');
    else if (path.includes('about')) setActiveTab('about');
    else setActiveTab('');
  }, [location.pathname]);

  return (
    <header className="z-50 bg-gray-950 px-6 py-3 flex justify-between items-center sticky w-full top-0 shadow-lg">
      {/* Logo */}
      <div className="w-32 sm:w-40">
        <Logo />
      </div>

      {/* Search Bar - Hidden on Mobile */}
      <div className="hidden md:block w-[500px] mx-8">
        <SearchDropdown />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        {['certificate', 'courses', 'majors', 'job', 'about'].map((tab) => (
          <Link
            key={tab}
            to={`./${tab === 'job' ? 'job' : tab}`}
            className={`relative transition-colors text-base ${
              activeTab === tab 
                ? 'text-purple-400 after:absolute after:bottom-[-12px] after:left-0 after:w-full after:h-0.5 after:bg-purple-400' 
                : 'text-white hover:text-purple-400'
            }`}
          >
            {tab === 'certificate' ? 'Certifications' :
             tab === 'courses' ? 'Courses' :
             tab === 'majors' ? 'Majors' :
             tab === 'job' ? 'Job Position' : 'About Us'}
          </Link>
        ))}
      </nav>

      {/* User Actions */}
      <div className="flex items-center gap-3 pl-2">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-white hover:text-purple-400 transition-colors flex items-center justify-center">
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
              <ShoppingCartOutlined className="text-2xl" />
            </Link>            
            <div className="flex items-center justify-center">
              <AvatarImage />
            </div>                
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <button className="bg-gray-100 border-2 border-purple-500 text-purple-500 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-purple-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg hover:bg-purple-600 transition-all duration-300 border-2 border-purple-500">
                Register
              </button>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="lg:hidden text-white">
          <MenuOutlined style={{ fontSize: "24px" }} />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-gray-950 border-t border-gray-800">
          {/* Mobile Search */}
          <div className="p-4">
            <SearchDropdown onItemSelect={() => setIsMenuOpen(false)} />
          </div>
          
          <nav className="flex flex-col">
            {['certificate', 'courses', 'majors', 'job', 'about'].map((tab) => (
              <Link
                key={tab}
                to={`./${tab === 'job' ? 'job' : tab}`}
                className={`px-4 py-3 transition-colors ${
                  activeTab === tab 
                    ? 'bg-gray-800 text-purple-400' 
                    : 'text-white hover:bg-gray-800 hover:text-purple-400'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {tab === 'certificate' ? 'Certifications' :
                 tab === 'courses' ? 'Courses' :
                 tab === 'majors' ? 'Majors' :
                 tab === 'job' ? 'Job Position' : 'About Us'}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
