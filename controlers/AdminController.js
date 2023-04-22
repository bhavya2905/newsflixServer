import adminuser from "../models/AdminUserModel.js";
import bcrypt from "bcryptjs";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await adminuser.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if password is correct
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = (password == user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Return success message
    res.status(200).json({ message: "User signed in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const signup = async (req,res)=>{
    const { email, password, firstName, lastName } = req.body;
    try {
      // Check if user already exists
      const userExists = await adminuser.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      // Create new user
      const newUser = new adminuser({
        name: `${firstName} ${lastName}`,
        email,
        password,
        superAdmin: 0, // default to non-super admin
      });
  
      // Save new user to database
      await newUser.save();
  
      // Return success message
      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
}

export const getUsers = async(req,res)=>{
  try {
    const  users = await adminuser.find();
    res.json({users});
    
  } catch (error) {
    console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
}

export const editadmin = async(req,res)=>{
  const {firstName, lastName, email, password}=req.body.admin;
  const {id} =req.params;
  
  const name= firstName+" "+lastName;
  try {
      const user = await adminuser.findByIdAndUpdate(id,{name, email, password},{new:true});
      res.status(202).json(user);
  } catch (error) {
      res.status(409).json({msg:error.message});

  }
}