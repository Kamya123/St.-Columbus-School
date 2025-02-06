import React from "react";
import { motion } from "framer-motion";

import HomeHero from "../layouts/home/HomeHero";
import Highlights from "../layouts/home/Highlights";
import Announcements from "../layouts/home/Announcements";
import Gallery from "../layouts/home/Gallery";
import Testimonials from "../layouts/home/Testimonials";

const Home = () => {
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
            {
              src: "../../src/assets/images/computer-lab.jpg",
              alt: "Computer Lab",
            },
            {
              src: "../../src/assets/images/garden.jpg",
              alt: "School Garden",
            },
            {
              src: "../../src/assets/images/sports-ground.jpeg",
              alt: "Sports Ground",
            },
            {
              src: "../../src/assets/images/classroom.jpg",
              alt: "Classroom",
            },
            {
              src: "../../src/assets/images/play-area.jpeg",
              alt: "Play Area",
            },
            {
              src: "../../src/assets/images/morning-assembly.jpeg",
              alt: "Morning Assembly",
            },
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
              text: "The teachers' dedication transformed my child's future",
              author: "Ramesh Sharma",
              role: "Parent of Class 8 student",
            },
            {
              text: "Best rural school with city-level facilities",
              author: "Dr. Anjali Verma",
              role: "Alumni (Batch 2010)",
            },
            {
              text: "Perfect balance of academics and values",
              author: "Sunita Devi",
              role: "Local Community Leader",
            },
          ]}
        />
      </motion.div>
    </div>
  );
};

export default Home;
