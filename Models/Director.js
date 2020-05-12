'use strict'
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const DirectorSchema= new Schema({
   name:{
       type:String,
       default:'test name',
       required:[true,'<{PATH}> bos buraxila bilmezz!!!'],
       maxlength:[20,'<{PATH}> {MAXLENGTH} simvooldan cox ola bilmez!!!(({VALUE}))'],
       minlength:[2,'<{PATH}> {MINLENGTH} simvooldan az ola bilmez!!!(({VALUE}))']
   },
    surname:{
        type:String,
        default:'test surname',
        required:[true,'<{PATH}> bos buraxila bilmezz!!!'],
        maxlength:[20,'<{PATH}> {MAXLENGTH} simvooldan cox ola bilmez!!!(({VALUE}))'],
        minlength:[2,'<{PATH}> {MINLENGTH} simvooldan az ola bilmez!!!(({VALUE}))']
    },
    bio:{
        type:String,
        default:'test bioooooooooo',
        required:[true,'<{PATH}> bos buraxila bilmezz!!!'],
        maxlength:[500,'<{PATH}> {MAXLENGTH} simvooldan cox ola bilmez!!!(({VALUE}))'],
        minlength:[15,'<{PATH}> {MINLENGTH} simvooldan az ola bilmez!!!(({VALUE}))']
    },
    createAt:{
       type:Date,
        default:Date.now
    }


});

module.exports=mongoose.model('director',DirectorSchema);