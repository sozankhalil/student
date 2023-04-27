import { Router } from "express";
import {
  addStudent,
  getStudentById,
  getStudentStats,
  getStudents,
} from "../controllers/students.controller.js";
import { resizeImage, uploadMulti, uploadSingle } from "../middlewares/multer.middleware.js";

/**
 * @swagger
 * components:
 *  schemas:
 *    students:
 *      type: object
 *      required:
 *        - fullName
 *        - age
 *      properties:
 *        _id:
 *          type: ObjectId
 *          description: mongodb default object id
 *        fullName:
 *          type: string
 *        isActive:
 *          type: boolean
 *          description: a boolean describes if the student is still studying
 *        age:
 *          type: number
 *        startDate:
 *          type: string
 *          format: date
 *          description: the date the student started studying
 *      example:
 *        fullName: testtt
 *        age: 25
 *
 */
const router = Router();

/**
 * @swagger
 * tags:
 *  name: students
 *  description: any route related to students
 * /api/students:
 *  post:
 *    summary: Create a new student
 *    tags: ["students"]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/students'
 *    responses:
 *      200:
 *        description: The created student.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/students'
 *      500:
 *        description: SOme error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                data:
 *                  type: object
 *                  properties:
 *                    errorCode:
 *                      type: number
 *                    message:
 *                      type: string
 *
 *  get:
 *    summary: get students
 *    tags: ["students"]
 *    parameters:
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *        required: false
 *        description: search by fullname
 *      - in: query
 *        name: age
 *        schema:
 *          type: number
 *        required: false
 *        description: the age to filter by
 *      - in: query
 *        name: age[lte]
 *        schema:
 *          type: number
 *        required: false
 *        description: the age to filter by
 *    responses:
 *      200:
 *        description: The created student.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/students'
 *
 */
router.route("/").post(addStudent).get(getStudents);

router.route("/:id").get(getStudentById);

router.route("/upload").post(uploadSingle, resizeImage, (req, res) => {
  console.log(req.file);
  res.send(`students/${req.file.filename}`);
});

router.route("/upload-multi").post(uploadMulti, (req, res) => {
  console.log(req.body.files);
  res.send("success");
});
router.route("/student-stats").get(getStudentStats);


/**
 * @swagger
 * /api/students/{id}:
 *  get:
 *    summary: get students
 *    tags: ["students"]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: ObjectId
 *        required: true
 *        description: the id of the student
 *    responses:
 *      200:
 *        description: The created student.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/students'
 */


export default router;