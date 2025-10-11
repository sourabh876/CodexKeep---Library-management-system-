const {BookModel,UserModel} = require("../Models/model")


//get all the users
exports.getAllUsers = async (req,res) =>{
    const users = await UserModel.find()

    if(users.length === 0){
       return res.status(404).json({
        success: false,
        message: "no users found"
       })
    }
    res.status(200).json({
        success: true,
        data: users
    })
}

//get user by id
exports.getUserbyId = async (req,res) =>{
    const { id } = req.params;
    const user = await UserModel.findById(id)

    if(!user){
       return res.status(404).json({
        success: false,
        message: `user not find with id:${id}`
       })
    }
    res.status(200).json({
        success: true,
        data: user
    })
}

//create a new user
exports.createNewUser = async (req,res) =>{
    const {data} = req.body;
    

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "please provide all the details"
        })
    }

    // const user = await UserModel.findById(id)

    // if (user) {
    //     return res.status(409).json({
    //         success: false,
    //         message: "user already exists"
    //     })
    // }

    const newUser = await UserModel.create(data)
    res.status(201).json({
        success: true,
        data: newUser
    })
}
//update user by id

exports.updateUserbyId = async (req,res) =>{
    const { id } = req.params;
    const {data} = req.body

    const user = await UserModel.findById(id)

    if(!user){
       return res.status(404).json({
        success: false,
        message: `user not find with id:${id}`
       })
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
        {id},
        data,
        {new: true}
    )

    if(!updatedUser){
       return res.status(404).json({
        success: false,
        message: `user not find with id:${id}`
       })
    }

    res.status(200).json({
        success: true,
        data: updatedUser
    })
}

//delete user by id
exports.deleteUserbyId = async (req,res) =>{
    const { id } = req.params;

    const user = await UserModel.findById(id)

    if(!user){
       return res.status(404).json({
        success: false,
        message: `user not find with id:${id}`
       })
    }

    await UserModel.findByIdAndDelete(id)

    res.status(200).json({
        success: true,
        message: "user deleted succesfully"
    })
}

//get subscription details of user by id
exports.getSubscriptionDetailsbyId = async (req,res) =>{
    const { id } = req.params;
    const user = await UserModel.findById(id)

    if(!user){
       return res.status(404).json({
        success: false,
        message: `user not find with id:${id}`
       })
    }
    const getDateinDays = (data = '')=>{
        let date;
        if(data){
            date = new Date(data);
        }else{
            date = new Date()
        }

        let days = Math.floor(date/(1000*60*60*24));
        return days;
    }

    const subscriptionType = (date)=>{
          if(user.subscriptiontype === "basic"){
            date = date + 90;
          }else if (user.subscriptiontype === "standard"){
            date = date + 180;
          }else if (user.subscriptiontype === "premium"){
            date = date + 365;
          }
          return date;
    }

    let returnDate = getDateinDays(user.returndate);
    let currentDate = getDateinDays();
    let subscriptionDate = getDateinDays(user.subscriptiondate);
    let subscriptionExpiration = subscriptionType (subscriptionDate);

    let data = {
        ...user._doc,
        subscriptionExpired : subscriptionExpiration < currentDate,
        subscriptionDaysLeft : subscriptionExpiration - currentDate,
        DaysLeftForExpiration : returnDate - currentDate,
        returnDate : returnDate < currentDate ? "book is overdue" : returnDate,
        fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        data
    })
}