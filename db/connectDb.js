const mongoose =require('mongoose')


const connectDb = () =>{

    return mongoose.connect('mongodb://127.0.0.1:27017/admissionportalprojject')

.then(()=>{

    console.log('connect db')

})
.catch((error)=>{

    console.log(error)
})


}

module.exports = connectDb