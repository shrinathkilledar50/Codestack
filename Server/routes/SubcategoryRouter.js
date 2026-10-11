import { createSubCategory, deleteSubcategoryById, getAllSubcategories, updateSubcategoryById } from "../controller/SubCategoryController.js";


const subcategoryRouter = express.Router();

subcategoryRouter.post("/createSubcategory", createSubCategory);
subcategoryRouter.get("/", getAllSubcategories);
subcategoryRouter.put("/updateSubcategoryById/:id", updateSubcategoryById);
subcategoryRouter.delete("/deleteSubcategoryById/:id", deleteSubcategoryById);

export default subcategoryRouter;