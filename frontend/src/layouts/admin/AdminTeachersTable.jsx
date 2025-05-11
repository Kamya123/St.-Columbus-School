// frontend/src/layouts/admin/AdminTeachersTable.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminTeachersTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ 
    name: "", 
    subject: "", 
    image: "" 
  });
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/teachers`
      );
      setTeachers(res.data);
    } catch (error) {
      console.error("Error fetching teachers", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/teachers/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchTeachers();
      } catch (error) {
        console.error("Error deleting teacher", error);
      }
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher._id);
    setEditFormData({
      name: teacher.name,
      subject: teacher.subject,
      image: teacher.image
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/teachers/${editingId}`,
        editFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      setEditingId(null);
      fetchTeachers();
    } catch (error) {
      console.error("Error updating teacher", error);
    }
  };

  return (
    <div className="bg-reddishWhite p-8 rounded-lg shadow-lg">
      <div className="my-8 flex flex-col items-center md:flex-row md:justify-between">
        <h2 className="font-georgia text-xl md:text-3xl text-customGray">
          Manage Teachers
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
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={teacher.image} 
                    alt={teacher.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === teacher._id ? (
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="px-2 py-1 border rounded-md"
                    />
                  ) : (
                    teacher.name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === teacher._id ? (
                    <input
                      type="text"
                      value={editFormData.subject}
                      onChange={(e) => setEditFormData({ ...editFormData, subject: e.target.value })}
                      className="px-2 py-1 border rounded-md"
                    />
                  ) : (
                    teacher.subject
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === teacher._id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(teacher._id)}
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

export default AdminTeachersTable;