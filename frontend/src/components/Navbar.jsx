// src/components/Navbar.jsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeClassName = "text-customRed2";

  // Social media platforms and their respective icons
  const socialMedia = [
    { name: 'Facebook', icon: <IoLogoFacebook size={20} />, link: 'https://facebook.com' },
    { name: 'Instagram', icon: <IoLogoInstagram size={20} />, link: 'https://instagram.com' },
    { name: 'Twitter', icon: <IoLogoTwitter size={20} />, link: 'https://twitter.com' },
  ];

  return (
    <div className="h-24 top-0 w-full flex items-center justify-between bg-white text-customDark fixed px-4 md:px-8 shadow-md z-50">
      {/* Logo Section */}
      <header className="flex flex-col justify-center p-4">
        <span className="text-md font-roboto leading-none">St. Columbus</span>
        <span className="text-md font-roboto leading-none">School</span>
      </header>

      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden text-customDark focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Navigation Links */}
      <nav
        className={`
          flex flex-col md:flex-row font-georgia font-bold space-y-4 md:space-y-0 md:space-x-6 
          md:static absolute top-24 left-0 w-full md:w-auto bg-white md:bg-transparent transition-all 
          duration-300 ${menuOpen ? 'block' : 'hidden md:block'}
        `}
      >
        {['Home', 'About', 'Academics', 'Activities', 'Admission', 'Contact'].map((link) => (
          <NavLink
            key={link}
            to={`/${link.toLowerCase()}`}
            className={({ isActive }) =>
              isActive ? `${activeClassName} hover:text-customRed2` : 'hover:text-customRed2'
            }
          >
            {link}
          </NavLink>
        ))}
      </nav>

      {/* Social Media Links */}
      <div className="hidden md:flex space-x-4">
        {socialMedia.map(({ name, icon, link }) => (
          <a href={link} key={name} className="text-customRed1 hover:text-customDark">
            {icon}
          </a>
        ))}
      </div>

      {/* Social Media Links for Mobile */}
      {menuOpen && (
        <div className="flex md:hidden space-x-4 justify-center mt-4">
          {socialMedia.map(({ name, icon, link }) => (
            <a href={link} key={name} className="text-customRed1 hover:text-customDark">
              {icon}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
