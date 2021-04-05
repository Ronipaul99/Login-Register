const userDB = require('../model/userslogin');

const userService = {}

//login a user
userService.login = (email, userPassword) => {
    return userDB.checkUser(email).then((user) => {
        if (user == null) {
            let err = new Error("Enter registered contact number! If not registered, please register")
            err.status = 404
            throw err
        }
        else {
            return userDB.getPassword(email).then((password) => {
                if (password != userPassword) {
                    let err = new Error("Incorrect password")
                    err.status = 406
                    throw err
                }
                else {
                    return user;
                }
            })
        }
    })
}
userService.registerUser= (user) =>{
   return userDB.findUserWithEmail(user.email).then((userreport)=>{
       if(userreport == null){
            return userDB.generateUserId().then((userID)=>{
                user.userId=userID;
                return userDB.RegisterUser(user).then((userdata)=>{
                    if(userdata != null){
                        return userdata.userId
                    }else{
                        err= new Error("user cant registered error occured")
                        err.status=406;
                        throw err;
                    }
                })
            })
        }else{
            err = new Error("User with this email already exist");
            err.status=502;
            throw err;
        }
    })
}



module.exports = userService
    