import React from "react";
import HorizontalLine from "../../components/HorizontalLine";
import princImg from "../../assets/images/principal.jpg";
import { FaQuoteLeft } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const StatCard = ({ value, label }) => (
  <div className="text-center">
    <span className="text-4xl sm:text-5xl md:text-7xl text-customRed1 font-bold">
      {value}
    </span>
    <p className="text-customGray text-sm sm:text-base md:text-lg font-medium mt-2">
      {label}
    </p>
  </div>
);

const TeacherCard = ({ name, subject, image }) => (
  <div className="flex-shrink-0 w-52 sm:w-64 bg-white rounded-lg shadow-lg overflow-hidden m-2 sm:m-4">
    <img src={image} alt={name} className="w-full h-40 sm:h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{name}</h3>
      <p className="text-gray-600 mt-2">{subject}</p>
    </div>
  </div>
);

const AboutHero = () => {
  const scrollRef = React.useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="">
      <div className="w-full pt-16 pb-12 px-4 md:pt-20 md:pb-24 md:px-[4.5rem] flex flex-col md:flex-row bg-transparent">
        <div className="md:w-1/2 md:pr-36 font-georgia">
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-snug">
            Sant Columbus School Community
          </h1>
          <div className="pt-6 md:pt-12">
            <HorizontalLine width="15%" height="3px" color="rgb(239, 77, 72)" />
          </div>
        </div>
        <div className="md:w-1/2 md:pr-20 text-base sm:text-lg font-roboto text-customGray">
          <p>
            Welcome to St. Columbus School, where education meets excellence,
            and young minds are nurtured to achieve their fullest potential.
          </p>
          <p className="mt-5">
            At St. Columbus School, our vision is to inspire a generation of
            critical thinkers, responsible citizens, and lifelong learners.
          </p>
        </div>
      </div>

      {/* Principal Quote */}
      <div className="bg-reddishWhite">
        <div className="py-16 sm:py-20 md:py-28 px-4 md:px-20 flex flex-col md:flex-row gap-6 md:gap-24">
          <img
            src={princImg}
            alt="Principal"
            className="rounded-lg shadow-lg w-full md:w-[22rem] h-[20rem] sm:h-[25rem] md:h-[30rem] object-cover"
          />
          <div className="font-georgia flex flex-col justify-center">
            <FaQuoteLeft className="text-customRed1 text-3xl sm:text-4xl" />
            <h1 className="py-6 sm:py-8 md:py-10 italic text-3xl sm:text-4xl md:text-5xl leading-[2.5rem] sm:leading-[3rem] md:leading-[4rem] text-customGray">
              Everyday at the St Columbus School is like a blessing with the
              active students and talented staff members around.
            </h1>
            <span className="text-lg sm:text-xl md:text-2xl">
              Niranjan Kumar Sandilya - Principal
            </span>
          </div>
        </div>
      </div>

      {/* Missions */}
      <div className="px-4 md:px-20 py-10 md:py-16">
        <p className="font-georgia text-lg sm:text-xl font-bold text-center">
          Our St. Columbus School at a Glance
        </p>
        <div className="flex flex-wrap justify-between gap-4 sm:gap-8 md:gap-0 py-8 px-6 sm:px-14 md:py-12 font-roboto">
          <StatCard value="5C+" label="Current Enrollments" />
          <StatCard value="20+" label="Qualified Staffs" />
          <StatCard value="10+" label="Clubs & Activities" />
          <StatCard value="200+" label="Active PTFA Members" />
        </div>
        <div className="py-4 sm:py-8">
          <HorizontalLine
            width="100%"
            height="1px"
            color="rgb(220, 215, 215)"
          />
        </div>

        {/* Faculty Teachers Section */}
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-georgia text-center mb-6 sm:mb-8">
            Meet Our Faculty
          </h2>
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-lg"
            onClick={() => handleScroll("left")}
          >
            <FaChevronLeft className="text-lg sm:text-xl text-gray-600" />
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar px-4 sm:px-8"
            style={{ scrollbarWidth: "none" }}
          >
            {[
              { name: "Mrs. Julia Anderson", subject: "Mathematics", image: "https://source.unsplash.com/1600x900/?teacher,portrait" },
              { name: "Mr. David Green", subject: "Science", image: "https://source.unsplash.com/1600x900/?teacher,education" },
              { name: "Ms. Emily Clarke", subject: "History", image: "https://source.unsplash.com/1600x900/?teacher,school" },
              { name: "Mr. John Smith", subject: "English", image: "https://source.unsplash.com/1600x900/?teacher,classroom" },
              { name: "Mrs. Olivia Brown", subject: "Geography", image: "https://source.unsplash.com/1600x900/?teacher,learning" },
            ].map((teacher, index) => (
              <TeacherCard
                key={index}
                name={teacher.name}
                subject={teacher.subject}
                image={teacher.image}
              />
            ))}
          </div>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-lg"
            onClick={() => handleScroll("right")}
          >
            <FaChevronRight className="text-lg sm:text-xl text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
