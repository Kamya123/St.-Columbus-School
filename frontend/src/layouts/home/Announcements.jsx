import React from "react";
import HorizontalLine from "../../components/HorizontalLine";


const AnnouncementItem = ({ date, title, text }) => (
  <div className="flex gap-6 py-6 px-12">
    <div className="w-1/4">
      <p className="font-georgia text-customRed1 text-lg font-semibold">{date}</p>
    </div>
    <div className="w-3/4">
      <h4 className="font-georgia text-xl text-customGray mb-2">{title}</h4>
      <p className="font-roboto text-customGray">{text}</p>
    </div>
  </div>
);

const Announcements = ({ items }) => {
  return (
    <div className="py-16 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl max-[920px]:text-3xl font-bold text-center font-georgia text-customGray mb-12">
          Latest Updates
        </h2>
        <div className="bg-white rounded-lg shadow-md">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <AnnouncementItem {...item} />
              {index !== items.length - 1 && (
                <HorizontalLine width="90%" color="rgb(220, 215, 215)" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;