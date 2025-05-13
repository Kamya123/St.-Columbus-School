// frontend/src/components/SchoolInfoTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const SchoolInfoTable = () => {
  const [schoolInfo, setSchoolInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/schoolinfo/public`)
      .then((res) => setSchoolInfo(res.data))
      .catch((err) => console.error("Error fetching school info", err));
  }, []);

  return (
    <div className="p-4 uppercase">
      <h2 className="font-georgia text-2xl text-customRed1 border-b-2 border-b-customRed1 mb-8">
        A: School Information
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
                className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider w-48"
              >
                Information
              </th>
              <th
                className="border border-gray-300 px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider w-96"
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {schoolInfo.map((info, i) => (
              <tr key={info._id}>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                  {i + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                  <div className="w-full overflow-x-auto whitespace-nowrap">
                    {info.title}
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                  <div className="w-full overflow-x-auto whitespace-nowrap">
                    {info.description}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolInfoTable;
