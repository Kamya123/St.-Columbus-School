// frontend/src/components/SchoolInfoTable.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const SchoolInfoTable = () => {
  const [schoolInfo, setSchoolInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/schoolinfo/public`)
      .then((res) => {
        setSchoolInfo(res.data);
      })
      .catch((err) => {
        console.error("Error fetching school info", err);
      });
  }, []);

  return (
    <div className="bg-reddishWhite p-8 rounded-lg shadow-lg">
      <h2 className="font-georgia text-3xl text-customGray mb-8">
        School Information
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-customRed1">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schoolInfo.map((info) => (
              <tr key={info._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {info.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {info.description}
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
