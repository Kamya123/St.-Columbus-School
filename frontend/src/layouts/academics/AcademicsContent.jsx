import { motion } from "framer-motion";

const academicsData = [
  {
    title: "Pre-Primary (Nursery, LKG & UKG)",
    items: [
      "Play-based learning that fosters motor, social, and cognitive skills.",
      "Interactive storytelling, art, and music sessions.",
      "Early numeracy and literacy exercises.",
    ],
    reverse: false,
    delay: 0,
  },
  {
    title: "Primary & Middle School (Classes 1 to 8)",
    items: [
      "Strong foundation in core subjects: English, Hindi, Mathematics, EVS, and Social Science.",
      "Emphasis on General Knowledge and English Speaking to build confidence.",
      "Well-equipped Computer Lab for practical digital literacy and basic programming.",
    ],
    reverse: true,
    delay: 0.2,
  },
  {
    title: "Secondary Education (Classes 9 & 10)",
    items: [
      "Comprehensive curriculum including Mathematics, Science, Social Science, English, and Hindi.",
      "Emphasis on conceptual clarity and analytical thinking.",
    ],
    reverse: false,
    delay: 0.4,
  },
  {
    title: "Teaching Methodology",
    items: [
      "Interactive, activity-based learning with group discussions and hands-on projects.",
      "Use of real-life examples to make abstract concepts tangible.",
      "Personalized attention in small classes.",
    ],
    reverse: true,
    delay: 0.6,
  },
  {
    title: "Assessment & Evaluation",
    items: [
      "Periodic tests, assignments, and projects to monitor progress.",
      "Oral evaluations and interactive sessions to reinforce learning.",
      "A supportive, stress-free evaluation approach.",
    ],
    reverse: false,
    delay: 0.8,
  },
  {
    title: "Why Choose St. Columbus School?",
    items: [
      "CBSE-aligned curriculum with a focus on holistic development.",
      "Experienced and supportive faculty.",
      "Emphasis on digital literacy through our Computer Lab.",
      "Enhanced English speaking and general knowledge programs.",
      "Commitment to excellence as we pursue CBSE affiliation.",
    ],
    reverse: true,
    delay: 1.0,
  },
];

export default function AcademicsContent() {
  return (
    <div className="pt-12 px-24 max-[768px]:px-10 max-[1115px]:px-10">
      <h2 className="text-4xl max-[920px]:text-3xl font-bold text-center font-georgia text-customGray mb-12">
        Academics at St. Columbus School
      </h2>

      {academicsData.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: section.delay }}
          viewport={{ once: true }}
          className={`flex flex-col md:flex-row items-center gap-8 mb-16 max-[920px]:mb-12 ${
            section.reverse ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Content Column */}
          <div className="md:w-1/2">
            <h3 className="text-3xl max-[920px]:text-2xl font-georgia text-customGray mb-2">
              {section.title}
            </h3>
            <div className="w-20 border-b-2 border-customRed1 mb-4" />
            <ul className="list-none space-y-2 max-[544px]:text-[15px] max-[920px]:text-base font-roboto text-lg text-customGray">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-3 h-3 bg-customRed1 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Spacer Column (empty for now; can be used for images or additional content) */}
          <div className="md:w-1/2"></div>
        </motion.div>
      ))}
    </div>
  );
}
