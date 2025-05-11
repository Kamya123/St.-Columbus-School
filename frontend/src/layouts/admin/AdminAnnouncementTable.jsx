import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminAnnouncementsTable = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ 
    date: "", 
    title: "", 
    text: "" 
  });
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/announcements`
      );
      setAnnouncements(res.data);
    } catch (error) {
      console.error("Error fetching announcements", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/announcements/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchAnnouncements();
      } catch (error) {
        console.error("Error deleting announcement", error);
      }
    }
  };

  const handleEdit = (announcement) => {
    setEditingId(announcement._id);
    setEditFormData({
      date: announcement.date,
      title: announcement.title,
      text: announcement.text
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/announcements/${editingId}`,
        editFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      setEditingId(null);
      fetchAnnouncements();
    } catch (error) {
      console.error("Error updating announcement", error);
    }
  };

  return (
    <div className="bg-reddishWhite p-8 rounded-lg shadow-lg">
      <div className="my-8 flex flex-col items-center md:flex-row md:justify-between">
        <h2 className="font-georgia text-xl md:text-3xl text-customGray">
          Manage Announcements
        </h2>
        <button
          onClick={() => navigate("/admin")}
          className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Back to Admin Panel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-customRed1">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Text</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {announcements.map((announcement) => (
              <tr key={announcement._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === announcement._id ? (
                    <input
                      type="date"
                      value={editFormData.date}
                      onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                      className="border rounded p-1"
                    />
                  ) : (
                    new Date(announcement.date).toLocaleDateString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === announcement._id ? (
                    <input
                      value={editFormData.title}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    announcement.title
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === announcement._id ? (
                    <textarea
                      value={editFormData.text}
                      onChange={(e) => setEditFormData({ ...editFormData, text: e.target.value })}
                      className="border rounded p-1 w-full"
                    />
                  ) : (
                    announcement.text
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === announcement._id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(announcement._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAnnouncementsTable;