import React, { useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/contact`,
        formData
      );
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const renderInput = (label, name, type = "text", required = false) => (
    <div className="mb-4 font-roboto">
      <label className="block text-customGray font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1 h-32"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          className="w-full px-4 py-2 border text-customDark border-gray-300 rounded-md focus:outline-none transition focus:ring-1 focus:ring-customRed1"
        />
      )}
      {errors[name] && (
        <div className="text-customRed1 mt-1">{errors[name]}</div>
      )}
    </div>
  );

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="w-full pt-12 pb-16 px-[4.5rem] max-[768px]:px-6 max-[1115px]:px-10 bg-customRed1 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-georgia text-6xl max-[920px]:text-[3rem] max-[544px]:text-4xl leading-snug mb-8">
            Get in Touch
          </h1>
          <div className="w-24 border-b-2 border-white" />
        </div>
      </div>

      {/* Contact Content */}
      <div className="py-16 px-[4.5rem] max-[768px]:px-6 max-[1115px]:px-10 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-16 max-[768px]:grid-cols-1">
          {/* Contact Form */}
          <div className="font-roboto">
            <h2 className="font-georgia text-3xl text-customGray mb-8">
              Send Us a Message
            </h2>

            {submitStatus === "success" && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                Message sent successfully!
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                Error sending message. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {renderInput("Name", "name", "text", true)}
              <div className="grid grid-cols-2 gap-6 max-[768px]:grid-cols-1">
                {renderInput("Email", "email", "email", true)}
                {renderInput("Phone", "phone", "tel")}
              </div>
              {renderInput("Subject", "subject", "text", true)}
              {renderInput("Message", "message", "textarea", true)}

              <button
                type="submit"
                className="bg-customRed1 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-reddishWhite p-8 rounded-lg">
              <h2 className="font-georgia text-3xl text-customGray mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-customRed1 text-2xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-customGray">Address</h3>
                    <p className="text-gray-600">
                      Village Post: Kanhaiyachak, Parbatta
                      <br />
                      District: Khagaria
                      <br />
                      Bihar, India - 851214
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaPhone className="text-customRed1 text-2xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-customGray">Phone</h3>
                    <p className="text-gray-600">
                      +91 89694 89245
                      <br />
                      (Mon-Sat, 9AM-5PM IST)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-customRed1 text-2xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-customGray">Email</h3>
                    <p className="text-gray-600">
                      info@stcolumbusschool.in
                      <br />
                      admissions@stcolumbusschool.in
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.687923143771!2d86.70715137438113!3d25.314687126933787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f1c708a5f3ad4b%3A0xeed156279823db1c!2sSt.Columbus%20school%20Kanhaiyachak!5e0!3m2!1sen!2sin!4v1738230680371!5m2!1sen!2sin"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
