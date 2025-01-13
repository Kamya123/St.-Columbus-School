// src/components/Navbar.jsx

import { NavLink } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';

const Navbar = () => {
  const activeClassName = "text-customRed2";

  // Social media platforms and their respective icons
  const socialMedia = [
    { name: 'Facebook', icon: <IoLogoFacebook size={20} />, link: 'https://facebook.com' },
    { name: 'Instagram', icon: <IoLogoInstagram size={20} />, link: 'https://instagram.com' },
    { name: 'Twitter', icon: <IoLogoTwitter size={20} />, link: 'https://twitter.com' },
  ];

  return (
    <div className="h-24 top-0 w-full items-center flex justify-around bg-white text-customDark fixed">
      {/* Logo Section */}
      <header className="flex flex-col justify-center p-4">
        <span className="text-md font-roboto leading-none">St. Columbus</span>
        <span className="text-md font-roboto leading-none">School</span>
      </header>

      {/* Navigation Links */}
      <nav className="flex font-georgia font-bold space-x-6">
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
      <div className="flex space-x-4">
        {socialMedia.map(({ name, icon, link }) => (
          <a href={link} key={name} className="text-customRed1 hover:text-customDark">
            {icon}
          </a>
        ))}
      </div>

    </div>
  );
}

export default Navbar;
