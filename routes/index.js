var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
//routes go here!
//as per chat with rj, start to compartmentalize the file structure more using Kyle's example.....he has a series of the actions compartmentalized within the db folder that make his routes much shorter!


/* GET home page. */
router.get('/blogpost', function(req, res, next) {
   knex('blogpost')

  // res.render('index', { title: 'Express' });
  .then(blogpost => {
    res.send(blogpost);
  })
});

router.get('/blogpost/:id', (req, res, next) => {
  knex('blogpost').where('id', req.params.id)
  .then(blogpost => {
    res.send(blogpost);
  })
})

// have it set up, but probably won't need it!
router.get('/user', (req,res,next) => {
  knex('user')

  .then(user => {
    res.send(user);
  })
})


router.get('/comment', (req,res,next) => {
  knex('comment')

  .then(comment => {
    res.send(comment);
  })
})
//remember! http POST localhost:8000/zebras name="fred" location="San diago" stripes:=8 if the data is a string ="" if an int, :=8
//p 2 - as I go further down the road, leveraging the example of movie crud, should I refactor and prep that object outside of the routes page? A - could, but shouldn't need to


//as per brad- with the routes....you need to first go to the authors list, to see if there's an author in the database....if yes, then use that existing id in the post....if NOT, then insert into the user/authors table that person,, return the id (wierd .returning('id').)


//first attempt at getting info in ergo, submitting a user email string- this will need to be altered based on info from brad


//ao 9:30- the basic functionality of post works!



/*! on your blogpost page, you'll need to take the name and email*/
// ergo, you'll also need to test the post calls feeding the router that info!



//walking through the logic here
router.post('/blogpost', (req,res,next) => {
  knex('user').where('email', req.body.user_email).first()
  .then(user => {
    if (!user) {
      return knex('user')
        .insert({
          name: req.body.name,
          email:req.body.user_email,
        })
    }
  })
  .then(()=> {
  return knex('blogpost').insert({
  title:req.body.title,
  body:req.body.body,
  user_email: req.body.user_email,
  } ,'id')

  })
  .then(id => {
    res.status(200).send(`something happened...${id}`)
  })
  .catch(err => {
    res.status(503).send(err.message)
  })
})
//figure out the post/patch/delete routes

//as per danny, this is another fairly complicated post request-
//1- need to check if user exists (much like the blogpost post req) 2- you also need to check if the blogpost commented on exists!
//not entirely sure if you will need to check if the blogpost exists.....the edit comment page could have a large form much like the edit form on movies and therefore workaround the need for a second .then statement!
router.post('/comment', (req,res,next) => {
  knex('user').where('email', req.body.user_email).first()
  .then(user => {
    if (!user) {
      return knex('user')
        .insert({
          name: req.body.name,
          email:req.body.user_email,
        })
    }
  })
  // .then(
  //   return knex('blogpost').where()
  // )

  .then(() => {
  return knex('comment').insert({
    body:req.body.body,
    user_email:req.body.user_email,
    blogpost_id:req.body.blogpost_id,
    /* the email can be submitted because it can be scrubbed, but a second loop to .then check for a blogpost id seems like something that could be caught more upstream!*/
    //  table.integer('blogpost_id').references('id').inTable('blogpost')
    }, 'id')
  })
  .then(id => {
    res.send(`something else happened ${id}`)
  })


})

/* will need
router.put route to edit a blogpost,
and a
router.pus to edit a comment

*/

router.delete('/blogpost/:id', (req,res,next) => {
  knex('blogpost').where('id', parseInt(req.params.id)).del()
  // .then(() => {
  //   //my attempt cj style commented out, wasn't working!
  //   // res.redirect('/blogpost');
  //   // res.send(knex('blogpost'))
  //   //this was my default that works- res.status(204).send()
  //   knex('blogpost')
  // })
  //  // res.render('index', { title: 'Express' });
  //  .thenblogpost =>
  //    res.send(blogpost);
     .then(() => {
       res.status(204).send()
     })
})

router.delete('/comment/:id', (req,res,next) => {
  knex('comment').where('id',
  parseInt(req.params.id)).del()
  .then(() => {
    res.status(204).send()
  });
})


module.exports = router;
