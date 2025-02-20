// frontend/src/pages/AdminSchoolInfo.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const AdminSchoolInfo = ({ token }) => {
  const [schoolInfo, setSchoolInfo] = useState([]);
  const [editingInfo, setEditingInfo] = useState(null);

  const fetchSchoolInfo = () => {
    // Using the protected endpoint for admin management
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/schoolinfo`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setSchoolInfo(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchSchoolInfo();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/schoolinfo/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchSchoolInfo())
      .catch(err => console.error(err));
  };

  const handleEdit = (info) => {
    setEditingInfo(info);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/admin/schoolinfo/${editingInfo._id}`, editingInfo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setEditingInfo(null);
        fetchSchoolInfo();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Manage School Information</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schoolInfo.map(info => (
            <tr key={info._id}>
              <td>{info.title}</td>
              <td>{info.description}</td>
              <td>
                <button onClick={() => handleEdit(info)}>Edit</button>
                <button onClick={() => handleDelete(info._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingInfo && (
        <form onSubmit={handleUpdate}>
          <h3>Edit School Information</h3>
          <input
            type="text"
            value={editingInfo.title}
            onChange={(e) => setEditingInfo({ ...editingInfo, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            value={editingInfo.description}
            onChange={(e) => setEditingInfo({ ...editingInfo, description: e.target.value })}
            placeholder="Description"
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditingInfo(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default AdminSchoolInfo;
