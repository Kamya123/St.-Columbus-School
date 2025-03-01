// src/layouts/admin/AdminGallery.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/gallery`);
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/gallery/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteMessage("Image deleted successfully!");
      // Update the images list by filtering out the deleted image
      setImages(images.filter((img) => img._id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
      setDeleteMessage("Failed to delete image.");
    }
  };

  return (
    <div className="admin-gallery px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Gallery Images</h2>
      {deleteMessage && (
        <p className="mb-4 text-green-600">{deleteMessage}</p>
      )}
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image._id} className="relative border p-2 rounded shadow">
            <img src={image.url} alt="Gallery" className="w-full h-auto" />
            <button
              onClick={() => handleDelete(image._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button
          onClick={() => navigate("/admin")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Back to Admin Panel
        </button>
      </div>
    </div>
  );
};

export default AdminGallery;
