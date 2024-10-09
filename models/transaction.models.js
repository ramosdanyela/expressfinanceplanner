import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  bank: {
    type: String,
    trim: true,
    lowercase: true,
    enum: [
      "nubank",
      "itau pf",
      "itau pj",
    ]
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    lowercase: true,
  },
  location: {
    type: String,
    trim: true,
    lowercase: true,
  },
  year_mont_due: {
    type: String,
    trim: true,
    lowercase: true,
  },
  notes_comments: {
    type: String,
    lowercase: true,
  },
  transac_macrotype: {
    type: String,
    trim: true,
    lowercase: true,
    enum: [
      "income",
      "outcome",
      "transfer between accounts",
      "onhold/investimentos",
    ],
  },
  transac_subtype: {
    type: String,
    trim: true,
    lowercase: true,
    enum: [
      "income transference/pix",
      "cash receiving",
      "credit card",
      "debit card",
      "outcome transference/Pix",
      "boleto",
      "account taxes",
      "saque",
      "credit card payment",
      "transference between accounts",
      "locked money",
      "lended money",
    ],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: "66f5df395b09134c26e4e5e2",
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "Subcategory",
    default: "66f5df4a5b09134c26e4e5e4",
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
