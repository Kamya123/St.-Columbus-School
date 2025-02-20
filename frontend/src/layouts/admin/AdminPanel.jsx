// src/layouts/admin/AdminPanel.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [schoolInfo, setSchoolInfo] = useState({ title: "", description: "" });
  const [infoMessage, setInfoMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/uploads`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadedImageUrl(res.data.url);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  // Handle school info submission
  const handleSchoolInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/schoolinfo`,
        schoolInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInfoMessage("School information saved successfully!");
      setSchoolInfo({ title: "", description: "" });
    } catch (error) {
      console.error("Error saving school info:", error);
      setInfoMessage("Error saving school information.");
    }
  };

  return (
    <div className="admin-page">
      {/* Hero Section */}
      <div className="w-full pt-12 pb-16 px-[4.5rem] max-[768px]:px-6 max-[1115px]:px-10 bg-customRed1 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-georgia text-6xl max-[920px]:text-[3rem] max-[544px]:text-4xl leading-snug mb-8">
            Admin Panel
          </h1>
          <div className="w-24 border-b-2 border-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 px-[4.5rem] max-[768px]:px-6 max-[1115px]:px-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-end mb-8">
            <button
              onClick={handleLogout}
              className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-2 gap-16 max-[768px]:grid-cols-1">
            {/* Upload Image Section */}
            <section className="font-roboto">
              <h2 className="font-georgia text-3xl text-customGray mb-8">
                Upload Image to Gallery
              </h2>
              <form onSubmit={handleImageUpload}>
                <div className="mb-4">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
                >
                  Upload Image
                </button>
              </form>
              {uploadedImageUrl && (
                <div className="mt-6">
                  <p className="mb-2">Uploaded Image:</p>
                  <img
                    src={uploadedImageUrl}
                    alt="Uploaded"
                    width={200}
                    className="rounded-lg shadow-md"
                  />
                </div>
              )}
            </section>

            {/* Add School Information Section */}
            <section className="font-roboto">
              <h2 className="font-georgia text-3xl text-customGray mb-8">
                Add School Information
              </h2>
              <form onSubmit={handleSchoolInfoSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={schoolInfo.title}
                    onChange={(e) =>
                      setSchoolInfo({ ...schoolInfo, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Description"
                    value={schoolInfo.description}
                    onChange={(e) =>
                      setSchoolInfo({
                        ...schoolInfo,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1 h-32"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
                  >
                    Save Information
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/admin/schoolinfo")}
                    className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
                  >
                    View School Info
                  </button>
                </div>
              </form>
              {infoMessage && (
                <p className="mt-4 text-center text-lg text-customRed1">
                  {infoMessage}
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
