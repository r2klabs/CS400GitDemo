/*
Sample file for using express.
*/
const express = require("express")
const app = express()

//set up static page
app.use(express.static("public"))
//allows you to access the body of html page (boilerplate)
app.use(express.urlencoded({extended: true}))
//allows access to json
app.use(express.json())

app.set('view engine',  'ejs')

//const livereload = require("livereload")
//const connectLiveReload = require("connect-livereload")

//const liveReloadServer = livereload.createServer()
/*
liveReloadServer.server.once("connection", ()=>{
    setTimeout(() => {
        liveReloadServer.refresh("/")
    },
    100)
} )

app.use(connectLiveReload())
*/

//this puts the logger on just the app.get
//this is middleware
/*
app.get("/",logger, (req, res) => {
    //console.log("I am here.")
    //res.json({message: "Error"})
    res.render("index", {name: "Robert"})
})
*/

//Evaluates top to bottom. The functions affect by logger
//depend on where your use statement is.
//app.use(logger)
const userRouter = require('./routes/users')
const { connect } = require("./routes/users")

app.use('/users', userRouter)


//if I put in users.js, it would apply to users only.
function logger(req, res,next){
    console.log(req.originalUrl)
    next()
}

app.listen(3000, ()=>{
    console.log(`App @ http://localhost:3000`)
})