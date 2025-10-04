const express = require("express");
const { users } = require("../data/users.json");

const router = express.Router()


// route :- /users

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})

// route :- /users/:id

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `user not find with id:${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user

    })


})

// create a new user

router.post('/', (req, res) => {
    const { id, name, email, membership_type, joined_date, borrowed_books } = req.body;

    if (!id || !name || !email || !membership_type || !joined_date || !borrowed_books) {
        return res.status(400).json({
            success: false,
            message: "please provide all the details"
        })
    }

    const user = users.find((each) => each.id === id)

    if (user) {
        return res.status(409).json({
            success: false,
            message: "user already exists"
        })
    }

    users.push({ id, name, email, membership_type, joined_date, borrowed_books })
    res.status(401).json({
        success: true,
        message: 'user created succesfully'
    })
})

// updating the user

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `user not found with id:${id}`
        })
    }

    const updateUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data
            }
        }

        return each
    })

    res.status(200).json({
        success: true,
        data: updateUser,
        message: "user updated succesfully"
    })
})

// deleting a user by their id

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    //check if user exists
    const user = users.find((each) => each.id === id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `user not found with id:${id}`
        })
    }

    const updateUser = users.filter((each) => each.id !== id)

    //method 2

    //  const index = users.indexOf(user)
    //  users.splice(index, 1)     //(you cant print this method)

    res.status(200).json({
        success: true,
        data: updateUser,
        message: "user deleted succesfully"
    })
})    


// get the subscription details of users
    
 router.get('/subscription-details/:id', (req,res)=>{

        const {id} = req.params;
        
        const user = users.find((each) => each.id === id)
        if(!user){
            return res.status(404).json({
                success:false,
                message : `user not found with id:${id}`
            })
        }

        const getDateinDays = (data = '')=>{
            let date;
            if(data){
                 date = new Date (data);
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
            ...user,
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
     })

module.exports = router;