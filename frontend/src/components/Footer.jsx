import React from "react";
import { NavLink } from "react-router-dom";
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";

const Footer = () => {
  const socialMedia = [
    { name: "Facebook", icon: <IoLogoFacebook size={20} />, link: "https://facebook.com" },
    { name: "Instagram", icon: <IoLogoInstagram size={20} />, link: "https://instagram.com" },
    { name: "Twitter", icon: <IoLogoTwitter size={20} />, link: "https://twitter.com" },
  ];

  const InfoSection = ({ title, content }) => (
    <div className="space-y-4 text-center md:text-left">
      <h1 className="text-3xl font-georgia">{title}</h1>
      <div className="font-roboto pt-7">
        {content.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-reddishWhite px-8 md:px-16">
      <div className="pt-20 pb-10 flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0">
        {/* Reusable Info Sections */}
        <InfoSection
          title="The St. Columbus School"
          content={["Kanhaiyachak, near Indian Bank, Parbatta", "Pin: 851216, Khagaria, Bihar"]}
        />
        <InfoSection
          title="Main Office"
          content={["+91 8969489245", "9:00 a.m - 5:00 p.m"]}
        />
        <InfoSection
          title="Contact Us"
          content={["+91 0832645672", "stcollambus12@gmail.com"]}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-12 pb-6 space-y-10 md:space-y-0">
        {/* Logo Section */}
        <header className="text-center md:text-left">
          <h1 className="text-4xl font-bold font-roboto leading-none text-customGray">
            St. Columbus
          </h1>
          <h1 className="text-4xl font-bold font-roboto leading-none text-customGray">
            School
          </h1>
        </header>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-6 text-lg">
          {["Home", "About", "Academics", "Activities", "Admission", "Contact"].map((link) => (
            <NavLink
              key={link}
              to={`/${link.toLowerCase()}`}
              className="hover:text-customRed2"
            >
              {link}
            </NavLink>
          ))}
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4 justify-center">
          {socialMedia.map(({ name, icon, link }) => (
            <a
              href={link}
              key={name}
              className="text-customRed1 hover:text-customDark"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      <p className="pb-12 pt-5 text-center font-roboto text-customGray text-sm">
        Copyright © 2025 School | Powered by School.
      </p>
    </div>
  );
};

export default Footer;
