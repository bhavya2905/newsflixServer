import user from "../models/UserModel.js"
import userData from "../models/UserDataModel.js"

export const addLikeMovies = async (req,res)=>{
    try {
        // console.log('im here');
        const {email , data} = req.body;
        const isUser=await user.findOne({email});
        if(isUser){
            const {likedMovies}=isUser;
            if(!likedMovies.includes(data._id)){
                await user.findByIdAndUpdate(isUser._id,{
                    likedMovies: [...isUser.likedMovies, data._id],
                },
                {new:true}
                );
            }else return res.json({msg:"movie already added to liked list."});
        }else await user.create({email, likedMovies:[data._id]});
        return res.json({message:"Movie added successfully"});
    } catch (error) {
        return res.json({msg: "Error adding movie"});
    }
}

export const getLikedMovies = async (req,res)=>{
    try {
        const {email}=req.params;
        const isUser=await user.findOne({email});
        if(isUser){
            res.json({isUser});
        }else{
            return res.json({msg: "user with email not found"});
        }
    } catch (err) {
        return res.json({msg: "error in fetching movies"})
    }
}

export const removeFromLikedMovies = async (req,res)=>{
    try {
        const {email , movieId} = req.body;
        const isUser=await user.findOne({email});
        if(isUser){
            const {likedMovies}=isUser;
            const movieIndex =likedMovies.findIndex(({ id }) =>(id === movieId));
            if(!movieIndex) res.status(400).send({msg:"movie not found"})
            likedMovies.splice(movieIndex,1);
                await user.findByIdAndUpdate(isUser._id,{
                    likedMovies,
                },
                {new:true}
                );
                return res.json({msg:"movie deleted",movies: likedMovies});
        }
        
    } catch (err) {
        return res.json({msg: "error in deleting movies"})
 
    }
}

export const  getUserdetails = async (req,res)=>{
    try {
        const {email}=req.params;
        const isUser=await userData.findOne({email});
        if(isUser){
            res.json({isUser});
        }else{
            return res.json({msg: "user with email not found"});
        }
    } catch (err) {
        return res.json({msg: "error in fetching movies"})
    }
}

export const  postUserdetails = async (req,res)=>{
   
        const { name, gender, email, mobile, address, preferences } = req.body.formData;
      
        const newUser = new userData({ name, gender, email, mobile, address, preferences });
      
        try {
          await newUser.save();
          res.status(201).json(newUser);
        } catch (error) {
          res.status(409).json({ message: error.message });
        }
      
};

export const updateUserDetails = async (req, res) => {
    const { name, gender, email, mobile, address, preferences } = req.body.formData;
  
    try {
      const userToUpdate = await userData.findOneAndUpdate(
        { email: email },
        { name, gender, email, mobile, address, preferences },
        { new: true }
      );
  
      if (!userToUpdate) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(userToUpdate);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  