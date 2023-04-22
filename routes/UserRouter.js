import { updateUserDetails, postUserdetails, getUserdetails, addLikeMovies, getLikedMovies, removeFromLikedMovies } from "../controlers/UserControler.js";
import { editadmin, getUsers, signin, signup } from "../controlers/AdminController.js";
import express from "express";


const userRoutes=express.Router();

userRoutes.post('/add',addLikeMovies)
userRoutes.get('/liked/:email' , getLikedMovies)
userRoutes.put("/delete", removeFromLikedMovies);
userRoutes.post("/admin/login",signin);
userRoutes.post("/admin/signup",signup);
userRoutes.get("/admin/users",getUsers);
userRoutes.post("/admin/editadmin/:id",editadmin);
userRoutes.get("/details/:email",getUserdetails);
userRoutes.post("/details",postUserdetails);
userRoutes.post("/updatedetails",updateUserDetails);
export default userRoutes;