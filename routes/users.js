const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
//Models
const User=require('../Models/User');


/* GET users listing. */
router.get('/',(req, res, next)=> {
  res.send('respond with a resource');
});

module.exports = router;

router.post('/register',(req,res,next)=>{
const {username,password}=req.body;
bcrypt.hash(password,10).then((hash)=>{
  let user=new User({
    username:username,
    password:hash
  });
  const promise=user.save();
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });

})


});

router.post('/authenticate',(req,res,next)=>{
  const {username,password}=req.body;
  User.findOne({username:username},(err,user)=>{
    if (err)
      throw err;
    if (!user){
      res.json({
        status:false,
        message:'authenticate failed, user not found'
      });
    }
    else{
      bcrypt.compare(password,user.password).then((result)=>{
        if (result){
          const payload={
            username:username
          };
          const token=jwt.sign(payload,req.app.get('api_secret_key'),{
            expiresIn: 720
          });

          res.json({
            status:true,
            token:token
          })


        }
        else {
          res.json({
            status:false,
            message:'authenticate failed, wrong password '
          });
        }

      })

    }

  });



});