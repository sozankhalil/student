import Users from "../models/user.model.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import CustomError from "../CustomError.js";
import { tryCatch } from "../utils/tryCatch.js";

// export const createUser = async (req, res) => {
//   try {
//     const user = await Users.create(req.body);
//     res.json({ status: "success", data: user });
//   } catch (err) {
//     res.status(400).json({ status: "error", data: err });
//   }
// };

export const signup = async (req, res, next) => {
  try {
    res.json({
      status: "success",
      data: req.user,
    });
  } catch (err) {
    next(err);
    // res.status(500).json({ status: "error", data: err });
  }
};

export const getUser = tryCatch(async (req, res) => {
  const users = await Users.find().populate("studentId", "fullName");

  res.json({ status: "success", results: users.length, data: users });
});

export const getCurrentUser = tryCatch(async (req, res) => {
  const user = await Users.findById(req.user.sub);

  res.json({ status: "success", data: { user } });
});

export const login = (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new CustomError("no user found", 404, "5000");
        next(error);
        return;
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return new CustomError(error.message, 401, 4001);
        }
        const body = { sub: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: "7 days",
        });

        res.json({ token });
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
};
