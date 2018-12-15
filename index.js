const express = require('express');
const app = express();
const mongoose = require('mongoose');
const moment = require('moment');
const db = require('./mongo');
const User = require('./models/user');
const Comment = require('./models/comment');
const bodyParser = require('body-parser');
const Person = require('./models/person');
const Story = require('./models/story');
const Blog = require('./models/blog');
const Author = require('./models/author');
const Category = require('./models/category');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    let bodyInput = req.body;
    let userObject = new User({
        _id: new mongoose.Types.ObjectId(),
        emailid: bodyInput.emailid,
        password: bodyInput.password
    });
    console.log("register=> user info : ", user);
    try {
        let user = userObject.save();
        return res.status(200).json({ message: "register success", data: user });
    } catch (err) {
        return res.status(500).json({ message: "register failed" });
    }
});

app.post('/login', async (req, res) => {
    let bodyInput = req.body;
    // let user = User.findOne({ emailid: bodyInput.emailid, password: bodyInput.password });
    // console.log(" login=> user info : ", user);
    // if (user) {
    //     return res.status(200).json({ message: "login success" });
    // } else {
    //     return res.status(500).json({ message: "login failed" });
    // }
    User.findOne({
        emailid: bodyInput.emailid,
        password: bodyInput.password
    }, function (err, result) {
        console.log(result);
        if (err) {
            return res.status(500).json({ message: "login failed" });
        }
        else if (result) {
            return res.status(200).json({ message: "login success" });
        } else {
            return res.status(409).json({ message: "login failed" });
        }

    });
});

app.post('/blogs', async (req, res) => {
    let blogInput = req.body;
    let blogObject = new Blog({
        title: blogInput.title,
        description: blogInput.description,
        author: blogInput.author,
        category: blogInput.category
    });
    try {
        let user = blogObject.save();
        return res.status(200).json({ message: "Blog created" });
    } catch (err) {
        return res.status(500).json({ message: "Blog creation failed" });
    }
})

app.put('/blogs/:id', async (req, res) => {
    let blogId = req.params.id;
    let blogInput = req.body;
    let blogObject = new Blog({
        title: blogInput.title,
        description: blogInput.description,
        author: blogInput.author,
        category: blogInput.category
    });
    try {
        let blogInfo = await Blog.findById({ _id: blogId });
        console.log("-> blogInfo : ", blogInfo);
        if (blogInfo) {
            delete blogInfo._id;
            let updatedBlog = await blogInfo.updateOne({ _id: blogId }, blogObject);
            return res.status(200).json({ message: "Blog updaed" });
        } else {
            return res.status(200).json({ message: "Blog not found for the id : ", blogId });
        }
    } catch (err) {
        return res.status(500).json({ message: "Blog updation failed", err });
    }
})

app.get('/blogs', async (req, res) => {
    try {
        let blogs = await Blog.find({});
        return res.status(200).json({ message: "Blog created", data: blogs });
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch blogs" });
    }
})

app.get('/blogs/:id', async (req, res) => {
    let blogId = req.params.id;
    try {
        let blog = await Blog.findOne({ _id: blogId, deleted: true });
        if (blog) {
            return res.status(200).json({ message: "Blog created", data: blog });
        } else {
            return res.status(200).json({ message: "Blog not found for the id : " + blogId, data: null });
        }
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch blog" });
    }
})


app.delete('/blogs/:id', async (req, res) => {
    let blogId = req.params.id;
    try {
        let blogInfo = await Blog.findById({ _id: blogId });
        if (blogInfo) {
            delete blogInfo._id;
            let updatedBlog = await blogInfo.updateOne({ deleted: true }, { _id: blogId });
            return res.status(200).json({ message: "Blog deleted " });
        } else {
            return res.status(200).json({ message: "Blog not found for the id : ", blogId });
        }
    } catch (err) {
        return res.status(500).json({ message: "Blog deletion failed", err });
    }
});

// author


app.post('/authors', async (req, res) => {
    let authorInput = req.body;
    let authorObject = new Author({
        name: authorInput.name,
        emailid: authorInput.emailid,
        phone: authorInput.phone
    });
    try {
        let user = authorObject.save();
        return res.status(200).json({ message: "Author created" });
    } catch (err) {
        return res.status(500).json({ message: "Author creation failed" });
    }
})

app.put('/authors/:id', async (req, res) => {
    let authorId = req.params.id;
    let authorInput = req.body;
    let authorObject = new Author({
        name: authorInput.name,
        emailid: authorInput.emailid,
        phone: authorInput.phone,
        updatedAt: moment.utc().valueOf()
    });
    try {
        let authorInfo = await Author.findById({ _id: authorId });
        console.log("-> authorInfo : ", authorInfo);
        if (authorInfo) {
            let updatedBlog = await authorInfo.updateOne({ _id: authorId }, authorObject);
            return res.status(200).json({ message: "Author updaed", updatedBlog });
        } else {
            return res.status(200).json({ message: "Author not found for the id : ", authorId });
        }
    } catch (err) {
        return res.status(500).json({ message: "Author updation failed", err });
    }
})

app.get('/authors', async (req, res) => {
    try {
        let authors = await Author.find({ deleted: false });
        return res.status(200).json({ message: "Fetch Authors", data: authors });
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch Authors" });
    }
})

app.get('/authors/:id', async (req, res) => {
    let authorId = req.params.id;
    try {
        let author = await Author.findOne({ _id: authorId, deleted: false });
        console.log(" => author : ", author)
        if (author) {
            return res.status(200).json({ message: "Fetch Athor", data: author });
        } else {
            return res.status(200).json({ message: "failed to fetch author for the id : ", data: null });
        }
    } catch (err) {
        return res.status(500).json({ message: "Failed to fetch author ", err });
    }
})


app.delete('/authors/:id', async (req, res) => {
    let authorId = req.params.id;
    try {
        let authorInfo = await Author.findById({ _id: authorId });
        if (authorInfo) {
            let updatedAuthor = await authorInfo.updateOne({ deleted: true }, { _id: authorId });
            return res.status(200).json({ message: "Author deleted", updatedAuthor });
        } else {
            return res.status(200).json({ message: "Author not found for the id : ", authorId });
        }
    } catch (err) {
        return res.status(500).json({ message: "Author deletion failed", err });
    }
})
app.get('/', (req, res) => {
    res.status(200).json({ message: "ok" });
})

app.post('/users', (req, res) => {
    console.log("--------", req.body);
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email
    });
    user.save((err) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        const comment = new Comment({
            text: "test123 comment",
            user: user._id
        });
        comment.save((err) => {
            if (!err) {
                res.status(200).json({ message: "User inserted successfully" });
            }
        })
    });
});

app.post('/comments', (req, res) => {
    console.log("--------", req.body);
    const comment = new Comment({
        text: req.body.text
    });
    comment.save((err) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({ message: "comment inserted successfully" });
    });
})

app.get('/users', (req, res) => {
    User.find({ "name": "imran" })
        .populate('comments')
        .exec((err, users) => {
            console.log(users);
            if (err) {
                res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json({ data: users });
        });
});

app.post("/author", (req, res) => {

    var author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ian Fleming',
        age: 50
    });
    author.save(function (err) {
        console.log("author saved..")
        if (err) return handleError(err);

        var story1 = new Story({
            title: 'Casino Royale',
            author: author._id    // assign the _id from the person
        });

        story1.save(function (err) {
            if (err) return handleError(err);
            // thats it!
            console.log("Done!");
            res.status(200).json({ message: "Author inserted successfully" });
        });
    });
});

app.get('/stories', (req, res) => {
    Story.
        find({ title: 'Casino Royale' }).
        populate('author').
        exec(function (err, story) {
            if (err) return handleError(err);
            // console.log('The author is %s', story.author.name);
            // prints "The author is Ian Fleming"
            res.status(200).json({ data: story });
        });
})

// app.get('/authors', (req, res) => {
//     Person.
//         find({ name: "Ian Fleming" }).
//         populate('stories').
//         exec(function (err, story) {
//             if (err) return handleError(err);
//             // console.log('The author is %s', story.author.name);
//             // prints "The author is Ian Fleming"
//             res.status(200).json({ data: story });
//         });
// })
app.listen(5000, () => {
    console.log("server is up on 5000");
});