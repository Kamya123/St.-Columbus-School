import React from "react";

import Highlights from "../layouts/home/Highlights";
import Announcements from "../layouts/home/Announcements";
import Gallery from "../layouts/home/Gallery";
import Testimonials from "../layouts/home/Testimonials";
import HomeHero from "../layouts/home/HomeHero";

const Home = () => {
  return (
    <div className="home-page">
      <HomeHero />

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

      <Gallery
        images={[
          { src: "/computer-lab.jpg", alt: "Computer Lab" },
          { src: "/garden.jpg", alt: "School Garden" },
          { src: "/sports-ground.jpg", alt: "Sports Ground" },
          { src: "/classroom.jpg", alt: "Classroom" },
          { src: "/play-area.jpg", alt: "Play Area" },
          { src: "/morning-assembly.jpg", alt: "Morning Assembly" },
        ]}
      />

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
    </div>
  );
};

export default Home;
