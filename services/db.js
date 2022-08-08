const mongoose= require('mongoose')
mongoose.connect('mongodb://localhost:27017/reminderServer',{
    useNewUrlParser:true
})
const User = mongoose.model('User',{
    uid: Number,
    username: String,
    password: String,
    event:[] 
})

module.exports={
    User
}