import React from "react";
import { Link } from "react-router-dom";
import HorizontalLine from "../../components/HorizontalLine";
import heroImage from "../../assets/images/st-columbus.png"; // Add your hero image

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
                      <span className="text-4xl font-bold block mb-2">10+</span>
                      <span className="text-lg">Years of Excellence</span>
                    </div>
                    <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <span className="text-4xl font-bold block mb-2">99%</span>
                      <span className="text-lg">Pass Rate</span>
                    </div>
                    <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <span className="text-4xl font-bold block mb-2">2+</span>
                      <span className="text-lg">Acres Campus</span>
                    </div>
                    <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <span className="text-4xl font-bold block mb-2">
                        100+
                      </span>
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
        <div class="container mx-auto text-center text-white font-roboto">
          <p class="text-lg font-medium">
            St. Columbus School is in the process of seeking CBSE affiliation.
          </p>
          <p class="text-base">
            Stay tuned for further updates and developments!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
