import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    studentAadhar: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: String,
    motherAadhar: String,
    motherMobile: String,
    fatherName: { type: String, required: true },
    fatherOccupation: String,
    fatherAadhar: String,
    fatherMobile: String,
    guardianName: String,
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    religion: { type: String, required: true },
    castCategory: { type: String, required: true },
    dob: { type: Date, required: true },
    bloodGroup: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    correspondenceAddress: { type: String, required: true },
    studentPhoto: String, // File path
  },
  { timestamps: true }
);

// Compile the schema into a model
const Admission = mongoose.model("Admission", admissionSchema);

export default Admission;
