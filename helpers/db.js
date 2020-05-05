const mongoose=require('mongoose');

module.exports=()=>{
    mongoose.connect('mongodb://localhost:27017/movie-api', {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('open',()=>{
       console.log('mongodb:connected , successfully!!!');
    });
    mongoose.connection.on('error',(error)=>{
        console.log('mongodb-error::',error);
    });

  mongoose.Promise=global.Promise;
}