import React from "react";

import Highlights from "../layouts/home/Highlights";
import Announcements from "../layouts/home/Announcements"
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
            title: "Rural Focus",
            text: "Dedicated to uplifting village communities through education"
          },
          {
            icon: "🌱",
            title: "Eco-Campus",
            text: "10-acre sustainable campus with organic farming"
          },
          {
            icon: "💻",
            title: "Digital Learning",
            text: "Smart classrooms with ICT facilities"
          }
        ]}
      />

      <Announcements
        items={[
          {
            date: "2023-11-25",
            title: "Admissions Open",
            text: "2024-25 session admissions now accepting applications"
          },
          {
            date: "2023-12-01",
            title: "Annual Day",
            text: "Join us for our cultural fest on December 15th"
          }
        ]}
      />

      <Gallery
        images={[
          { src: "/lab.jpg", alt: "Science Lab" },
          { src: "/library.jpg", alt: "Library" },
          { src: "/sports.jpg", alt: "Sports Ground" },
          { src: "/classroom.jpg", alt: "Smart Classroom" },
          { src: "/garden.jpg", alt: "School Garden" },
          { src: "/assembly.jpg", alt: "Morning Assembly" }
        ]}
      />

      <Testimonials
        items={[
          {
            text: "The teachers' dedication transformed my child's future",
            author: "Ramesh Sharma",
            role: "Parent of Class 8 student"
          },
          {
            text: "Best rural school with city-level facilities",
            author: "Dr. Anjali Verma",
            role: "Alumni (Batch 2010)"
          },
          {
            text: "Perfect balance of academics and values",
            author: "Sunita Devi",
            role: "Local Community Leader"
          }
        ]}
      />
    </div>
  );
};

export default Home;