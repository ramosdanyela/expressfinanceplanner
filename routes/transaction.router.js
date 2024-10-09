import express from "express";
import Transaction from "../models/transaction.models.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";

const transactionRouter = express.Router();

//create transaction route
transactionRouter.post(
  "/create-transaction",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const loggedInUser = req.currentUser;
      const newTransaction = await Transaction.create({
        ...req.body,
        userId: loggedInUser._id,
      });

      loggedInUser.transactions.push(newTransaction._id);
      await loggedInUser.save();

      return res.status(201).json(newTransaction);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Algo de errado nao está certo" });
    }
  }
);

//get all transactions route
transactionRouter.get(
  "/all-transactions",
  isAuth,
  attachCurrentUser,
  async (req, res) => {

    try {
      const loggedInUser = req.currentUser;
      console.log(req.auth);
      const transactions = await Transaction.find({ userId: loggedInUser._id })
        .populate({path: "category", select:"name"})
        .populate({path: "subcategory", select:"name"});
      return res.status(200).json(transactions);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Algo de errado nao está cerrto" });
    }
  }
);

//get one specific transaction route
transactionRouter.get("/:id", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const { id } = req.params;
    const transactionUnit = await Transaction.findById(id)
      .populate("category")
      .populate("subcategory");

    if (
      !transactionUnit ||
      transactionUnit.userId.toString() !== req.currentUser._id.toString()
    ) {
      return res
        .status(404)
        .json("Transaçao nao encontrada ou nao pertence a voce.");
    }

    return res.status(200).json(transactionUnit);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está certo" });
  }
});

//delete specific transaction route
transactionRouter.delete(
  "/delete/:id",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTransaction = await Transaction.findByIdAndDelete(id);

      if (
        !deletedTransaction ||
        deletedTransaction.userId.toString() !== req.currentUser._id.toString()
      ) {
        return res
          .status(404)
          .json({ msg: "Transacao nao encontrada ou nao pertence a você." });
      }

      const user = req.currentUser;
      user.transactions = user.transactions.filter(
        (transactionId) => transactionId.toString() !== id
      );
      await user.save();

      return res.status(200).json(deletedTransaction);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Algo de errado nao está certo" });
    }
  }
);

transactionRouter.put(
  "/edit/:id",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { id } = req.params;

      const transaction = await Transaction.findById(id);
      if (
        !transaction ||
        transaction.userId.toString() !== req.currentUser._id.toString()
      ) {
        return res
          .status(404)
          .json({ msg: "Transacao nao encontrada ou nao pertence a voce." });
      }

      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true, runValidators: true }
      );
      return res.status(200).json(updatedTransaction);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Algo de errado nao está certo" });
    }
  }
);

export default transactionRouter;
