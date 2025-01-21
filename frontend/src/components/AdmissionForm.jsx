// Frontend Code (React.js)
import React, { useState } from 'react';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    fetch('/api/admission', {
      method: 'POST',
      body: form,
    })
      .then((res) => res.json())
      .then(() => alert('Form submitted successfully'))
      .catch((err) => console.error('Error:', err));
  };

  const renderInput = (label, name, type = 'text', required = false) => (
    <div className="mb-4 font-roboto">
      <label className="block text-customGray font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        onChange={type === 'file' ? handleFileChange : handleChange}
        required={required}
        className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-4xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg"
    >
      <h1 className="text-2xl font-semibold font-georgia mb-6 text-center">Admission Form</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Two columns per row */}
        {renderInput('Student’s Name', 'studentName', 'text', true)}
        {renderInput('Student’s Aadhar/ VID / Enrollment No.', 'studentAadhar', 'text', true)}
        {renderInput('Mother’s Name', 'motherName', 'text', true)}
        {renderInput('Mother’s Occupation', 'motherOccupation', 'text', true)}
        {renderInput('Mother’s Mobile Number', 'motherMobile', 'tel', true)}
        {renderInput('Father’s Name', 'fatherName', 'text', true)}
        {renderInput('Father’s Occupation', 'fatherOccupation', 'text', true)}
        {renderInput('Father’s Mobile Number', 'fatherMobile', 'tel', true)}
        {renderInput('Gender', 'gender', 'text', true)}
        {renderInput('Nationality', 'nationality', 'text', true)}
        {renderInput('Religion', 'religion', 'text', true)}
        {renderInput('Cast Category', 'castCategory', 'text', true)}
        {renderInput('Date of Birth', 'dob', 'date', true)}
        {renderInput('Blood Group', 'bloodGroup', 'text')}
        {renderInput('Permanent Address', 'permanentAddress', 'text', true)}
        {renderInput('Correspondence Address', 'correspondenceAddress', 'text', true)}
      </div>
      {/* File uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {renderInput('Passport Size Photograph of Student', 'studentPhoto', 'file', true)}
        {renderInput('Transfer Certificate', 'transferCertificate', 'file', true)}
        {renderInput('Birth Certificate', 'birthCertificate', 'file', true)}
        {renderInput('Previous Mark Sheet/ Grade Card', 'markSheet', 'file', true)}
      </div>
      {/* Submit Button */}
      <div className="mt-6">
        <label className="inline-flex items-center">
          <input type="checkbox" className="mr-2" required />
          I certify the information is accurate.
        </label>
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-customRed1 text-white py-2 px-4 rounded-md hover:bg-customRed2 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default AdmissionForm;










// Backend Code (Node.js + Express.js)
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.post('/api/admission', upload.fields([
//   { name: 'studentPhoto' },
//   { name: 'motherPhoto' },
//   { name: 'fatherPhoto' },
//   { name: 'guardianPhoto' },
//   { name: 'transferCertificate' },
//   { name: 'birthCertificate' },
//   { name: 'markSheet' },
//   { name: 'aadharXerox' },
// ]), (req, res) => {
//   const data = req.body;
//   const files = req.files;

//   try {
//     const savePath = path.join(__dirname, 'admissions.json');
//     const previousData = fs.existsSync(savePath)
//       ? JSON.parse(fs.readFileSync(savePath))
//       : [];

//     previousData.push({ data, files });
//     fs.writeFileSync(savePath, JSON.stringify(previousData, null, 2));

//     res.status(200).json({ message: 'Form submitted successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error saving the form' });
//   }
// });

// app.listen(5000, () => console.log('Server running on port 5000'));






// import React, { useState } from "react";

// const AdmissionForm = () => {
//   const [formData, setFormData] = useState({});
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileUpload = (e) => {
//     const { name, files } = e.target;
//     setFormData({ ...formData, [name]: files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formPayload = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       formPayload.append(key, value);
//     });
//     fetch("/api/admission", {
//       method: "POST",
//       body: formPayload,
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.error(err));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-6 bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Admission Form</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Student's Details */}
//         <div>
//           <label>Student's Name *</label>
//           <input
//             type="text"
//             name="studentName"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Student's Aadhar/VID/Enrollment No. *</label>
//           <input
//             type="text"
//             name="studentAadhar"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>

//         {/* Mother's Details */}
//         <div>
//           <label>Mother's Name *</label>
//           <input
//             type="text"
//             name="motherName"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Mother's Occupation *</label>
//           <input
//             type="text"
//             name="motherOccupation"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Mother's Aadhar/VID/Enrollment No. *</label>
//           <input
//             type="text"
//             name="motherAadhar"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Mother's Mobile Number *</label>
//           <input
//             type="tel"
//             name="motherMobile"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>

//         {/* Father's Details */}
//         <div>
//           <label>Father's Name *</label>
//           <input
//             type="text"
//             name="fatherName"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Father's Occupation *</label>
//           <input
//             type="text"
//             name="fatherOccupation"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Father's Aadhar/VID/Enrollment No. *</label>
//           <input
//             type="text"
//             name="fatherAadhar"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Father's Mobile Number *</label>
//           <input
//             type="tel"
//             name="fatherMobile"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>

//         {/* Other Information */}
//         <div>
//           <label>Gender *</label>
//           <select
//             name="gender"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//         </div>

//         <div>
//           <label>Nationality *</label>
//           <input
//             type="text"
//             name="nationality"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label>Religion *</label>
//           <input
//             type="text"
//             name="religion"
//             required
//             className="w-full p-2 border"
//             onChange={handleChange}
//           />
//         </div>

//         {/* File Uploads */}
//         <div>
//           <label>Passport Size Photograph *</label>
//           <input
//             type="file"
//             name="studentPhoto"
//             accept="image/jpeg"
//             required
//             className="w-full p-2 border"
//             onChange={handleFileUpload}
//           />
//         </div>
//       </div>

//       <div className="mt-4">
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             name="agree"
//             required
//             className="mr-2"
//             onChange={handleChange}
//           />
//           I hereby certify that the information given in the admission form is
//           complete and accurate.
//         </label>
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-500 text-white p-3 rounded-lg mt-6 hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default AdmissionForm;