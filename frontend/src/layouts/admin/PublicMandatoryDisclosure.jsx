import { useState, useEffect } from "react";
import axios from "axios";

const PublicMandatoryDisclosure = () => {
  const [disclosures, setDisclosures] = useState([]);

  const fetchDisclosures = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/disclosure`
      );
      setDisclosures(res.data);
    } catch (error) {
      console.error("Error fetching disclosures:", error);
    }
  };

  useEffect(() => {
    fetchDisclosures();
  }, []);

  return (
    <div className="p-4 uppercase mt-8">
      <h2 className="font-georgia text-2xl text-customRed1 border-b-2 border-b-customRed1 mb-8">
        B: Documents and Information
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse border border-gray-300">
          <thead className="bg-customRed1">
            <tr>
              <th
                className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider w-20"
              >
                Sl No.
              </th>
              <th
                className="border min-w-[75%] border-gray-300 px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-break-spaces"
              >
                Documents/Information
              </th>
              <th
                className="border max-w-[25%] border-gray-300 px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider whitespace-break-spaces"
              >
                Links of Uploaded Documents on your School's Website
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {disclosures.map((disc, i) => (
              <tr key={disc._id}>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                  {i + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                  <div className="min-w-[75%] overflow-x-auto whitespace-break-spaces">
                    {disc.title}
                  </div>
                </td>
                <td className="border text-center border-gray-300 px-4 py-2 text-sm text-gray-900">
                  <button
                    onClick={() => window.open(disc.webViewLink, "_blank")}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
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

export default PublicMandatoryDisclosure;
