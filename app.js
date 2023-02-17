const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const app = express();

const Post = require('./model/Posts');
const pageController = require('./controllers/pageController');
const postController = require('./controllers/postController');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
    })
);

//connect DB
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/cleanBlog', () => console.log('db bağlantısı sağlandı'));

app.get('/add_post', pageController.getAddPage);
app.get('/about', pageController.getAboutPage);
app.get('/post/edit/:id', pageController.getEditPage);

app.post('/post', postController.addPost);
app.get('/post/:id', postController.getPost);
app.get('/', postController.getAllPosts);
app.delete('/post/:id', postController.deletePost);

port = 3000;
app.listen(port, () => console.log(`sunucu ${port} portunda çalışıyor`));
