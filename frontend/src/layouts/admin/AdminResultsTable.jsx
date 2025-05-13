// src/components/AdminResultsTable.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminResultsTable = () => {
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/results`
      );
      setResults(res.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/results/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchResults();
      } catch (error) {
        console.error("Error deleting result:", error);
      }
    }
  };

  return (
    <div className="bg-reddishWhite p-8 rounded-lg shadow-lg mt-16">
      <div className="my-8 flex flex-col items-center md:flex-row md:justify-between">
        <h2 className="font-georgia text-xl md:text-3xl text-customGray">
          Results & Academics (Admin)
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
            <th className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider w-20">
              Sl No.
            </th>
            <th className="border min-w-[75%] border-gray-300 px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-break-spaces">
              Documents/Information
            </th>
            <th className="border max-w-[25%] border-gray-300 px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-break-spaces">
              LINKS OF UPLOADED DOCUMENTS ON YOUR SCHOOL'S WEBSITE
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((resItem, i) => (
            <tr key={resItem._id}>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                {i + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                <div className="min-w-[60%] overflow-x-auto whitespace-nowrap">
                  {resItem.title}
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 text-center">
                <button
                  onClick={() => window.open(resItem.webViewLink, "_blank")}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(resItem._id)}
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

export default AdminResultsTable;
