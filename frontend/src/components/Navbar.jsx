// src/components/Navbar.jsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeClassName = "text-customRed2";
  
  const socialMedia = [
    { name: 'Facebook', icon: <IoLogoFacebook size={20} />, link: 'https://facebook.com' },
    { name: 'Instagram', icon: <IoLogoInstagram size={20} />, link: 'https://instagram.com' },
    { name: 'Twitter', icon: <IoLogoTwitter size={20} />, link: 'https://twitter.com' },
  ];

  const navLinks = ['Home', 'About', 'Academics', 'Activities', 'Admission', 'Contact'];

  return (
    <div className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between bg-white text-customDark px-4 md:px-8 shadow-md z-50">
      {/* Logo Section */}
      <header className="flex flex-col justify-center p-4">
        <span className="text-md font-roboto leading-none">St. Columbus</span>
        <span className="text-md font-roboto leading-none">School</span>
      </header>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex font-georgia font-bold space-x-6">
        {navLinks.map((link) => (
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

      {/* Desktop Social Media Icons */}
      <div className="hidden md:flex space-x-4">
        {socialMedia.map(({ name, icon, link }) => (
          <a href={link} key={name} className="text-customRed1 hover:text-customDark">
            {icon}
          </a>
        ))}
      </div>

      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden text-customRed1 focus:outline-none mr-4"
        onClick={() => setMenuOpen(true)}
      >
        <FaBars size={24} />
      </button>

      {/* Overlay (clicking it closes the menu) */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[45%] bg-red-500 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full p-8">
          {/* Close Icon at the top-right inside panel */}
          <div className="flex justify-end">
            <button
              className="text-white focus:outline-none"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes size={24} />
            </button>
          </div>
          {/* Navigation Links */}
          <nav className="flex flex-col pt-8 space-y-6 font-georgia text-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link}
                to={`/${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'hover:text-text-[#fde1e1] hover:duration-500' : 'hover:text-[#fde1e1]'
                }
              >
                {link}
              </NavLink>
            ))}
          </nav>
          {/* Social Media Icons at the Bottom */}
          <div className="flex space-x-4 pt-12">
            {socialMedia.map(({ name, icon, link }) => (
              <a href={link} target={'_blank'} key={name} className="text-white hover:text-customRed2 hover:duration-500">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
