//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import db.js
const db = require('./db')





//register - asynchronous
const register = (username, uid, password) => {
  //asynchronous
  return db.User.findOne({
    uid
  }).then(user => {
    console.log(user);
    if (user) {
      return {
        status: false,
        message: "Already registered...Please Log In",
        statusCode: 401
      }
    }
    else {
      //insert in db
      const newUser = new db.User({
        uid,
        username,
        password,
        event: []
      })
      newUser.save()
      return {
        status: true,
        message: "Registered Successfully",
        statusCode: 200
      }
    }
  })
}

//login - asynchronous
const login = (uid, pswd) => {
  return db.User.findOne({
    uid,
    password: pswd
  }).then(user => {
    if (user) {
      console.log(user);
      currentUser = user.username
      currentUid = uid
      //token generation
      token = jwt.sign({
        //store account number inside token
        currentUid: uid
      }, 'verysecured98765')

      return {
        status: true,
        message: "Log In Successfully",
        statusCode: 200,
        currentUser,
        currentUid,
        token
      }
    }
    else {
      return {
        status: false,
        message: "Invalid User Id or Password",
        statusCode: 401
      }
    }
  })
}


const addEvent = (uid,date,event) => {
    random_id=Math.floor(1000 + Math.random() * 9000);
    return db.User.findOne({
        uid
    }).then(user=>{
        if(user){
            user.event.push({
                event_id:random_id,
                event_date:date,
                event_desc:event
            })
            user.save()
            return{
                status:true,
                message:"Event added",
                statusCode:200
            }
        }else{
            return{
                status:false,
                message:"Error occured",
                statusCode:402
            }
        }
    })
}

const event=(uid)=>{
  return db.User.findOne({
      uid
  }).then(user=>{
      if(user){
          return{
              status:true,
              statusCode:200,
              event:user.event
          }
      }else{
          return{
              status:false,
              message:"Error occured",
              statusCode:402
          } 
      }
  })
}

const deleteEvent=(uid,index)=>{
  return db.User.findOne({
      uid
  }).then(user=>{
      if(user){
          user.event.splice(index,1)
          user.save()
          return{
              status:true,
              message:"Event deleted",
              statusCode:200
          }
      }
      else{
          return{
              status:false,
              message:"Error occured",
              statusCode:402
          } 
      }
  }) 
}

const updateEvent=(uid,index,event_id,date,event)=>{
  const data={
      event_id:event_id,
      event_date:date,
      event_desc:event
  }
  return db.User.findOne({uid,event_id})
  .then(user=>{
      if(user){
          user.event.splice(index,1,data)
          user.save()
          return{
              status:true,
              statusCode:200,
              message:"Event updated"
            } 
      }else{
          return{
              status:true,
              statusCode:400,
              message:"Error occured"
            } 
      }
  })
}

const deleteAcc=(uid)=>{
  return db.User.deleteOne({uid})
  .then(user=>{
      if(user){
          return{
            status:true,
            statusCode:200,
            message:"User deleted"
          } 
        }else{
          return {
            status:false,
            message:"User not existing",
            statusCode:401
          }
        }
  })
}


//export
module.exports = {
    register,
    login,
    event,
    deleteEvent,
    deleteAcc,
    updateEvent,
    addEvent
  }