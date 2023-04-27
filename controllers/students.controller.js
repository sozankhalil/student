import CustomError from "../CustomError.js";
import Student from "../models/students.models.js";
import Users from "../models/user.model.js";
import { tryCatch } from "../utils/tryCatch.js";

export const getStudents = async (req, res) => {
  try {
    // const filteredStudent = await Student.find()
    //   .where("isActive")
    //   .equals(true)
    //   .where("age")
    //   .gte(12);

    let query = JSON.stringify(req.query);
    query = query.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let queryObj = JSON.parse(query);

    const excluteQuery = ["sort", "limit", "page", "fields", "search"];

    excluteQuery.forEach((key) => {
      delete queryObj[key];
    });

    if (req.query.search) {
      queryObj.fullName = new RegExp(req.query.search, "i");
    }

    const getQuery = Student.find(queryObj);

    if (req.query.sort) {
      getQuery.sort(req.query.sort);
    }

    if (req.query.fields) {
      getQuery.select(req.query.fields);
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = limit * (page - 1);

    getQuery.skip(skip).limit(limit);

    const students = await getQuery;

    res.json({ status: "success", results: students.length, data: students });
  } catch (err) {
    res.status(400).json({ status: "error", data: err });
  }
};

export const addStudent = tryCatch(async (req, res) => {
  const student = await Student.create(req.body);

  await Users.findByIdAndUpdate(req.body.userId, {
    $set: { studentId: student._id },
  });

  res.json({ status: "success", data: student });
});

export const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      throw new CustomError("student not found", 404, 4104);
    }

    res.json({ status: "success", data: student });
  } catch (err) {
    next(err);
  }
};

export const getStudentStats = async (req, res, next)=>{
  try {
    const student = await Student.aggregate([
      {
        $match: {
          age:{$gte: 10},
        },
      },
      {
        $group:{
          _id:"$age",
          averageGrade:{
            $avg:"$grade",
          },
          minGrade:{
            $min: "$grade",
          },
          maxGrade:{
            $max:"$grade"
          },
          sumGrade:{
            $sum:"$grade",
          },
        }
      }
    ])
  } catch (error) {
    console.log(error)
  }
}