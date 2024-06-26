const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('../models/User.model');
const post = require('../models/post.model');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/'});
const comment = require('../models/comment.model');
const fs = require('fs');


const salt = bcrypt.genSaltSync(10);
const secret = 'bdudfvbfveirvb'

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));



async function connectToMongoDB() {
  try {
    
    await mongoose.connect( process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectToMongoDB();



app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create
    ({ username, password:bcrypt.hashSync(password,salt) 
    });

    res.json(userDoc);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
   const userDoc = await User.findOne({username});
   const passOk= bcrypt.compareSync(password, userDoc.password);
   if (passOk) {
    
    jwt.sign({username,id:userDoc._id},secret, {}, (err,token)=> {
        if (err) throw err;
        res.cookie('token',token).json({
            id:userDoc._id,
            username,
        });
    });

   } else {
    res.status(400).json('wrong credentials');
}
  });

  app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    try {
      console.log("Profile: token", token)
      jwt.verify(token, secret, {}, (err, info)=> {
        if (err) throw err;
        res.json(info);
      });
    } catch(err) {
      console.error("Could not verify token", err)
      res.status(401).json({
        token
      })
    }

}); 

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);


    const {token} = (req.cookies);
    jwt.verify(token, secret, {}, async (err,info)=> {
        if (err) throw err;
        const {title, summary, content} = req.body;

        const postDoc = await post.create({
        title, 
        summary,
        content,
        cover:newPath,
        author:info.id,
       
        });
        res.json({postDoc});
        
    });



});
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }
  
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, summary, content } = req.body;
      const postDoc = await post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
  
   
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      postDoc.cover = newPath ? newPath : postDoc.cover;
  
      
      await postDoc.save();
  
      res.json(postDoc);
    });
  
  });
  
  

app.get('/post', async (req, res) => {
    res.json(
        await post.find()
.populate('author', ['username'])
.sort({createdAt: -1})
.limit(25)
    )
});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await post.findById(id).populate('author', ['username'])
    res.json(postDoc);

})



app.post('/post/:postId/comments', async (req, res) => {
    try {
      const { text } = req.body;
      const { postId } = req.params;
      const userId = req.user.id; 
  
      const comment = await Comment.create({ text, postId, userId });
  
      res.json(comment);
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(4000, () => {
    console.log('listening on port 4000');
});
