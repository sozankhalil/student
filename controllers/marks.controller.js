import Classes from "../models/classes.model.js";
import Marks from "../models/marks.model.js";

import Student from "../models/students.models.js";

export const getMarks = async (req, res) => {
  try {
    const marks = await Marks.find()
      .populate("studentId", "fullName grade")
      .populate("classId", "title");

    res.json({ status: "success", results: marks.length, data: marks });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", data: err });
  }
};

export const createMark = async (req, res) => {
  try {
    const mark = await Marks.create(req.body);

    await Student.findByIdAndUpdate(req.body.studentId, {
      $push: { marks: mark._id },
    });

    await Classes.findByIdAndUpdate(req.body.classId, {
      $push: { marks: mark._id },
    });

    res.json({ status: "success", data: mark });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "error", data: err });
  }
};
