import Demo from "../models/demo.models.js";


export const create = async (req,res) => {
  try {
    const { name,mobile, email, message } = req.body;
    if(!name || !mobile || !email || !message){
      return res.status(400).json({ message: "All fields are required" });
    }
    const data = await Demo.create({
      name,
      mobile,
      email,
      message
    });
    return res.status(200).json({ message: "Form submitted", data: data });
  } catch (error) {
    return res.status(500).json({ message:"Internal server error",error: error.message });
  }
}

export const getDemo = async (req, res) => {
  try {
    const data = await Demo.find().sort({ createdAt: -1 });
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile, email, message } = req.body;

    const demo = await Demo.findById(id);
    if (!demo) {
      return res.status(404).json({ message: "demo not found" });
    }

    if (name) demo.name = name;
    if (mobile) demo.mobile = mobile;
    if (email) demo.email = email;
    if (message) demo.message = message;

    await demo.save();

    return res.status(200).json({
      message: "Demo updated successfully",
      data: demo
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const dmeo = await Demo.findByIdAndDelete(id);
    if (!demo) {
      return res.status(404).json({ message: "Demo not found" });
    }

    return res.status(200).json({
      message: "Demo deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};
