const Post = require('../model/Posts');
const moment = require('moment');
const fs = require('fs');

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find({}).sort('-dateCreated');
    res.render('index', {
        posts: posts,
    });
};

exports.addPost = async (req, res) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    let uploadedPath = __dirname + '/../public/uploads/' + uploadedImage.name;

    uploadedImage.mv(uploadedPath, async () => {
        await Post.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name,
            dateCreatedShow: moment().format('MMMM DD, YYYY'),
        });
        console.log(req.body);
        res.redirect('/');
    });
};

exports.getPost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', {
        post: post,
    });
    console.log(post);
};

exports.deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    let deletedImage = __dirname + '/../public' + post.image;
    if (fs.existsSync(deletedImage)) {
        fs.unlinkSync(deletedImage);
    }

    await Post.findByIdAndRemove(req.params.id);
    res.redirect('/');
};
