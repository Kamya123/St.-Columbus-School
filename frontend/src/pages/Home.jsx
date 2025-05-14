import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

import chemLab from "../../src/assets/images/chem-lab-1.jpg";
import bioLab from "../../src/assets/images/bio-lab.jpg";
import phyLab from "../../src/assets/images/phy-lab.jpg";
import playArea from "../../src/assets/images/play-area.jpeg";
import library from "../../src/assets/images/library.jpg";
import assembly from "../../src/assets/images/assembly.jpg";

import HomeHero from "../layouts/home/HomeHero";
import Highlights from "../layouts/home/Highlights";
import Announcements from "../layouts/home/Announcements";
import Gallery from "../layouts/home/Gallery";
import Testimonials from "../layouts/home/Testimonials";
import SchoolInfoTable from "../layouts/admin/SchoolInfoTable";
import PublicMandatoryDisclosure from "../layouts/admin/PublicMandatoryDisclosure";
import ResultsAcademics from "../layouts/admin/ResultsAcademics";
import StaffTable from "../layouts/admin/StaffTable";
import SchoolInfrastructureTable from "../layouts/admin/SchoolInfrastructureTable";

const Home = () => {
  const [disclosures, setDisclosures] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/announcements`)
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setAnnouncements(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/uploads/disclosure")
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.error(err));
  //   // .then(({ data }) => setDisclosures(data));
  // }, []);

  return (
    <div className="home-page overflow-hidden">
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
      <div className="pt-16 px-[4.5rem] max-[768px]:px-2 max-[1115px]:px-10 bg-white">
        <SchoolInfoTable />
      </div>

      {/* Public Mandatory Disclosure */}
      <div className="px-[4.5rem] max-[768px]:px-2 max-[1115px]:px-10 bg-white">
        <PublicMandatoryDisclosure />
      </div>

      {/* C: Results and Academics */}
      <div className="pb-8 px-[4.5rem] max-[768px]:px-2 max-[1115px]:px-10 bg-white">
        <ResultsAcademics />
      </div>

      {/* D: Staff(Teaching) */}
      <div className="pb-8 px-[4.5rem] max-[768px]:px-2 max-[1115px]:px-10 bg-white">
        <StaffTable />
      </div>

      {/* E: School Infratructure */}
      <div className="pb-16 px-[4.5rem] max-[768px]:px-2 max-[1115px]:px-10 bg-white">
        <SchoolInfrastructureTable />
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
        <Announcements items={announcements} />
        {/* <Announcements
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
        /> */}
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
            { src: chemLab, alt: "Chemistry Lab", title: "Chemistry Lab" },
            { src: bioLab, alt: "Biology Lab", title: "Biology Lab" },
            { src: phyLab, alt: "Physics Lab", title: "Physics Lab" },
            { src: library, alt: "Library", title: "Library" },
            { src: playArea, alt: "Play Area", title: "Play Area" },
            {
              src: assembly,
              alt: "Morning Assembly",
              title: "Morning Assembly",
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
              text: "I still remember my first day at St. Columbus—nervous, excited, and curious. Thanks to the warm teachers and endless encouragement, I found my voice in debate club and aced my board exams. This school didn’t just teach me facts; it taught me confidence and community. Forever grateful! 🎉",
              author: "Kamya Kumari",
              role: "Alumni (Batch 2017)",
            },
            {
              text: "Growing up in a rural town, I never imagined I’d perform on a stage at a city‐level fest. St. Columbus gave me the chance—and the support—to shine in drama and music. The lessons I learned here go far beyond books; they’re life lessons I carry with me every day. ❤️",
              author: "Priyam Kumari",
              role: "Alumni (Batch 2017)",
            },
            {
              text: "To me, St. Columbus has always been a second home. The mentors here believed in me—sometimes more than I believed in myself—and helped me turn my passion for coding into a real project. I’m proud to call myself a Columbus member and to stay connected with this incredible community. 💻✨",
              author: "Amit Kumar Arya",
              role: "Alumni (Batch 2017)",
            },
          ]}
        />
      </motion.div>
    </div>
  );
};

export default Home;
