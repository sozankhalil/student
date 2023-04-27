import mongoose from "mongoose";

const classesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teacher: { type: String, required: true },
  stage: { type: Number, required: true },

  students: [{ type: mongoose.Types.ObjectId, ref: "student" }],
  marks: [{ type: mongoose.Types.ObjectId, ref: "mark" }],
});

const classes = mongoose.model("class", classesSchema);
export default classes;
