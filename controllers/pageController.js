const Posts = require('../model/Posts');

exports.getAddPage = (req, res) => {
    res.render('add_post');
};

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getEditPage = (req, res) => {
    res.render('add_post');
};
