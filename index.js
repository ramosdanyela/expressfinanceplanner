import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import transactionRouter from "./routes/transaction.router.js";
import categoryRouter from "./routes/category.router.js";
import subcategoryRouter from "./routes/subcategory.router.js";
import userRouter from "./routes/user.router.js";
import cors from "cors";

dotenv.config();
console.log(process.env.PORT);

const app = express();

app.use(cors( ));

app.use(express.json());

connect();

app.use("/transaction", transactionRouter);
app.use("/category", categoryRouter);
app.use("/subcategory", subcategoryRouter);
app.use("/user", userRouter);

app.get("/welcome", (req, res) => {
  console.log("GET /welcome chamado");
  return res.status(200).json({ message: "Bem vindo!" });
});

app.listen(process.env.PORT, () => {
  console.log("Server up and running on port: 4000");
});
