import express from "express";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import generateToken from "../config/jwt.config.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const userRouter = express.Router();

const saltRounds = 10;

//user creation route
userRouter.post("/sign-up", async (req, res) => {
  try {
    const { password } = req.body;

    if (
      !password ||
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/
      )
    ) {
      return res.status(400).json({
        message: "A senha escolhida nao tem os requisitos necessários.",
      });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      ...req.body,
      passwordHash: hashedPassword,
    });

    delete user._doc.passwordHash;

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//user login route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "E-mail nao cadastrado" });
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      delete user._doc.passwordHash;

      const token = generateToken(user);

      return res.status(200).json({
        user: { ...user },
        token: token,
      });
    } else {
      return res
        .status(401)
        .json({ message: "Email e senha nao correspondentes." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// user profile route
userRouter.get("/profile", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedUser = req.currentUser;

    console.log(req.currentUser);

    if (!loggedUser) {
      return res.status(404).json({ msg: "Usuario nao encontrado." });
    }

    const user = loggedUser;

    delete user._doc.passwordHash;
    delete user._doc.__v;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

userRouter.put("/editprofile", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const loggedUser = req.currentUser;

    console.log(req.currentUser);

    if (!loggedUser) {
      return res.status(404).json({ msg: "Usuario nao encontrado." });
    }

    const editUser = await User.updateOne(
      { _id: loggedUser._id },
      { ...req.body },
      { new: true }
    );

    delete editUser._doc.passwordHash;
    delete editUser._doc.__v;

    return res.status(200).json(editUser);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

export default userRouter;
