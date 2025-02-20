// frontend/src/components/Gallery.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const GalleryComps = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/gallery`)
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.error("Error fetching images", err);
      });
  }, []);

  return (
    <div>
      <h2>Public Mandatory Disclosure</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {images.map(image => (
          <div key={image._id}>
            <img src={image.url} alt="Uploaded" width={200} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryComps;
