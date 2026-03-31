import Admission from "../models/admissionModel.js";

const handleAdmissionForm = async (req, res) => {
  try {
    console.log("Received Admission Form Data:", req.body);
    console.log("Received File:", req.file);

    const formData = { ...req.body };

    // Handle file upload
    if (req.file) {
      formData.studentPhoto = req.file.path; // Store file path
    }

    // Save data to MongoDB
    const newAdmission = new Admission(formData);
    await newAdmission.save();

    res.status(201).json({ message: "Admission form submitted successfully" });
    console.log("Saved Admission Record:", newAdmission);

  } catch (err) {
    console.error("Error in handleAdmissionForm:", err.message);
    
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        errors: err.errors,
      });
    }

    res.status(500).json({
      message: "Error submitting the form",
      error: err.message,
    });
  }
};

export default handleAdmissionForm;




// import Admission from "../models/admissionModel.js";

// const handleAdmissionForm = async (req, res) => {
//   try {
//     const formData = { ...req.body };

//     // Check for file upload
//     if (req.file) {
//       formData.studentPhoto = req.file.path;
//     }

//     // Save data to MongoDB
//     const newAdmission = new Admission(formData);
//     await newAdmission.save();

//     res.status(201).json({ message: "Admission form submitted successfully" });
//   } catch (err) {
//     console.error("Error in handleAdmissionForm:", err.message);
//     res.status(500).json({
//       message: "Error submitting the form",
//       error: err.message,
//     });
//     res.status(400).json({
//       message: "Validation Error",
//       errors: err.errors,
//     });    
//   }
// };

// export default handleAdmissionForm;
