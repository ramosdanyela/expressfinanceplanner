import express from "express";
import Subcategory from "../models/subcategory.models.js";
import isAuth from "../middlewares/isAuth.js"


const subcategoryRouter = express.Router();

subcategoryRouter.post("/create-subcategory", isAuth, async (req, res) => {
  try {
    const newSubcategory = await Subcategory.create(req.body);

    return res.status(201).json(newSubcategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está certo" });
  }
});

subcategoryRouter.get("/all-subcategories", isAuth, async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    return res.status(200).json(subcategories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está cerrto" });
  }
});

subcategoryRouter.get("/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const subcategoryUnit = await Subcategory.findById(id).populate("category");

    if (!subcategoryUnit) {
      return res.status(404).json("Transaçao nao encontrada");
    }

    return res.status(200).json(subcategoryUnit);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está certo" });
  }
});

subcategoryRouter.delete("/delete/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubcategory = await Subcategory.findByIdandDelete(id);
    return res.status(200).json(deletedSubcategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está certo" });
  }
});

subcategoryRouter.put("/edit/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updatedSubcategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo de errado nao está certo" });
  }
});

export default subcategoryRouter;
