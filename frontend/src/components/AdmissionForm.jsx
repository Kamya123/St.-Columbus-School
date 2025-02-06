import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

const AdmissionForm = () => {
  // Initialize formData with default nationality.
  const [formData, setFormData] = useState({ nationality: "Indian" });
  const [isCertified, setIsCertified] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // Used for file input reset
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  // Loading indicator state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // To show download PDF button after a successful submission
  const [submitted, setSubmitted] = useState(false);
  // Store data for PDF
  const [submittedData, setSubmittedData] = useState(null); 
  

  // Options for dropdowns
  const genderOptions = ["Male", "Female", "Other"];
  const casteOptions = ["General", "OBC", "SC", "ST"];
  const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Other"];

  // Define required fields for validation
  const requiredFields = [
    'studentName', 'studentAadhar', 'motherName', 'motherOccupation',
    'motherAadhar', 'motherMobile', 'fatherName', 'fatherOccupation',
    'fatherAadhar', 'fatherMobile', 'guardianName', 'gender', 'nationality',
    'religion', 'castCategory', 'dob', 'permanentAddress', 'correspondenceAddress',
    'studentPhoto'
  ];

  // Helper function: Convert a File object to a Base64 string.
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Updated generatePDF function builds the PDF manually.
  const generatePDF = async () => {
    if (!submittedData) {
      alert("No submitted data found!");
      return;
    }
  
    const pdf = new jsPDF("p", "mm", "a4");
    const leftMargin = 15;
    const startY = 20;
    let currentY = startY;
    const lineHeight = 8;
  
    pdf.setFontSize(16);
    pdf.text("Admission Form", pdf.internal.pageSize.getWidth() / 2, 12, {
      align: "center",
    });
  
    pdf.setFontSize(12);
  
    const fields = [
      { key: "studentName", label: "Student’s Name" },
      { key: "studentAadhar", label: "Student’s Aadhar/VID/Enrollment No." },
      { key: "motherName", label: "Mother’s Name" },
      { key: "motherOccupation", label: "Mother’s Occupation" },
      { key: "motherAadhar", label: "Mother’s Aadhar" },
      { key: "motherMobile", label: "Mother’s Mobile Number" },
      { key: "fatherName", label: "Father’s Name" },
      { key: "fatherOccupation", label: "Father’s Occupation" },
      { key: "fatherAadhar", label: "Father’s Aadhar" },
      { key: "fatherMobile", label: "Father’s Mobile Number" },
      { key: "guardianName", label: "Guardian’s Name" },
      { key: "gender", label: "Gender" },
      { key: "nationality", label: "Nationality" },
      { key: "religion", label: "Religion" },
      { key: "castCategory", label: "Cast Category" },
      { key: "dob", label: "Date of Birth" },
      { key: "bloodGroup", label: "Blood Group" },
      { key: "permanentAddress", label: "Permanent Address" },
      { key: "correspondenceAddress", label: "Correspondence Address" },
    ];
  
    fields.forEach((field) => {
      const value = submittedData[field.key] || "";
      pdf.text(`${field.label}: ${value}`, leftMargin, currentY);
      currentY += lineHeight;
  
      if (currentY > pdf.internal.pageSize.getHeight() - 20) {
        pdf.addPage();
        currentY = startY;
      }
    });
  
    pdf.text(`Certified: ${isCertified ? "Yes" : "No"}`, leftMargin, currentY);
    currentY += lineHeight;
  
    if (submittedData.studentPhoto) {
      try {
        const imgData = await fileToBase64(submittedData.studentPhoto);
        pdf.addImage(imgData, "JPEG", 150, 20, 50, 50);
      } catch (error) {
        console.error("Error converting image:", error);
      }
    }
  
    pdf.save("Admission_Form.pdf");
  };
  
  

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "studentAadhar":
        if (!/^\d{12}$/.test(value)) error = "12-digit Aadhar Number required";
        break;
      case "motherMobile":
      case "fatherMobile":
        if (!/^\d{10}$/.test(value))
          error = "10-digit mobile number required";
        break;
      case "dob":
        if (new Date(value) >= new Date()) error = "Date must be in past";
        break;
      default:
        if (!value && touched[name]) error = "This field is required";
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate immediately if field was already touched.
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    let error = "";

    if (file && file.size > 10 * 1024 * 1024) {
      error = "File size exceeds 10MB limit";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    setFormData((prev) => ({ ...prev, [name]: error ? null : file }));
  };

  const handleCertificationChange = (e) => {
    const isChecked = e.target.checked;
    setIsCertified(isChecked);
    setErrors((prev) => ({
      ...prev,
      certified: isChecked ? "" : "You must certify the information is accurate",
    }));
  };

  // Render a standard input element with an optional placeholder for required fields.
  const renderInput = (label, name, type = "text", required = false) => {
    const placeholders = {
      studentName: "e.g., Rahul Sharma",
      studentAadhar: "e.g., 1234 5678 9012",
      motherName: "e.g., Sunita Sharma",
      motherOccupation: "e.g., Teacher",
      motherAadhar: "e.g., 1234 5678 9012",
      motherMobile: "e.g., 9876543210",
      fatherName: "e.g., Rajesh Sharma",
      fatherOccupation: "e.g., Engineer",
      fatherAadhar: "e.g., 1234 5678 9012",
      fatherMobile: "e.g., 9876543210",
      guardianName: "e.g., Uncle/Aunt Name",
      nationality: "e.g., Indian",
      dob: "YYYY-MM-DD",
      bloodGroup: "e.g., B+",
      permanentAddress: "e.g., 123, MG Road, Delhi",
      correspondenceAddress: "e.g., 456, Park Street, Mumbai",
    };
  
    return (
      <div className="mb-4 font-roboto" key={name}>
        <label className="block text-customGray font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          name={name}
          value={type === 'file' ? undefined : (formData[name] || "")}
          onChange={type === 'file' ? handleFileChange : handleChange}
          onBlur={type === 'file' ? undefined : handleBlur}
          required={required}
          placeholder={placeholders[name] || `Enter ${label}`}
          className={`w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 ${
            errors[name] ? "border-red-500 focus:ring-red-500" : "focus:ring-customRed1"
          }`}
          key={type === 'file' ? fileInputKey : undefined}
        />
        {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
      </div>
    );
  };
  

  // Render a select (dropdown) element.
  const renderSelect = (label, name, options, required = false) => (
    <div className="mb-4 font-roboto" key={name}>
      <label className="block text-customGray font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        required={required}
        className={`w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 ${
          errors[name] ? "border-red-500 focus:ring-red-500" : "focus:ring-customRed1"
        }`}
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const newErrors = {};

  // Validate all fields.
  // Validate all required fields
  requiredFields.forEach((name) => {
    const value = formData[name];
    let error = validateField(name, value);

    // Check if the field is required and value is missing or invalid
    if (!value) {
      error = 'This field is required';
    } else {
      // Re-validate in case the field has specific validations
      error = validateField(name, value);
    }

    if (error) {
      newErrors[name] = error;
    }
  });

  if (!isCertified) {
    newErrors.certified = "You must certify the information is accurate";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setIsSubmitting(false);
    return;
  }

  const form = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    form.append(key, value);
  });

  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/admission`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    alert("Form submitted successfully");

    // Store form data before resetting
    setSubmittedData(formData);

    // Reset form states.
    setFormData({ nationality: "Indian" });
    setTouched({});
    setErrors({});
    setIsCertified(false);
    setFileInputKey(Date.now());
    setSubmitted(true);
  } catch (error) {
    alert("There was an error submitting the form.");
  } finally {
    setIsSubmitting(false);
  }
};

  

  return (
    <div id="admission-form">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg"
      >
        <h1 className="text-2xl font-semibold font-georgia mb-6 text-center">
          Admission Form
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Student’s Name", "studentName", "text", true)}
          {renderInput(
            "Student’s Aadhar/ VID / Enrollment No.",
            "studentAadhar",
            "text",
            true
          )}
          {renderInput("Mother’s Name", "motherName", "text", true)}
          {renderInput("Mother’s Occupation", "motherOccupation", "text", true)}
          {renderInput("Mother’s Aadhar", "motherAadhar", "text", true)}
          {renderInput("Mother’s Mobile Number", "motherMobile", "text", true)}
          {renderInput("Father’s Name", "fatherName", "text", true)}
          {renderInput("Father’s Occupation", "fatherOccupation", "text", true)}
          {renderInput("Father’s Aadhar", "fatherAadhar", "text", true)}
          {renderInput("Father’s Mobile Number", "fatherMobile", "text", true)}
          {renderInput("Guardian’s Name", "guardianName", "text", true)}
          {renderSelect("Gender", "gender", genderOptions, true)}
          {renderInput("Nationality", "nationality", "text", true)}
          {renderSelect("Religion", "religion", religionOptions, true)}
          {renderSelect("Cast Category", "castCategory", casteOptions, true)}
          {renderInput("Date of Birth", "dob", "date", true)}
          {renderInput("Blood Group", "bloodGroup", "text")}
          {renderInput("Permanent Address", "permanentAddress", "text", true)}
          {renderInput("Correspondence Address", "correspondenceAddress", "text", true)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {renderInput(
            "Passport Size Photograph of Student",
            "studentPhoto",
            "file",
            true
          )}
        </div>

        <div className="mt-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className={`mr-2 ${errors.certified ? "border-red-500" : ""}`}
              checked={isCertified}
              onChange={handleCertificationChange}
            />
            I certify the information is accurate.
          </label>
          {errors.certified && (
            <p className="text-red-500 text-sm mt-1">{errors.certified}</p>
          )}
        </div>

        {isSubmitting ? (
          <p className="mt-4 text-center text-lg font-medium">Submitting...</p>
        ) : (
          <button
            type="submit"
            className="mt-6 w-full bg-customRed1 text-white py-2 px-4 rounded-md hover:bg-customRed2 transition duration-300"
          >
            Submit
          </button>
        )}
      </form>

      {/* Show Download PDF button after successful submission */}
      {submitted && (
        <div className="max-w-4xl mx-auto my-6 text-center">
          <button
            onClick={generatePDF}
            className="text-customRed1 font-roboto font-medium py-2 hover:text-customRed2 transition duration-300"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default AdmissionForm;






// const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Validate all fields
  //   const newErrors = {};
  //   Object.keys(formData).forEach(name => {
  //     const error = validateField(name, formData[name]);
  //     if (error) newErrors[name] = error;
  //   });

  //   if (!isCertified) {
  //     newErrors.certified = "You must certify the information is accurate";
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   // Rest of your submit logic...
  //   const form = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     form.append(key, value);
  //   });

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_BASE_URL}/admission`,
  //       form,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     alert("Form submitted successfully");
  //   } catch (error) {
  //     alert("There was an error submitting the form.");
  //   }
  // };


// import React, { useState } from "react";
// import axios from "axios";

// const AdmissionForm = () => {
//   const [formData, setFormData] = useState({});
//   const [isCertified, setIsCertified] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const file = files[0];

//     // File size validation (10MB limit)
//     if (file && file.size > 10 * 1024 * 1024) {
//       alert("File size exceeds the 10MB limit.");
//       return;
//     }
//     setFormData({ ...formData, [name]: file });
//   };

//   const handleCertificationChange = (e) => {
//     setIsCertified(e.target.checked);
//   };

//   const validateFormData = () => {
//     // Validate Aadhar Number (12 digits)
//     const aadharRegex = /^\d{12}$/;
//     if (!aadharRegex.test(formData.studentAadhar)) {
//       alert("Please enter a valid 12-digit Aadhar Number.");
//       return false;
//     }

//     // Validate mobile numbers (10 digits)
//     const mobileRegex = /^\d{10}$/;
//     if (
//       !mobileRegex.test(formData.motherMobile) ||
//       !mobileRegex.test(formData.fatherMobile)
//     ) {
//       alert("Please enter valid 10-digit mobile numbers.");
//       return false;
//     }

//     // Validate Date of Birth (should be a valid past date)
//     if (new Date(formData.dob) >= new Date()) {
//       alert("Date of birth should be in the past.");
//       return false;
//     }

//     // Check if certified checkbox is checked
//     if (!isCertified) {
//       alert("You must certify that the information is accurate.");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateFormData()) {
//       return; // Stop submission if validation fails
//     }

//     const form = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       form.append(key, value);
//     });

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/admission`,
//         form,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Response:", response.data);
//       alert("Form submitted successfully");
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//       alert("There was an error submitting the form.");
//     }
//   };

//   const renderInput = (label, name, type = "text", required = false) => (
//     <div className="mb-4 font-roboto">
//       <label className="block text-customGray font-medium mb-1">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <input
//         type={type}
//         name={name}
//         onChange={type === "file" ? handleFileChange : handleChange}
//         required={required}
//         className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
//       />
//     </div>
//   );

//   return (
//     <form
//       onSubmit={handleSubmit}
//       encType="multipart/form-data"
//       className="max-w-4xl mx-auto p-6 py-10 bg-white shadow-md rounded-lg"
//     >
//       <h1 className="text-2xl font-semibold font-georgia mb-6 text-center">
//         Admission Form
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Two columns per row */}
//         {renderInput("Student’s Name", "studentName", "text", true)}
//         {renderInput(
//           "Student’s Aadhar/ VID / Enrollment No.",
//           "studentAadhar",
//           "text",
//           true
//         )}
//         {renderInput("Mother’s Name", "motherName", "text", true)}
//         {renderInput("Mother’s Occupation", "motherOccupation", "text", true)}
//         {renderInput("Mother’s Aadhar", "motherAadhar", "text", true)}
//         {renderInput("Mother’s Mobile Number", "motherMobile", "text", true)}
//         {renderInput("Father’s Name", "fatherName", "text", true)}
//         {renderInput("Father’s Occupation", "fatherOccupation", "text", true)}
//         {renderInput("Father’s Aadhar", "fatherAadhar", "text", true)}
//         {renderInput("Father’s Mobile Number", "fatherMobile", "text", true)}
//         {renderInput("Guardian’s Name", "guardianName", "text", true)}
//         {renderInput("Gender", "gender", "text", true)}
//         {renderInput("Nationality", "nationality", "text", true)}
//         {renderInput("Religion", "religion", "text", true)}
//         {renderInput("Cast Category", "castCategory", "text", true)}
//         {renderInput("Date of Birth", "dob", "date", true)}
//         {renderInput("Blood Group", "bloodGroup", "text")}
//         {renderInput("Permanent Address", "permanentAddress", "text", true)}
//         {renderInput(
//           "Correspondence Address",
//           "correspondenceAddress",
//           "text",
//           true
//         )}
//       </div>
//       {/* File uploads */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         {renderInput(
//           "Passport Size Photograph of Student",
//           "studentPhoto",
//           "file",
//           true
//         )}
//       </div>
//       {/* Submit Button */}
//       <div className="mt-6">
//         <label className="inline-flex items-center">
//           <input
//             type="checkbox"
//             className="mr-2"
//             required
//             checked={isCertified}
//             onChange={handleCertificationChange}
//           />
//           I certify the information is accurate.
//         </label>
//       </div>
//       <button
//         type="submit"
//         className="mt-6 w-full bg-customRed1 text-white py-2 px-4 rounded-md hover:bg-customRed2 transition duration-300"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default AdmissionForm;
