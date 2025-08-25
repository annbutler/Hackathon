'use client';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ease-in-out py-4 px-6 md:px-12 ${
        isScrolled ? 'bg-black/50 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-xl">
         <h1>
          <a href="#"> MVP Starter Kit</a>
          </h1>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="#features" className="text-white hover:text-gray-300 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-white hover:text-gray-300 transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-white hover:text-gray-300 transition-colors">
            About
          </a>
          <a href="#contact" className="text-white hover:text-gray-300 transition-colors">
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label="Menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}
            ></span>
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'opacity-100 visible bg-black/90 backdrop-blur-md'
            : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col space-y-4 p-6">
          <a
            href="#features"
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors text-lg py-2"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors text-lg py-2"
          >
            Pricing
          </a>
          <a
            href="#about"
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors text-lg py-2"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-white hover:text-gray-300 transition-colors text-lg py-2"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;