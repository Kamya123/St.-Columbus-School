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
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/gallery`
      );
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleDelete = async (imageId) => {
    // Ask for admin confirmation before deletion
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/gallery/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeleteMessage("Image deleted successfully!");
      // Update the images list by filtering out the deleted image
      setImages(images.filter((img) => img._id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
      setDeleteMessage("Failed to delete image.");
    }
  };

  return (
    <div className="py-16 px-4 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="my-8 flex flex-col items-center md:flex-row md:justify-between">
          <h2 className="font-georgia text-xl md:text-3xl text-customGray">
            Manage Gallery Images (Admin)
          </h2>
          <button
            onClick={() => navigate("/admin")}
            className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Back to Admin Panel
          </button>
        </div>
        {deleteMessage && (
          <p className="mb-4 text-green-600 text-center">{deleteMessage}</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="relative group cursor-pointer border p-2 rounded-lg shadow"
            >
              <img
                src={image.url}
                alt="Gallery"
                className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition-transform"
              />
              <button
                onClick={() => handleDelete(image._id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
