const express = require('express')
const app = express()
const dataService = require('./services/data.service')
const jwt = require('jsonwebtoken')
const cors = require('cors')
app.use(cors({
    origin:'http://localhost:4200'
}))
app.use(express.json())
const appMiddleware = (req, res, next) => {
    console.log("Application specific middleware");
    next()
}
app.use(appMiddleware)
app.listen(3000, () => {
    console.log("Server started at 3000");
})
const jwtMiddleware = (req, res, next) => {
    try {
        //fetch token
        token = req.headers['access-token']
        //verify token
        const data = jwt.verify(token, 'verysecured98765')
        console.log(data);
        req.currentUid = data.currentUid
        next()
    }
    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Please Log In"
        })
    }
}

//register API
app.post('/register', (req, res) => {
    //register solving - asynchronous
    dataService.register(req.body.username, req.body.uid, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//login API
app.post('/login', (req, res) => {
    //login solving - asynchronous
    dataService.login(req.body.uid, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//event API
app.post('/event', (req, res) => {
    //event solving - asynchronous
    dataService.event(req.body.uid)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/addEvent',(req,res)=>{
    dataService.addEvent(req.body.uid,req.body.date,req.body.event).then(result=>{
        res.status(res.statusCode).json(result)
    })
})

app.post('/deleteEvent',(req,res)=>{
    dataService.deleteEvent(req.body.uid,req.body.index).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.delete('/deleteAcc/:uid',jwtMiddleware,(req,res)=>{
    dataService.deleteAcc(req.params.uid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.post('/updateEvent',(req,res)=>{

    dataService.updateEvent(req.body.uid,req.body.index,req.body.event_id,req.body.date,req.body.event).then(result=>{
        res.status(result.statusCode).json(result)
    })
})