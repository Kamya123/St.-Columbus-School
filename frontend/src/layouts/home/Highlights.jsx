import React from "react";
// import HorizontalLine from "./HorizontalLine";

const HighlightCard = ({ icon, title, text }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
    <div className="text-customRed1 text-4xl mb-4">{icon}</div>
    <h3 className="font-georgia text-2xl text-customGray font-semibold mb-4">
      {title}
    </h3>
    <p className="font-roboto text-customGray">{text}</p>
  </div>
);

const Highlights = ({ items }) => {
  return (
    <div className="py-16 px-4 md:px-20 bg-reddishWhite">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl max-[920px]:text-3xl font-bold text-center font-georgia text-customGray mb-12">
          Why St. Columbus Stands Out
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <HighlightCard
              key={index}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;