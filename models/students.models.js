import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "fullname is required"],
    lowercase: true,
    unique: false,
  },
  isActive: { type: Boolean, default: true },
  age: { type: Number, required: true, min: 7 },
  startDate: { type: Date }, //unix time "1234535657"
  image: {
    type: String,
    default:
      "default.jpg",
  },
  documents: [String],
  address: {
    city: String,
    street: String,
    houseNumber: Number,
  },
  gender: { type: String, enum: ["male", "female"] },
  phoneNumber: { type: String },
  stage: { type: Number },

  classes: [{ type: mongoose.Types.ObjectId, ref: "class" }],
  marks: [{ type: mongoose.Types.ObjectId, ref: "mark" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});



const student = mongoose.model("student", studentsSchema);
export default student;
