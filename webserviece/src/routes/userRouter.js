const express = require('express');
const router = express.Router();
const setupUser = require("../model/setupUser")
const userservice = require('../service/userslogin')
const User = require('../model/beanClasses/users')

router.get("/setup", (req, res, next) => {
    setupUser.userSetup().then((data) => {
        res.send(data)
    }).catch(err => next(err));
})

router.post('/login', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    userservice.login(email, password).then(function (userDetails) {
        res.json(userDetails);
    }).catch(err => next(err));
})
router.post('/register',(req,res,next)=>{
   const user = new User(req.body);
    userservice.registerUser(user).then((userid)=>{
        if(userid){
            res.json({"message":"Registir Successfully with userID: " +userid})
        }
    }).catch((err)=>{
        next(err)
    })
})


module.exports = router;

