var express= require("express");
const User = require("../model/users.model");
const bcrypt = require("bcrypt");
var app=express.Router();
const success = "User created successfully";

const failure = "User creation failure due to ";

const notFound = "User not found";

// creating new user
app.post("/user/create", (req, res) => {
    console.log(req.body);
    const user = new User(req.body)
    user.save().then(() =>{
        res.send({isSuccess:true,data:{message:success}});
    }).catch((e) => {
        res.send({isSuccess:false,data:{message:failure, error: e.message}});
    })
});

app.put('/user/edit/:email', async (req, res) => {
  try {
      const { email } = req.params;

      // Check if the email field is present in the request body
      if (req.body.email) {
          return res.status(400).send({ isSuccess: false, data: { message: "Updating the email is not allowed." } });
      }

      let user = await User.findOne({ email: email });

      if (!user) {
          return res.status(404).send({ isSuccess: false, data: { message: notFound } });
      }

      // Check if the password is being updated
      if (req.body.password) {
          // Hash the new password
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(req.body.password, salt);
          req.body.password = hash;
      }

      // Apply the updates to the user object
      user = await User.findOneAndUpdate({ email: email }, req.body, {
          new: true,
          runValidators: true // This will ensure your schema's validations are checked
      });

      res.json({ isSuccess: true, data: user });
  } catch (err) {
      res.status(500).send({ isSuccess: false, error: err.message });
  }
});

  // DELETE a user
  app.delete('/user/delete/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findOneAndDelete({ email: email });

      if (!user) {
        return res.status(404).send({isSuccess:false,data:{message:notFound, error:message}});
      }
      res.send('User deleted.');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  // GET all users
app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
module.exports=app;