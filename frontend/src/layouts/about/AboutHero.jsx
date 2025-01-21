import React from "react";
import HorizontalLine from "../../components/HorizontalLine";
import princImg from "../../assets/images/principal.jpg";
import { FaQuoteLeft } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "../../components/Card";

const cardData = [
  {
    title: "Academic Excellence",
    content:
      "Our rigorous curriculum fosters critical thinking and prepares students for future academic challenges. We integrate modern teaching methods and technology to create an engaging learning environment.",
    detail:
      "Focus on STEM, arts, and humanities to prepare well-rounded scholars.",
  },
  {
    title: "Personalized Attention",
    content:
      "Every student is unique, and we believe in personalized learning. Our teachers provide tailored support to address individual strengths and weaknesses, ensuring that each child thrives at their own pace.",
    detail:
      "One-on-one attention ensures no child gets left behind in their educational journey.",
  },
  {
    title: "Holistic Development",
    content:
      "Beyond academics, we nurture creativity, leadership, and emotional intelligence. Our extracurricular programs, including sports, music, and community service, ensure students grow as well-rounded individuals.",
    detail:
      "Encouraging a balance of academic success and personal growth through diverse activities.",
  },
];

const StatCard = ({ value, label }) => (
  <div className="text-center">
    <span className="text-7xl max-[768px]:font-semibold max-[768px]:text-4xl max-[1024px]:text-5xl text-customRed1 font-bold">
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
      <div className="w-full pt-12 pb-16 px-[4.5rem] max-[768px]:px-6 max-[768px]:flex-col max-[1115px]:px-10 flex gap-[8%] bg-transparent text-customGray">
        <div className="w-1/2 font-georgia max-[768px]:w-full">
          <h1 className="text-6xl max-[920px]:text-[3rem] max-[544px]:text-4xl leading-snug">
            Sant Columbus School Community
          </h1>
          <div className="pt-12 max-[768px]:pt-6">
            <HorizontalLine width="15%" height="3px" color="rgb(239, 77, 72)" />
          </div>
        </div>
        <div className="w-1/2 max-[544px]:text-[15px] max-[544px]:leading-6 max-[768px]:pt-10 max-[768px]:w-full max-[768px]:leading-7 max-[920px]:text-base lg:pr-20 text-lg font-roboto">
          <p>
            Welcome to St. Columbus School, where education meets excellence,
            and young minds are nurtured to achieve their fullest potential.
            Since our establishment in 2011, we have been dedicated to providing
            quality education that not only emphasizes academic achievement but
            also focuses on the holistic development of every student.
          </p>
          <p className="mt-5">
            At St. Columbus School, our vision is to inspire a generation of
            critical thinkers, responsible citizens, and lifelong learners. We
            aim to create a nurturing environment where students are empowered
            to excel in their passions and contribute positively to society.
          </p>
        </div>
      </div>

      {/* Principal Quote */}
      <div className="bg-reddishWhite">
        <div className="py-24 md:px-10 lg:px-20 flex gap-[6%] max-[768px]:pt-0 max-[768px]:pb-10 max-[768px]:block">
          <div className="max-[768px]:px-[8%] max-[768px]:flex max-[768px]:justify-center">
            <img
              src={princImg}
              alt="Principal"
              className="w-[70em] h-[30rem] rounded-lg shadow-lg max-[768px]:w-[22rem] max-[768px]:h-[30rem] object-cover max-[1024px]:w-[44em] max-[1024px]:h-[22em]"
            />
          </div>
          <div className="font-georgia flex flex-col justify-center max-[768px]:px-6 max-[768px]:gap-5 max-[768px]:pt-5">
            <FaQuoteLeft className="text-customRed1 text-4xl max-[768px]:text-2xl max-[1024px]:text-3xl" />
            <h1 className="md:py-10 italic text-5xl leading-[4rem] text-customGray max-[768px]:text-2xl max-[1024px]:text-3xl">
              Everyday at the St Columbus School is like a blessing with the
              active students and talented staff members around.
            </h1>
            <span className="text-2xl">
              Niranjan Kumar Sandilya - Principal
            </span>
          </div>
        </div>
      </div>

      {/* Why Choose Us? Section */}
      <div className="py-16 px-4 md:px-20">
        <h2 className="font-georgia text-3xl max-[768px]:text-2xl font-semibold text-center mb-10 text-customGray">
          Why Choose St. Columbus School?
        </h2>
        <div className="grid min-[1116px]:grid-cols-3 gap-12 max-[1115px]:w-[70%] max-[1115px]:mx-auto content-center">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              content={card.content}
              detail={card.detail}
            />
          ))}
        </div>
      </div>

      {/* Missions */}
      <div className="px-4 md:px-20 py-10 md:py-16 bg-reddishWhite">
        <p className="font-georgia text-xl sm:text-lg font-bold text-center">
          Our St. Columbus School at a Glance
        </p>
        <div className="grid grid-cols-2 justify-between gap-10 md:gap-14 py-8 px-6 font-roboto">
          <StatCard value="500+" label="Current Enrollments" />
          <StatCard value="20+" label="Qualified Staffs" />
          <StatCard value="10+" label="Clubs & Activities" />
          <StatCard value="200+" label="Active PTFA Members" />
        </div>
      </div>

      {/* <div className="py-4 sm:py-8">
          <HorizontalLine
            width="100%"
            height="1px"
            color="rgb(220, 215, 215)"
          />
        </div> */}

      {/* Faculty Teachers Section */}
      <div className="px-4 md:px-20 py-10 md:py-16">
        <div className="relative">
          <h2 className="font-georgia text-xl sm:text-lg font-bold text-center pb-6">
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
              {
                name: "Mrs. Julia Anderson",
                subject: "Mathematics",
                image: "https://source.unsplash.com/1600x900/?teacher,portrait",
              },
              {
                name: "Mr. David Green",
                subject: "Science",
                image:
                  "https://source.unsplash.com/1600x900/?teacher,education",
              },
              {
                name: "Ms. Emily Clarke",
                subject: "History",
                image: "https://source.unsplash.com/1600x900/?teacher,school",
              },
              {
                name: "Mr. John Smith",
                subject: "English",
                image:
                  "https://source.unsplash.com/1600x900/?teacher,classroom",
              },
              {
                name: "Mrs. Olivia Brown",
                subject: "Geography",
                image: "https://source.unsplash.com/1600x900/?teacher,learning",
              },
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
