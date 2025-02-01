import React, { useState } from "react";
import axios from "axios";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({});
  const [isCertified, setIsCertified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    // File size validation (10MB limit)
    if (file && file.size > 10 * 1024 * 1024) {
      alert("File size exceeds the 10MB limit.");
      return;
    }
    setFormData({ ...formData, [name]: file });
  };

  const handleCertificationChange = (e) => {
    setIsCertified(e.target.checked);
  };

  const validateFormData = () => {
    // Validate Aadhar Number (12 digits)
    const aadharRegex = /^\d{12}$/;
    if (!aadharRegex.test(formData.studentAadhar)) {
      alert("Please enter a valid 12-digit Aadhar Number.");
      return false;
    }

    // Validate mobile numbers (10 digits)
    const mobileRegex = /^\d{10}$/;
    if (
      !mobileRegex.test(formData.motherMobile) ||
      !mobileRegex.test(formData.fatherMobile)
    ) {
      alert("Please enter valid 10-digit mobile numbers.");
      return false;
    }

    // Validate Date of Birth (should be a valid past date)
    if (new Date(formData.dob) >= new Date()) {
      alert("Date of birth should be in the past.");
      return false;
    }

    // Check if certified checkbox is checked
    if (!isCertified) {
      alert("You must certify that the information is accurate.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFormData()) {
      return; // Stop submission if validation fails
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admission`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("There was an error submitting the form.");
    }
  };

  const renderInput = (label, name, type = "text", required = false) => (
    <div className="mb-4 font-roboto">
      <label className="block text-customGray font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        onChange={type === "file" ? handleFileChange : handleChange}
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
      <h1 className="text-2xl font-semibold font-georgia mb-6 text-center">
        Admission Form
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Two columns per row */}
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
        {renderInput("Gender", "gender", "text", true)}
        {renderInput("Nationality", "nationality", "text", true)}
        {renderInput("Religion", "religion", "text", true)}
        {renderInput("Cast Category", "castCategory", "text", true)}
        {renderInput("Date of Birth", "dob", "date", true)}
        {renderInput("Blood Group", "bloodGroup", "text")}
        {renderInput("Permanent Address", "permanentAddress", "text", true)}
        {renderInput(
          "Correspondence Address",
          "correspondenceAddress",
          "text",
          true
        )}
      </div>
      {/* File uploads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {renderInput(
          "Passport Size Photograph of Student",
          "studentPhoto",
          "file",
          true
        )}
      </div>
      {/* Submit Button */}
      <div className="mt-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            required
            checked={isCertified}
            onChange={handleCertificationChange}
          />
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
