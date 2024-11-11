import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AvatarImage from "../UI/AvatarImage";
import Logo from "./Logo";
import { ShoppingCartOutlined, MenuOutlined, SearchOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import useCartByUserId from "../../hooks/Cart/useCartByUserId";
import Cookies from "js-cookie";
import SearchDropdown from "./SearchDropdown";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');
  const location = useLocation();
  const userId = Cookies.get("userId");
  const { state, getCart } = useCartByUserId();
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
    <header className="z-50 bg-gray-950 w-full sticky top-0 shadow-lg">
      {/* Desktop Header */}
      <div className="hidden lg:flex px-6 py-3 justify-between items-center">
        <div className="w-40">
          <Logo />
        </div>
        <div className="w-[500px] mx-8">
          <SearchDropdown />
        </div>
        <nav className="flex items-center space-x-8">
          {['certificate', 'courses', 'majors', 'job', 'about'].map((tab) => (
            <Link
              key={tab}
              to={`./${tab === 'job' ? 'job' : tab}`}
              className={`relative transition-colors text-base font-medium ${
                activeTab === tab 
                  ? 'text-purple-400 after:absolute after:bottom-[-12px] after:left-0 after:w-full after:h-0.5 after:bg-purple-400' 
                  : 'text-white hover:text-purple-400 hover:after:absolute hover:after:bottom-[-12px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-purple-400/50'
              }`}
            >
              {tab === 'certificate' ? 'Certifications' :
               tab === 'courses' ? 'Courses' :
               tab === 'majors' ? 'Majors' :
               tab === 'job' ? 'Job Position' : 'About Us'}
            </Link>
          ))}
        </nav>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative text-white hover:text-purple-400">
              <ShoppingCartOutlined style={{ fontSize: "24px" }} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <AvatarImage isMobile={false} />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <button className="bg-gray-100 border-2 border-purple-500 text-purple-500 px-6 py-2 text-base rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-purple-500 text-white px-6 py-2 text-base rounded-lg hover:bg-purple-600 transition-all duration-300 border-2 border-purple-500 hover:shadow-lg hover:shadow-purple-500/25">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="text-white/80 p-2"
          >
            <MenuOutlined style={{ fontSize: "24px" }} />
          </button>
          <div className="flex items-center">
            <Logo />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <Link to="/cart" className="relative text-white/80 p-2">
              <ShoppingCartOutlined style={{ fontSize: "24px" }} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-white/80 p-2"
          >
            <SearchOutlined style={{ fontSize: "24px" }} />
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-950 z-50">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 p-4 border-b border-gray-800">
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-white/80 p-2 hover:text-white"
              >
                <ArrowLeftOutlined style={{ fontSize: "20px" }} />
              </button>
              <div className="flex-1">
                <SearchDropdown 
                  onItemSelect={() => setIsSearchOpen(false)} 
                  isMobile={true}
                />
              </div>
            </div>
            {/* Results will be shown in the remaining space */}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-gray-950 z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-white/80 p-2"
            >
              <ArrowLeftOutlined />
            </button>            
            <div className="w-40">
              <Logo />
            </div>            
            <div className="w-10" />
          </div>

          <div className="overflow-y-auto h-[calc(100vh-64px)]">
            <nav className="flex flex-col">
              {isLoggedIn && (
                <div className="px-6 py-4 border-b border-gray-800">
                  <AvatarImage isMobile={true} onMobileItemClick={() => setIsMenuOpen(false)} />
                </div>
              )}
              {['certificate', 'courses', 'majors', 'job', 'about'].map((tab) => (
                <Link
                  key={tab}
                  to={`./${tab === 'job' ? 'job' : tab}`}
                  className={`px-6 py-4 text-base ${
                    activeTab === tab 
                      ? 'bg-gray-800 text-white border-l-4 border-purple-400' 
                      : 'text-gray-300'
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

            {!isLoggedIn && (
              <div className="p-4 mt-auto border-t border-gray-800">
                <Link 
                  to="/login" 
                  className="block w-full bg-white text-gray-900 px-4 py-2 rounded-lg text-center font-medium mb-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block w-full bg-purple-500 text-white px-4 py-2 rounded-lg text-center font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
