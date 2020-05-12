const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

//Models
const Director=require('../Models/Director');

//post
router.post('/',(req,res,next)=>{
    let director= new Director(req.body);
    const promise=director.save();

    promise.then((director)=>{
        res.json(director);

    }).catch((err)=>{
        res.json(err);
    });
});

//get
router.get('/',(req,res,next)=>{
    const promise=Director.find({});

    promise.then((directors)=>{
        res.json(directors);
    }).catch((err)=>{
       res.json(err);
    });

});

router.get('/full',(req,res,next)=>{
   const promise=Director.aggregate([
       {
           $lookup:{
               from:'movies',
               localField:'_id',
               foreignField:'director_id',
               as:'movies'
           }
       },
       {
           $unwind:{
               path:'$movies',
               preserveNullAndEmptyArrays:true
           }
       },
       {
           $group:{
               _id:{
                   _id:'$_id',
                   name:'$name',
                   surname:'$surname',
                   bio:'$bio'
               },
               movies:{
                   $push:"$movies"
               }
           }
       },
       {
           $project:{
               _id:'$_id._id',
               name:'$_id.name',
               surname:'$_id.surname',
               movies:'$movies'
           }
       }



   ]) ;

   promise.then((directors)=>{
      res.json(directors);
   }).catch((err)=>{
      res.json(err) ;
   });
});


router.get('/full/:director_id',(req,res,next)=>{
   const id=mongoose.Types.ObjectId(req.params.director_id);
   const promise=Director.aggregate([
       {
           $match:{
               '_id':id
           }
       },
       {
           $lookup:{
               from:'movies',
               localField: '_id',
               foreignField: 'director_id',
               as:'movies'
           }
       },
       {
           $unwind:{
               path: '$movies',
               preserveNullAndEmptyArrays: true
           }
       },
       {
           $group:{
               _id:{
                   _id:'$id',
                   name:'$name',
                   surname:'$surname',
                   bio:'$bio',
                   createAt:'$createAt'
               },
               movies:{
                   $push:'$movies'
               }
           }
       },
       {
           $project:{
               _id:'$_id._id',
               name:'$_id.name',
               surname:'$_id.surname',
               bio:'$_id.bio',
               createAt:'$_id.createAt',
               movies:'$movies'
           }
       }


   ]) ;

   promise.then((director)=>{
      res.json(director);
   }).catch((err)=>{
       res.json(err);
   })
});




router.get('/:director_id',(req,res,next)=>{
   const promise=Director.findById(req.params.director_id);

   promise.then((director)=>{
       if (director){
           res.json(director);
           return;
       }
           next({message:'film tapilmadi kele',code:777});
   }).catch((err)=>{
      res.json(err);
   });
});

//put

router.put('/:director_id',(req,res,next)=>{
   const promise=Director.findByIdAndUpdate(req.params.director_id,req.body,{new:true});

   promise.then((director)=>{
       res.json(director);
   }).catch((err)=>{
       res.json(err);
   });
});

router.delete('/:director_id',(req,res,next)=>{

    const promise=Director.findByIdAndDelete(req.params.director_id);
    promise.then((director)=>{
       res.json({status:1});
    }).catch((err)=>{
        res.json(err);
    });

});


router.put('/:director_id',(req,res,next)=>{

    const promise=Director.findByIdAndUpdate(
        req.params.director_id,
        req.body,
        {
            new:true
        }
    );
    promise.then((director)=>{
        res.json(director);
    }).catch((err)=>{
       res.json(err);
    });

});



module.exports=router;