const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MovieSchema= new Schema({
   director_id:Schema.Types.ObjectId,
   title:{
       type:String,
       required:[true,'--{PATH}-- bos buraxila bilmez'],
       default:'test',
       maxlength:[25,'<{PATH}> {MAXLENGTH} simvoldan cox ola bilmez--(({VALUE}))'],
       minlength:[2,'<{PATH}> {MINLENGTH} simvoldan az ola bilez--(({VALUE}))'],

   } ,
    year:{
       type:Number,
        required:[true,'--{PATH}-- bos buraxila bilmez'],
        default: 2015,
        max:[2020,'--{PATH}--  {MAX} deyerinden boyuk ola bilmez--(({VALUE}))'],
        min:[1990,'--{PATH}--  {MIN} deyerinden kicik ola bilmez--(({VALUE}))']
    },
    imdb_score:{
        type:Number,
        required:[true,'--{PATH}-- bos buraxila bilmez'],
        default: 5,
        max:[10,'--{PATH}--  {MAX} deyerinden boyuk ola bilmez--(({VALUE}))'],
        min:[1,'--{PATH}--  {MIN} deyerinden kicik ola bilmez--(({VALUE}))']
    },
    category:{
        type:String,
        required:[true,'--{PATH}-- bos buraxila bilmez'],
        default:'test_category',
        maxlength:[15,'<{PATH}> {MAXLENGTH} simvoldan cox ola bilmez--(({VALUE}))'],
        minlength:[2,'<{PATH}> {MINLENGTH} simvoldan az ola bilez--(({VALUE}))'],
    },
    country:{
        type:String,
        required:[true,'--{PATH}-- bos buraxila bilmez'],
        default:'test_country',
        maxlength:[20,'<{PATH}> {MAXLENGTH} simvoldan cox ola bilmez--(({VALUE}))'],
        minlength:[3,'<{PATH}> {MINLENGTH} simvoldan az ola bilez--(({VALUE}))'],
    },
    date:{
       type:Date,
        default:Date.now
    }

});

module.exports=mongoose.model('movie',MovieSchema);