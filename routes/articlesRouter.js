import express from "express";

import {updateArticles, deleteArticles, getRecommendation, incrementCatCount, decrementCatCount, comment, getArticles, createArticles} from "../controlers/ArticlesController.js";

const articlesRoutes=express.Router();

articlesRoutes.get('/',getArticles);
articlesRoutes.post('/',createArticles);
articlesRoutes.post('/update/:id',updateArticles);
articlesRoutes.get('/delete/:id',deleteArticles);

articlesRoutes.post('/comment/:id',comment);
articlesRoutes.post('/recommend/:cat',incrementCatCount);
articlesRoutes.post('/derecommend/:cat',decrementCatCount);

articlesRoutes.get('/recommend/:email',getRecommendation);

export default articlesRoutes;