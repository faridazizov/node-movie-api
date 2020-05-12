const mongoose= require('mongoose');
const express=require('express');
const router= express.Router();

//Models
const Movie=require('../Models/Movie');


router.post('/',(req,res,next)=>{
   let movie= new Movie(req.body);
   const promise=movie.save();

   promise.then((movie)=>{
       if (movie)
       res.json(movie);
       else
           next({message:'olmadi kakass'});
   }).catch((error)=>{
      res.json(error);
   });

});

router.get('/',(req,res,next)=>{
   const promise=Movie.find({});
   promise.then((movies)=>{
       res.json(movies);
   }).catch((error)=>{
      res.json(error);
   });
});



router.get('/Top10',(req,res,next)=>{
   const promise=Movie.find({}).sort({imdb_score:-1}).limit(3);

   promise.then((movies)=>{
      res.json(movies);
   }).catch((err)=>{
       res.json(err);
   });
});

router.get('/full',(req,res,next)=>{
    const promise=Movie.aggregate([
        {
            $lookup:{
                from:'directors',
                localField:'director_id',
                foreignField:'_id',
                as:'director'
            }
        },
        {
            $unwind:'$director'
        }

    ]) ;

    promise.then((movies)=>{
        res.json(movies);
    }).catch((err)=>{
        res.json(err);
    });
});


router.get('/:movie_id',(req,res,next)=>{
    const promise=Movie.findById(req.params.movie_id,'title year country imdb_score');

    promise.then((movie)=>{
        if(!movie) {
            next({type: 'error', message: 'film tapilmadi kele!!!', code: 404});

        }
        else {
            res.json(movie);
        }
    }).catch((error)=>{
       res.json(error);
    });
});

router.put('/:movie_id',(req,res,next)=>{
    const promise=Movie.findByIdAndUpdate(req.params.movie_id,req.body,{new:true});

    promise.then((movie)=>{
       if(movie)
           res.json(movie);
       else
           next({message:'ohh my god,,movie not found',code:777});
    }).catch((err)=>{
        res.json(err);
    });
})

router.delete('/:movie_id',(req,res,next)=>{
    const promise=Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((movie)=>{
        if(movie)
            res.json({status:'ok',message:'silindi'});
        else
            next({message:'not deleted)),ohh my god,,movie not found',code:777});
    }).catch((err)=>{
        res.json(err);
    });
});

router.get('/between/:start_year/:end_year',(req,res,next)=>{
    const { start_year, end_year} = req.params;
    const promise=Movie.find({

         year:{"$gte":parseInt(start_year) ,"$lte":parseInt(end_year) }


    });
    promise.then((movies)=>{
        res.json(movies);

    }).catch((err)=>{
        res.json(err);
    });
});


router.get('/full/:movie_id',(req,res,next)=>{
    const id=mongoose.Types.ObjectId(req.params.movie_id);
   const promise=Movie.aggregate([
       {
           $match:{
               '_id':id
           }
       },
       {
           $lookup:{
               from:'directors',
               localField:'director_id',
               foreignField:'_id',
               as:'director'
           }
       },
       {
           $unwind:'$director'
       }

   ]);

   promise.then((movie)=>{
      res.json(movie);
   }).catch((err)=>{
       res.json(err);
   });

});








module.exports=router;