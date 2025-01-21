// src/components/Card.jsx

import React from "react";

const Card = ({ title, content, detail }) => {
  return (
    <div className="relative bg-white shadow-md rounded-lg p-6 hover:bg-reddishWhite hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Title */}
      <h3 className="font-georgia text-xl font-semibold text-customGray mb-4">
        {title}
      </h3>

      {/* Content */}
      <p className="text-customGray font-roboto sm:text-base md:text-lg leading-relaxed mb-4 max-[544px]:text-[15px] max-[544px]:leading-6 max-[768px]:leading-7 max-[768px]:pt-5">
        {content}
      </p>

      {/* Detail */}
      <p className="text-customGray font-roboto text-xs sm:text-sm font-medium">{detail}</p>
    </div>
  );
};

export default Card;
