// src/layouts/admin/AdminPanel.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  // States for gallery image upload
  const [file, setFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // States for announcement
  const [announcementData, setAnnouncementData] = useState({
    date: "",
    title: "",
    text: "",
  });
  const [announcementMessage, setAnnouncementMessage] = useState("");
  const [savingAnnouncement, setSavingAnnouncement] = useState(false);

  // States for Teachers Section
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    subject: "",
    image: null,
  });
  const [teacherUploading, setTeacherUploading] = useState(false);
  const [teacherMessage, setTeacherMessage] = useState("");

  // States for school info
  const [schoolInfo, setSchoolInfo] = useState({ title: "", description: "" });
  const [infoMessage, setInfoMessage] = useState("");
  const [savingInfo, setSavingInfo] = useState(false);

  // States for Public Mandatory Disclosure upload
  const [disclosureTitle, setDisclosureTitle] = useState("");
  const [disclosureFile, setDisclosureFile] = useState(null);
  const [disclosureMessage, setDisclosureMessage] = useState("");
  const [disclosureUploading, setDisclosureUploading] = useState(false);

  // --- new States for Section C (Results & Academics) ---
  const [resultTitle, setResultTitle] = useState("");
  const [resultFile, setResultFile] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [resultUploading, setResultUploading] = useState(false);

  // States for staff info
  const [staffInfo, setStaffInfo] = useState({ title: "", description: "" });
  const [staffInfoMessage, setStaffInfoMessage] = useState("");
  const [savingStaffInfo, setSavingStaffInfo] = useState(false);

  // States for schol infrastructure info
  const [schoolInfraInfo, setSchoolInfraInfo] = useState({ title: "", description: "" });
  const [schoolInfraInfoMessage, setSchoolInfraInfoMessage] = useState("");
  const [savingSchoolInfraInfo, setSavingSchoolInfraInfo] = useState(false);

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
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/uploads/gallery`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadedImageUrl(res.data.url);
      setUploadMessage("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploadMessage("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle Announcement Submit
  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setSavingAnnouncement(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/announcements`,
        announcementData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnnouncementMessage("Announcement saved successfully!");
      setAnnouncementData({ date: "", title: "", text: "" });
    } catch (error) {
      console.error("Error saving announcement:", error);
      setAnnouncementMessage("Error saving announcement.");
    } finally {
      setSavingAnnouncement(false);
    }
  };

  // Handle Teachers Section
  const handleTeacherImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", "teacher-profiles");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/uploads/teacher`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return res.data.image;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  // Update handleTeacherSubmit function
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    if (!newTeacher.image) return;
    setTeacherUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", newTeacher.image);

      // Upload to teacher-specific endpoint
      const uploadRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/uploads/teacher`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Create teacher record with uploaded image data
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/teachers`,
        {
          name: newTeacher.name,
          subject: newTeacher.subject,
          image: uploadRes.data.image.url,
          public_id: uploadRes.data.image.public_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTeacherMessage("Teacher added successfully!");
      setNewTeacher({ name: "", subject: "", image: null });
    } catch (error) {
      console.error("Error adding teacher:", error);
      setTeacherMessage("Error adding teacher");
    } finally {
      setTeacherUploading(false);
    }
  };

  // Handle school info submission
  const handleSchoolInfoSubmit = async (e) => {
    e.preventDefault();
    setSavingInfo(true);
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
    } finally {
      setSavingInfo(false);
    }
  };

  // Handle Public Mandatory Disclosure upload
  const handleDisclosureUpload = async (e) => {
    e.preventDefault();
    if (!disclosureTitle || !disclosureFile) return;
    setDisclosureUploading(true);
    const formData = new FormData();
    formData.append("title", disclosureTitle);
    formData.append("document", disclosureFile);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/disclosure`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setDisclosureMessage("Disclosure uploaded successfully!");
      // Optionally, clear the form
      setDisclosureTitle("");
      setDisclosureFile(null);
    } catch (error) {
      console.error("Disclosure upload failed:", error);
      setDisclosureMessage("Disclosure upload failed. Please try again.");
    } finally {
      setDisclosureUploading(false);
    }
  };

  // --- new handler: upload Results & Academics ---
  const handleResultsUpload = async (e) => {
    e.preventDefault();
    if (!resultTitle || !resultFile) return;
    setResultUploading(true);

    const formData = new FormData();
    formData.append("title", resultTitle);
    formData.append("document", resultFile);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/results`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResultMessage("Results uploaded successfully!");
      setResultTitle("");
      setResultFile(null);
    } catch (err) {
      console.error("Error uploading results:", err);
      setResultMessage("Upload failed. Please try again.");
    } finally {
      setResultUploading(false);
    }
  };

  // Handle staff info submission
  const handleStaffInfoSubmit = async (e) => {
    e.preventDefault();
    setSavingStaffInfo(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/staffs`,
        staffInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStaffInfoMessage("Staff information saved successfully!");
      setStaffInfo({ title: "", description: "" });
    } catch (error) {
      console.error("Error saving staff info:", error);
      setStaffInfoMessage("Error saving staff information.");
    } finally {
      setSavingStaffInfo(false);
    }
  };

  // Handle staff info submission
  const handleSchoolInfraInfoSubmit = async (e) => {
    e.preventDefault();
    setSavingSchoolInfraInfo(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/schoolinfra`,
        schoolInfraInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSchoolInfraInfoMessage("School Infrastructure information saved successfully!");
      setSchoolInfraInfo({ title: "", description: "" });
    } catch (error) {
      console.error("Error saving school infrastructure info:", error);
      setSchoolInfraInfoMessage("Error saving school infrastructure information.");
    } finally {
      setSavingSchoolInfraInfo(false);
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

          <div className="w-full flex justify-between gap-16 max-[768px]:flex-col">
            <div className="w-1/2 max-[768px]:w-full flex flex-col gap-16">
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
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      disabled={uploading}
                      className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {uploading ? "Uploading..." : "Upload Image"}
                    </button>
                    {/* View Gallery Button */}
                    <button
                      onClick={() => navigate("/admin/gallery")}
                      className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      View Gallery
                    </button>
                  </div>
                </form>
                {/* Display upload message */}
                {uploadMessage && (
                  <div className="mt-6">
                    <p className="text-green-600 font-medium">
                      {uploadMessage}
                    </p>
                  </div>
                )}
              </section>

              {/* Announcement Section */}
              <section className="font-roboto">
                <h2 className="font-georgia text-3xl text-customGray mb-8">
                  Add New Announcement
                </h2>
                <form onSubmit={handleAnnouncementSubmit}>
                  <div className="mb-4">
                    <input
                      type="date"
                      value={announcementData.date}
                      onChange={(e) =>
                        setAnnouncementData({
                          ...announcementData,
                          date: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md transition outline-none focus:ring-1 focus:ring-customRed1"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={announcementData.title}
                      onChange={(e) =>
                        setAnnouncementData({
                          ...announcementData,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md transition outline-none focus:ring-1 focus:ring-customRed1"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Announcement Text"
                      value={announcementData.text}
                      onChange={(e) =>
                        setAnnouncementData({
                          ...announcementData,
                          text: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md h-32 transition outline-none focus:ring-1 focus:ring-customRed1"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={savingAnnouncement}
                      className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {savingAnnouncement ? "Saving..." : "Save Announcement"}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/admin/announcements")}
                      className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      Manage Announcements
                    </button>
                  </div>
                </form>
                {announcementMessage && (
                  <p className="mt-4 text-green-600">{announcementMessage}</p>
                )}
              </section>

              {/* Teacher's Section */}
              <section className="font-roboto">
                <h2 className="font-georgia text-3xl text-customGray mb-8">
                  Add New Teacher
                </h2>
                <form onSubmit={handleTeacherSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Teacher Name"
                        value={newTeacher.name}
                        onChange={(e) =>
                          setNewTeacher({ ...newTeacher, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-md transition outline-none focus:ring-1 focus:ring-customRed1"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Subject"
                        value={newTeacher.subject}
                        onChange={(e) =>
                          setNewTeacher({
                            ...newTeacher,
                            subject: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border rounded-md transition outline-none focus:ring-1 focus:ring-customRed1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <input
                        type="file"
                        onChange={(e) =>
                          setNewTeacher({
                            ...newTeacher,
                            image: e.target.files[0],
                          })
                        }
                        className="w-full px-4 py-2 border rounded-md transition outline-none focus:ring-1 focus:ring-customRed1"
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex gap-4">
                    <button
                      type="submit"
                      disabled={teacherUploading}
                      className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {teacherUploading ? "Uploading..." : "Add Teacher"}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/admin/teachers")}
                      className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      Manage Teachers
                    </button>
                  </div>
                </form>
                {teacherMessage && (
                  <p className="mt-4 text-green-600">{teacherMessage}</p>
                )}
              </section>
            </div>

            <div className="w-1/2 max-[768px]:w-full flex flex-col gap-16">
              {/* Add School Information Section */}
              <section className="font-roboto">
                <h2 className="font-georgia text-3xl text-customGray mb-8">
                  A: School Information
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
                      disabled={savingInfo}
                      className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {savingInfo ? "Saving..." : "Save Information"}
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
                  <p className="mt-4 text-center text-lg text-green-600">
                    {infoMessage}
                  </p>
                )}
              </section>

              {/* B: Upload Public Mandatory Disclosure */}
              <section className="font-roboto">
                <h2 className="font-georgia text-3xl text-customGray mb-8">
                  B: Documents and Information
                </h2>
                <form onSubmit={handleDisclosureUpload}>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={disclosureTitle}
                      onChange={(e) => setDisclosureTitle(e.target.value)}
                      className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="file"
                      onChange={(e) => setDisclosureFile(e.target.files[0])}
                      className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
                      accept=".pdf, image/*, .doc, .docx"
                    />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      disabled={disclosureUploading}
                      className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {disclosureUploading
                        ? "Uploading..."
                        : "Upload Disclosure"}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/admin/disclosure")}
                      className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      View Disclosure
                    </button>
                  </div>
                </form>
                {disclosureMessage && (
                  <div className="mt-6">
                    <p className="text-green-600 font-medium">
                      {disclosureMessage}
                    </p>
                  </div>
                )}
              </section>

              {/* C: Results and Academics */}
              <section className="font-roboto">
                <h2 className="font-georgia text-3xl text-customGray mb-8">
                  C: Results and Academics
                </h2>
                <form onSubmit={handleResultsUpload}>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={resultTitle}
                      onChange={(e) => setResultTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-customRed1 transition"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="file"
                      accept=".pdf, image/*, .doc, .docx"
                      onChange={(e) => setResultFile(e.target.files[0])}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-customRed1 transition"
                    />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      disabled={resultUploading}
                      className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {resultUploading ? "Uploading…" : "Upload Results"}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/admin/results")}
                      className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      View Results
                    </button>
                  </div>
                </form>
                {resultMessage && (
                  <p className="mt-4 text-green-600">{resultMessage}</p>
                )}
              </section>

              {/* D: Staff (Teaching) */}
              <section className="font-roboto">
                <h2 className="font-georgia text-3xl text-customGray mb-8">
                  D: Staff (Teaching)
                </h2>
                <form onSubmit={handleStaffInfoSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={staffInfo.title}
                      onChange={(e) =>
                        setStaffInfo({ ...staffInfo, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Description"
                      value={staffInfo.description}
                      onChange={(e) =>
                        setStaffInfo({
                          ...staffInfo,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1 h-32"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={savingStaffInfo}
                      className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {savingStaffInfo ? "Saving..." : "Save Information"}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/admin/staffinfo")}
                      className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      View Staff Info
                    </button>
                  </div>
                </form>
                {staffInfoMessage && (
                  <p className="mt-4 text-center text-lg text-green-600">
                    {staffInfoMessage}
                  </p>
                )}
              </section>

              {/* E: School Infrastructure */}
              <section className="font-roboto">
                <h2 className="font-georgia text-3xl text-customGray mb-8">
                  E: School Infrastructure
                </h2>
                <form onSubmit={handleSchoolInfraInfoSubmit}>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Title"
                      value={schoolInfraInfo.title}
                      onChange={(e) =>
                        setSchoolInfraInfo({ ...schoolInfraInfo, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Description"
                      value={schoolInfraInfo.description}
                      onChange={(e) =>
                        setSchoolInfraInfo({
                          ...schoolInfraInfo,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1 h-32"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={savingSchoolInfraInfo}
                      className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                    >
                      {savingSchoolInfraInfo ? "Saving..." : "Save Information"}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/admin/schoolinfra")}
                      className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                      View Infrastructure
                    </button>
                  </div>
                </form>
                {schoolInfraInfoMessage && (
                  <p className="mt-4 text-center text-lg text-green-600">
                    {schoolInfraInfoMessage}
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
