import { Router } from "express";
import { UserRolesEnum } from "../constants.js";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controllers.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

import {
  userAssignRoleValidator,
  userLoginValidator,
  userRegisterValidator,
} from "../validators/user.validators.js";

import { validate } from "../validators/validate.js";

const router = Router();

// Unsecured route
router.route("/register").post(userRegisterValidator(), validate, registerUser);

router.route("/login").post(userLoginValidator(), validate, loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
