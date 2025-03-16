import { useEffect, useState } from "react";
import axios from "axios";

const GalleryComps = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/gallery`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.error("Error fetching images", err);
      });
  }, []);

  return (
    <div className="py-16 px-4 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl max-[920px]:text-3xl font-bold text-center font-georgia text-customGray mb-12">
          Our Vibrant Campus
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.url}
                alt="Uploaded"
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
                src={selectedImage.url}
                alt="Uploaded"
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

export default GalleryComps;
