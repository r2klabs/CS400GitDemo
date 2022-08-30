const { request } = require('express')
const express = require('express')
const res = require('express/lib/response')
const router = express.Router()


router.get("/", (req,res) =>{
    console.log(req.query.name)
    res.send('User List')
})

router.get("/new", (req, res)=>{
    res.render("users/new", {firstName: "Test"})

})

router.post("/", (req, res)=>{
    const isValid = true
    if(isValid){
        users.push({firstName: req.body.firstname})
        res.redirect(`/users/${users.length-1}`)
    }
    else{
        console.log("Error")
        res.render('users/new', {firstName: req.body.firstName})

    }
})

//Dynamic routes need to come after static routes.
/*
router.get("/:id", (req, res)=>{
    res.send(`Get user ${req.params.id}`)
})

router.put("/:id", (req, res)=>{
    res.send(`Update user ${req.params.id}`)
})

router.delete("/:id", (req, res)=>{
    res.send(`Delete user ${req.params.id}`)
})
*/
//can combine them into one with function chain.
router.route("/:id")
    .get((req, res)=>{
        res.send(`Get user ${req.params.id}`)
    })
    .put((req, res)=>{
        res.send(`Update user ${req.params.id}`)
    })
    .delete((req, res)=>{
        res.send(`Delete user ${req.params.id}`)
    })

const users = [{fName: "Rob"},{fName:"Mel"}]

//this function runs anytime "id" is passed in.
router.param("id", (req,res, next,id)=>{
    req.user = users[id]
    next()
})

module.exports = router