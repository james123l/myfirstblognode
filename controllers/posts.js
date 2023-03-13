const Post = require("../models/Post");

const add = async (req, res)=>{
    const newPost = await new Post(req.body);
    try {
        if (!req.params.token) {
            res.status(401).json("Not login.")
            return 
        }
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
}
const findById =async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
}
const deleteP = async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username=== req.body.username ){
            try{
                await post.delete();
                res.status(200).json("Your post has been deleted!");
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can only delete your own posts.")
        }
    }catch(err){
        res.status(500).json(err);
    }
}
const findAll =async (req, res) => {
    try {
        let posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {add, findById, findAll, deleteP}