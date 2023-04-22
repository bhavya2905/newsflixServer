import PostArticles from '../models/ArticlesModel.js';
import CatCountModel from '../models/CatCountModel.js';

export const getArticles = async (req,res) =>{
    try {
        const articles = await PostArticles.find();

        res.status(200).json(articles); 
    } catch (error) {

        res.status(404).json({msg:error.message});
    }
}

export const createArticles = async (req,res) =>{
    const article = req.body;
    const newArticle = new PostArticles(article);
    try {
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(409).json({msg:error.message});
    }
}

export const updateArticles = async(req,res) => {
    const {title, description, caption, selectedFile}=req.body.val;
    const {id} =req.params;
    try {
        const post = await PostArticles.findByIdAndUpdate(id,{title, description, caption, selectedFile},{new:true});
        res.status(202).json(post);
    } catch (error) {
        res.status(409).json({msg:error.message});

    }
    
}
export const deleteArticles = async(req,res) => {
    const {id} =req.params;
    try {
        const post = await PostArticles.findByIdAndDelete(id);
        if(!post){
            res.status(404).json({msg:'article not found'})
        }
        res.status(202).json({msg:'article deleted successfully',id});
    } catch (error) {
        res.status(409).json({msg:error.message});

    }
    
}

export const comment = async(req,res)=>{
    const {id}=req.params;
    const value = req.body.val;
    try {
        const post = await PostArticles.findById(id);
        post.comments.push(value);
        const updatedPost = await PostArticles.findByIdAndUpdate(id,post);
        res.status(202).json(updatedPost);
    } catch (error) {
        res.status(409).json({msg:error.message});
    }
    
}

export const incrementCatCount = async (req,res) =>{
    const {cat} = req.params;
    const  email  = req.body.val;
    
    try {
        const post = await CatCountModel.findOne({email : email});
        
        if(post){
            post[cat]++;
            const updatedPost = await CatCountModel.findOneAndUpdate(
                { email: email },  // filter: find document based on email field
                post,              // update: replace existing document with the new 'post' object
                { new: true }      // options: return the updated document after the update is applied
              );
            res.status(201).json(updatedPost);
            
        }else{
            const newPost = new CatCountModel();
            newPost.email = email;
            newPost[cat]++;
            await newPost.save();
            res.status(201).json(newPost);
        }
       
    } catch (error) {
        res.status(409).json({msg:error.message});
    }
}
export const decrementCatCount = async (req,res) =>{
    const {cat} = req.params;
    const  email  = req.body.val;
    
    try {
        const post = await CatCountModel.findOne({email : email});
        
        if(post){
            post[cat]--;
            const updatedPost = await CatCountModel.findOneAndUpdate(
                { email: email },  // filter: find document based on email field
                post,              // update: replace existing document with the new 'post' object
                { new: true }      // options: return the updated document after the update is applied
              );
            res.status(201).json(updatedPost);
            
        }else{
            const newPost = new CatCountModel();
            newPost.email = email;
            newPost[cat]++;
            await newPost.save();
            res.status(201).json(newPost);
        }
       
    } catch (error) {
        res.status(409).json({msg:error.message});
    }
}

export const getRecommendation  = async (req, res) => {
        const { email } = req.params;
      
        try {
          const post = await CatCountModel.findOne({ email : email});
          if(!post){
            let maxCategory = 'sports';
            res.status(200).json({ maxCategory });
          }else{
            let maxCategory = '';
            let maxValue = -Infinity;
  
            for(const cat in post.toObject()){
              if(cat !== '_id' && cat !== 'email' && cat !== '__v'){
                  const value = post[cat];
                  if(value > maxValue){
                      maxValue = value;
                      maxCategory = cat;
                  }
              }
            }
            
            res.status(200).json({ maxCategory });
          }
          
        } catch (error) {
          res.status(500).json({ error: "Internal Server Error" });
        }
      };
      
  