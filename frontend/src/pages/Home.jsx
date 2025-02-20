import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import computerLab from "../../src/assets/images/computer-lab.jpg";
import garden from "../../src/assets/images/garden.jpg";
import sportsGround from "../../src/assets/images/sports-ground.jpeg";
import classroom from "../../src/assets/images/classroom.jpg";
import playArea from "../../src/assets/images/play-area.jpeg";
import morningAssembly from "../../src/assets/images/morning-assembly.jpeg";

import HomeHero from "../layouts/home/HomeHero";
import Highlights from "../layouts/home/Highlights";
import Announcements from "../layouts/home/Announcements";
import Gallery from "../layouts/home/Gallery";
import Testimonials from "../layouts/home/Testimonials";
import SchoolInfoTable from "../layouts/admin/SchoolInfoTable";

const Home = () => {
  const [disclosures, setDisclosures] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/uploads/disclosure")
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.error(err));
  //   // .then(({ data }) => setDisclosures(data));
  // }, []);

  return (
    <div className="home-page">
      {/* HomeHero with a fade-in from above */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <HomeHero />
      </motion.div>

      {/* <div>
        <h2>Public Mandatory Disclosure</h2>
        {disclosures.map((d) => (
          <div key={d._id}>
            <p>{d.title}</p>
            <a href={d.fileUrl} download>
              Download
            </a>
          </div>
        ))}
      </div> */}

      {/* School Info Section */}
      <div className="py-16 px-[4.5rem] max-[768px]:px-6 max-[1115px]:px-10 bg-white">
        <SchoolInfoTable />
      </div>

      {/* Highlights with a slide-in from the left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Highlights
          items={[
            {
              icon: "🏫",
              title: "CBSE Affiliation",
              text: "St. Columbus School is in the process of seeking CBSE affiliation.",
            },
            {
              icon: "🖥️",
              title: "Computer Lab",
              text: "A well-equipped Computer Lab for classes 1 to 8.",
            },
            {
              icon: "🗣️",
              title: "English Speaking & GK",
              text: "Dedicated programs for English Speaking and General Knowledge.",
            },
            {
              icon: "📚",
              title: "Curriculum",
              text: "Follows a structured CBSE curriculum with a focus on holistic development.",
            },
            {
              icon: "👨‍🏫",
              title: "Qualified Faculty",
              text: "Experienced and dedicated teaching staff committed to student success.",
            },
            {
              icon: "🎓",
              title: "Extra-Curricular Activities",
              text: "Varied activities like sports, music, dance, and art to promote overall development.",
            },
          ]}
        />
      </motion.div>

      {/* Announcements with a slide-in from the right */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Announcements
          items={[
            {
              date: "2025-02-01",
              title: "Admissions Open for 2025-26",
              text: "Now accepting applications for the 2025-26 academic session. Apply today!",
            },
            {
              date: "2025-04-01",
              title: "New Syllabus Starting Date",
              text: "The new syllabus for the upcoming academic year will begin on April 1st, 2025.",
            },
            {
              date: "2025-04-01",
              title: "Class Starting Date",
              text: "Classes for the 2025-26 academic session will commence from April 1st, 2025.",
            },
            {
              date: "2025-03-01",
              title: "Yearly Exams",
              text: "The yearly exams for all classes will start from March 1st, 2025.",
            },
          ]}
        />
      </motion.div>

      {/* Gallery with a subtle zoom-in effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Gallery
          images={[
            { src: computerLab, alt: "Computer Lab" },
            { src: garden, alt: "School Garden" },
            { src: sportsGround, alt: "Sports Ground" },
            { src: classroom, alt: "Classroom" },
            { src: playArea, alt: "Play Area" },
            { src: morningAssembly, alt: "Morning Assembly" },
          ]}
        />
      </motion.div>

      {/* Testimonials with a fade-in from below */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <Testimonials
          items={[
            {
              text: "The nurturing environment at St. Columbus gave me the confidence to chase my dreams. From academics to extracurriculars, every experience here prepared me for the future. Forever grateful! 🙌🎓",
              author: "Rahul Sharma",
              role: "Alumni (Batch 20XX)",
            },
            {
              text: "Studying at St. Columbus was a transformative experience. The school's dedication to excellence and holistic development helped shape my career and character. The supportive faculty and city-level infrastructure in a rural setting made learning truly enriching! 🎓❤️",
              author: "Kamya Kumari",
              role: "Alumni (Batch 2017)",
            },
            {
              text: "St. Columbus is more than just a school; it's a second home. The guidance and values instilled here continue to shape my personal and professional journey. Proud to be an alumnus! 💙📖",
              author: "Sneha Patel",
              role: "Alumni (Batch 20XX)",
            },
          ]}
        />
      </motion.div>
    </div>
  );
};

export default Home;
