import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  certificateNumber: { type: String, required: true, unique: true },
});

export default mongoose.model("Certificate", certificateSchema);
