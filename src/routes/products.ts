import express  from "express";
import { newProduct, getlatestProducts,getAllCategories, getAdminProducts, deleteProduct } from "../controllers/product.js";

import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import { getSingleProduct ,updateProduct, getAllProducts } from "../controllers/product.js";
 

const app = express.Router();

//To create new product - /api/v1/product/new
app.post("/new",adminOnly, singleUpload, newProduct);

//to get all products with filters -/api/v1/product/all
app.get("/all",getAllProducts);

//to get last 10 products -/api/v1/product/latest
app.get("/latest",getlatestProducts);
 
// to get all unique categories - /api/v1/product/categories
app.get("/categories",getAllCategories);

//to get all products  /api/v1/product/admin-products
app.get("/admin-products", adminOnly,getAdminProducts );

//to get update and delete product
app.route("/:id")
.get(getSingleProduct)
.put(adminOnly, singleUpload,updateProduct).
delete( adminOnly,deleteProduct);

export default app;