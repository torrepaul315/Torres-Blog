
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
//  i think the next line is correct?
  return knex('blogpost').del()
    .then(function () {
      // Inserts seed entries
      return knex('blogpost').insert([
        {title: 'airplanes', body:'heres a shorte blog post article', user_email:'moe@gmail.com'},
        {title: 'cars', body:'heres a different blog post article', user_email:'joe@gmail.com'},
        {title: 'trains', body:'heres one more blog post article', user_email:'curly@gmail.com'},
      ]);
    });
};






// {id: 1, name: 'juan'},
// {id: 2, name: 'alfred'},
// {id: 3, name: 'geo'}
