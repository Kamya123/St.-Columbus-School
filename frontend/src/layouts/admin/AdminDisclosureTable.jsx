// src/components/AdminDisclosureTable.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDisclosureTable = () => {
  const [disclosures, setDisclosures] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const fetchDisclosures = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/disclosure`);
      setDisclosures(res.data);
    } catch (error) {
      console.error("Error fetching disclosures:", error);
    }
  };

  useEffect(() => {
    fetchDisclosures();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this disclosure?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/disclosure/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchDisclosures();
      } catch (error) {
        console.error("Error deleting disclosure:", error);
      }
    }
  };

  return (
    <div className="bg-reddishWhite p-8 rounded-lg shadow-lg mt-16">
      <div className="my-8 flex flex-col items-center md:flex-row md:justify-between">
          <h2 className="font-georgia text-xl md:text-3xl text-customGray">
            Public Mandatory Disclosure (Admin)
          </h2>
          <button
            onClick={() => navigate("/admin")}
            className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            Back to Admin Panel
          </button>
        </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-customRed1">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {disclosures.map((disc) => (
            <tr key={disc._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {disc.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  onClick={() => window.open(disc.webViewLink, "_blank")}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(disc._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDisclosureTable;
