import express from "express";
import Category from "../models/category.models.js";
import isAuth from "../middlewares/isAuth.js";

const categoryRouter = express.Router();

categoryRouter.post("/create-category", isAuth, async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está certo" });
  }
});

categoryRouter.get("/all-categories", isAuth, async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está cerrto" });
  }
});

categoryRouter.get("/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const categoryUnit = await Category.findById(id);

    if (!categoryUnit) {
      return res.status(404).json("Transaçao nao encontrada");
    }

    return res.status(200).json(categoryUnit);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está certo" });
  }
});

categoryRouter.delete("/delete/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdandDelete(id);
    return res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está certo" });
  }
});

categoryRouter.put("/edit/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está certo" });
  }
});

export default categoryRouter;
