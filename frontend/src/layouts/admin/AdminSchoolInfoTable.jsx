// frontend/src/components/AdminSchoolInfoTable.jsx

import { useState, useEffect } from "react";
import axios from "axios";

const AdminSchoolInfoTable = () => {
  const [schoolInfo, setSchoolInfo] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", description: "" });
  const token = localStorage.getItem("adminToken");

  // Fetch school info records
  const fetchSchoolInfo = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/admin/schoolinfo/public`
      );
      setSchoolInfo(res.data);
    } catch (error) {
      console.error("Error fetching school info", error);
    }
  };

  useEffect(() => {
    fetchSchoolInfo();
  }, []);

  // Delete a school info record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/admin/schoolinfo/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchSchoolInfo();
      } catch (error) {
        console.error("Error deleting school info", error);
      }
    }
  };

  // Enter edit mode for a record
  const handleEdit = (info) => {
    setEditingId(info._id);
    setEditFormData({ title: info.title, description: info.description });
  };

  // Update a school info record
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/schoolinfo/${editingId}`,
        editFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingId(null);
      fetchSchoolInfo();
    } catch (error) {
      console.error("Error updating school info", error);
    }
  };

  // Cancel editing mode
  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="bg-reddishWhite p-8 rounded-lg shadow-lg">
      <h2 className="font-georgia text-3xl text-customGray mb-8">
        School Information (Admin)
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-customRed1">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schoolInfo.map((info) => (
              <tr key={info._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === info._id ? (
                    <input
                      type="text"
                      value={editFormData.title}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, title: e.target.value })
                      }
                      className="px-2 py-1 border rounded-md"
                    />
                  ) : (
                    info.title
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === info._id ? (
                    <textarea
                      value={editFormData.description}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, description: e.target.value })
                      }
                      className="px-2 py-1 border rounded-md"
                    />
                  ) : (
                    info.description
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === info._id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(info)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(info._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

export default AdminSchoolInfoTable;
