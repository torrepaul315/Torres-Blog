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
//walking through the logic here
router.post('/blogpost', (req,res,next) => {
  knex('user')where('email', req.body.user_email).first()
  .then(user => {
    if (user) {
      return [user.email]
    } else {
      return knex('user')
        .returning('email')
    }
  })



  knex('blogpost').insert({
  title:req.body.title,
  body:req.body.body,
  // user_email:req.body.user_email, !!!! this line doesn't work because the data is supposed to be a foreign key, not submitted by user! bad brad stuff!
} ,'id','blogpost_timestamp')
  /* all fields accounted for take 1!*/
  // table.increments('id').primary();
  // table.string('title');
  // table.string('body');
  // table.string('user_email').references('email').inTable('user');
  // table.timestamp('blogpost_timestamp').defaultTo(knex.fn.now());

  .then(id => {
    res.send(`something happened...${id}`)
  })
})
//figure out the post/patch/delete routes
router.post('/comment', (req,res,next) => {
  knex('comment').insert({
    body:req.body.body,

    // table.increments('id').primary();
    // table.string('body');
    // table.timestamp('comment_timestamp').defaultTo(knex.fn.now());
    /* these last two are also fks and can't be submitted*/
    // table.string('user_email').references('email').inTable('user');
    // table.integer('blogpost_id').references('id').inTable('blogpost')


  }, 'id','comment_timestamp')
  .then(id => {
    res.send(`something else happened ${id}`)
  })


})

/* will most likely need a
router.put route to edit a blogpost, but no put, no patch most likely!
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

// router.delete('/:id', (req,res) => {
//   knex('zebras').where('id', parseInt(req.params.id)).del()
//   .then(() => {
//     res.status(204).send()
//   });
// })





module.exports = router;
