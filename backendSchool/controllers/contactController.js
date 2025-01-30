import Contact from "../models/contactModel.js";

export const handleContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error handling contact form:", error.message);
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};
