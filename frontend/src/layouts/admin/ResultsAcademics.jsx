// src/layouts/home/ResultsAcademics.jsx

import { useState, useEffect } from "react";
import axios from "axios";

const ResultsAcademics = () => {
  const [results, setResults] = useState([]);

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

  return (
    <div className="p-4 uppercase mt-8">
      <h2 className="font-georgia text-2xl text-customRed1 border-b-2 border-b-customRed1 mb-8">
        C: Results & Academics
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse border border-gray-300">
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
          <tbody className="bg-white">
            {results.map((r, i) => (
              <tr key={r._id}>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                  {i + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 whitespace-nowrap overflow-x-auto">
                  {r.title}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 text-center">
                  <button
                    onClick={() =>
                      window.open(r.webViewLink || r.fileUrl, "_blank")
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsAcademics;
