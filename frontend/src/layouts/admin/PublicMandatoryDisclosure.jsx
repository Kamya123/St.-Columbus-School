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
    <div className="bg-reddishWhite p-4 rounded-lg shadow-lg mt-16">
      <h2 className="font-georgia text-3xl text-customGray mb-8">
        Public Mandatory Disclosures
      </h2>
      <div className="overflow-x-auto">
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
