import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ text, author, role }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <FaQuoteLeft className="text-customRed1 text-3xl mb-4" />
    <p className="font-roboto text-gray-600 mb-6">{text}</p>
    <div className="border-t pt-4">
      <h4 className="font-georgia text-customGray font-semibold">{author}</h4>
      <p className="font-roboto text-gray-500 text-sm">{role}</p>
    </div>
  </div>
);

const Testimonials = ({ items }) => {
  return (
    <div className="py-16 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-georgia text-3xl text-customGray font-semibold text-center mb-12">
          Hear From Our Community
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <TestimonialCard
              key={index}
              text={item.text}
              author={item.author}
              role={item.role}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;