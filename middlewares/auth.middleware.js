import passport from "passport";
import UserModel from "../models/user.model.js";
import CustomError from "../CustomError.js";

export const signUpMiddleware = passport.authenticate("signup", {
  session: false,
});

export const protect = passport.authenticate("jwt", { session: false });

export const checkRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user.sub);

      if (!user || user.role !== role) {
        throw CustomError("not authorized", 401, 4000);
        // return res.status(401).json("not authorized");
      }
      next();
    } catch (error) {
      next(error);
      // res.status(400).json(error);
    }
  };
};
