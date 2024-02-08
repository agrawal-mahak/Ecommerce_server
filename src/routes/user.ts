import express  from "express";
import { newUser,getAllUsers, getUsers, deleteUsers } from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();

//route -/api/v1/user/new
app.post("/new", newUser);

//route -/api/v1/user/all
app.get("/all", adminOnly, getAllUsers)

//route -/api/v1/user/dynamicID
app.route("/:id").get(getUsers).delete(adminOnly,deleteUsers)

 

export default app;