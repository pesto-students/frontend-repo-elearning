import { useAppDispatch } from '@/app/lib/hooks';
import { setLoginModal } from '@/app/lib/slice';
import { IconHomeFilled, IconMenu2, IconPhoneFilled, IconSparkles, IconStarFilled, IconX } from '@tabler/icons-react';
import { useEffect, useState } from "react";
import AppLogo from '../AppLogo/AppLogo';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 50) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      return (
        <header
          className={`fixed top-0 z-50 w-full transition-all duration-300 ${
            scrolled ? 'bg-white shadow-lg py-2' : 'bg-[#8089ff] py-4'
          }`}
        >
          <div className="max-w-[1140px] mx-auto px-6">
            <div className="flex justify-between items-center">
              {/* Left - Brand */}
              <div className="text-xl font-bold text-white">
                <AppLogo />
              </div>
    
              {/* Center - Menu (Desktop) */}
              <nav className="hidden md:flex space-x-6">
                <a
                  href="#"
                  className={`flex items-center ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  } hover:text-gray-900`}
                >
                  <IconHomeFilled className="h-5 w-5 mr-2" />
                  Home
                </a>
                <a
                  href="#"
                  className={`flex items-center ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  } hover:text-gray-900`}
                >
                  <IconStarFilled className="h-5 w-5 mr-2" />
                  Features
                </a>
                <a
                  href="#"
                  className={`flex items-center ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  } hover:text-gray-900`}
                >
                  <IconSparkles className="h-5 w-5 mr-2" />
                  Pricing
                </a>
                <a
                  href="#"
                  className={`flex items-center ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  } hover:text-gray-900`}
                >
                  <IconPhoneFilled className="h-5 w-5 mr-2" />
                  Contact
                </a>
              </nav>
    
              {/* Right - Login Button (Desktop) */}
              <div className="hidden md:block">
                <a
                  onClick={() => { dispatch(setLoginModal({ show: true })) }}
                  className={`${
                    scrolled ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                  } px-4 py-2 rounded-lg font-semibold hover:bg-blue-700`}
                >
                  Login
                </a>
              </div>
    
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="text-white focus:outline-none"
                >
                  {menuOpen ? (
                    <IconX className="h-6 w-6" />
                  ) : (
                    <IconMenu2 className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
    
            {/* Mobile Menu */}
            {menuOpen && (
              <nav className="md:hidden mt-4">
                <a
                  href="#"
                  className={`block py-2 ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  } hover:text-gray-900`}
                >
                  <IconHomeFilled className="h-5 w-5 mr-2 inline" />
                  Home
                </a>
                <a
                  href="#"
                  className={`block py-2 ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  } hover:text-gray-900`}
                >
                  <IconStarFilled className="h-5 w-5 mr-2 inline" />
                  Features
                </a>
                <a
                  href="#"
                  className={`block py-2 ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  } hover:text-gray-900`}
                >
                  <IconSparkles className="h-5 w-5 mr-2 inline" />
                  Pricing
                </a>
                <a
                  href="#"
                  className={`block py-2 ${
                    scrolled ? 'text-gray-600' : 'text-white'
                  } hover:text-gray-900`}
                >
                  <IconPhoneFilled className="h-5 w-5 mr-2 inline" />
                  Contact
                </a>
                <a
                  href="#"
                  className={`block mt-4 ${
                    scrolled ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                  } px-4 py-2 rounded-lg font-semibold hover:bg-blue-700`}
                >
                  Login
                </a>
              </nav>
            )}
          </div>
        </header>
      );

}

export default Header;