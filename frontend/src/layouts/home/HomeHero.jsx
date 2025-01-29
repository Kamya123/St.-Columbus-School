import React from "react";
import { Link } from "react-router-dom";
import HorizontalLine from "../../components/HorizontalLine";
import heroImage from "../../assets/images/principal.jpg"; // Add your hero image

const HomeHero = () => {
  return (
    <div className="w-full relative">
      {/* Hero Image with Overlay */}
      <div className="relative h-screen max-h-[800px]">
        <img 
          src={heroImage} 
          alt="St. Columbus School Campus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="w-full pt-12 pb-16 px-[4.5rem] max-[768px]:px-6 max-[1115px]:px-10 text-white">
            <div className="max-w-6xl mx-auto">
              <div className="flex gap-[8%] max-[768px]:flex-col">
                {/* Left Column */}
                <div className="w-1/2 max-[768px]:w-full font-georgia">
                  <h1 className="text-6xl max-[920px]:text-[3rem] max-[544px]:text-4xl leading-snug mb-8">
                    Empowering Rural India Through Quality Education
                  </h1>
                  <div className="flex gap-6 max-[768px]:flex-col">
                    <Link 
                      to="/admission" 
                      className="bg-customRed1 text-white px-8 py-4 rounded-lg text-lg hover:bg-red-700 transition"
                    >
                      Apply Now
                    </Link>
                    <Link 
                      to="/academics" 
                      className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition"
                    >
                      Explore Academics
                    </Link>
                  </div>
                </div>

                {/* Right Column - Quick Stats */}
                <div className="w-1/2 max-[768px]:w-full max-[768px]:mt-12 flex items-center">
                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <span className="text-4xl font-bold block mb-2">25+</span>
                      <span className="text-lg">Years of Excellence</span>
                    </div>
                    <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <span className="text-4xl font-bold block mb-2">95%</span>
                      <span className="text-lg">Pass Rate</span>
                    </div>
                    <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <span className="text-4xl font-bold block mb-2">10+</span>
                      <span className="text-lg">Acres Campus</span>
                    </div>
                    <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <span className="text-4xl font-bold block mb-2">5K+</span>
                      <span className="text-lg">Successful Alumni</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="bg-customRed1 py-12">
        <div className="max-w-6xl mx-auto px-[4.5rem] max-[768px]:px-6 max-[1115px]:px-10">
          <div className="grid grid-cols-3 gap-8 max-[768px]:grid-cols-1">
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Free Education</h3>
              <p>For economically weaker students</p>
            </div>
            <div className="text-center text-white border-x max-[768px]:border-0">
              <h3 className="text-2xl font-bold mb-4">Solar Powered</h3>
              <p>Eco-friendly campus</p>
            </div>
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Digital Classes</h3>
              <p>Smart classroom facilities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;