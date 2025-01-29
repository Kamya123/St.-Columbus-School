import React, { useState } from "react";
// import HorizontalLine from "./HorizontalLine";

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="py-16 px-4 md:px-20 bg-reddishWhite">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-georgia text-3xl text-customGray font-semibold text-center mb-12">
          Our Vibrant Campus
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors rounded-lg" />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-8 right-0 text-white text-4xl"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;