import React, { useState } from "react";

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="py-16 px-4 md:px-20 bg-reddishWhite">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl max-[920px]:text-3xl font-bold text-center font-georgia text-customGray mb-12">
          Our Vibrant Campus
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              {/* the image */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-transform"
              />

              {/* dark overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors rounded-lg" />

              {/* title caption */}
              <div className="absolute bottom-0 left-0 w-full px-2 py-1 bg-black/60 text-white text-center rounded-b-lg">
                {img.title}
              </div>
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
              {/* also show title in lightbox */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded">
                {selectedImage.title}
              </div>
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
