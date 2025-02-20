// // frontend/src/pages/Admin.jsx
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Admin = () => {
//   // Login state
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
//   const [loginMessage, setLoginMessage] = useState("");

//   // Image upload state
//   const [file, setFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");

//   // School info state
//   const [schoolInfo, setSchoolInfo] = useState({ title: "", description: "" });
//   const [infoMessage, setInfoMessage] = useState("");

//   const navigate = useNavigate();

//   // Handle admin login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { username, password });
//       setToken(res.data.token);
//       localStorage.setItem("adminToken", res.data.token);
//       setLoginMessage("Logged in successfully!");
//     } catch (error) {
//       setLoginMessage("Login failed. Please check your credentials.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     setToken("");
//     // Optionally, navigate to the login route if using react-router
//     navigate("/admin/login");
//   };

//   // Handle image upload (to Cloudinary via our API)
//   const handleImageUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/uploads`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setUploadedImageUrl(res.data.url);
//     } catch (error) {
//       console.error("Image upload failed:", error);
//     }
//   };

//   // Handle school info submission
//   const handleSchoolInfoSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // POST to add new school info (protected route)
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/admin/schoolinfo`,
//         schoolInfo,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setInfoMessage("School information saved successfully!");
//       setSchoolInfo({ title: "", description: "" });
//     } catch (error) {
//       console.error("Error saving school info:", error);
//       setInfoMessage("Error saving school information.");
//     }
//   };

//   // If not logged in, show the login form
//   if (!token) {
//     return (
//       <div className="container">
//         <h1>Admin Login</h1>
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Login</button>
//         </form>
//         {loginMessage && <p>{loginMessage}</p>}
//       </div>
//     );
//   }

//   // Once logged in, show the admin panel
//   return (
//     <div className="container">
//       <h1>Admin Panel</h1>

//       <section>
//         <h2>Upload Image to Gallery</h2>
//         <form onSubmit={handleImageUpload}>
//           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//           <button type="submit">Upload Image</button>
//         </form>
//         {uploadedImageUrl && (
//           <div>
//             <p>Uploaded Image:</p>
//             <img src={uploadedImageUrl} alt="Uploaded" width={200} />
//           </div>
//         )}
//       </section>

//       <section>
//         <h2>Add School Information</h2>
//         <form onSubmit={handleSchoolInfoSubmit}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={schoolInfo.title}
//             onChange={(e) => setSchoolInfo({ ...schoolInfo, title: e.target.value })}
//           />
//           <textarea
//             placeholder="Description"
//             value={schoolInfo.description}
//             onChange={(e) =>
//               setSchoolInfo({ ...schoolInfo, description: e.target.value })
//             }
//           />
//           <button type="submit">Save Information</button>
//         </form>
//         {infoMessage && <p>{infoMessage}</p>}
//       </section>

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Admin;
