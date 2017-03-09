







$('.submit').on('click', function (e) {
     console.log('button works 2');
    e.preventDefault();
    var blogPost = {}

    blogPost.title = $('.title').val();
    blogPost.name = $('.author').val();
    blogPost.user_email = $('.email').val();
    blogPost.body = $('.body').val();
   console.log(blogPost);
    $.ajax({
      url: '/blogpost',
      type: 'POST',
      data: blogPost,
    })
    .then((data) => {
      console.log(data);
    //this other way of doing things didn't work either! 
      $('.newBlogPost').children('input').val('');

    })
    .catch((err) => {
    console.log(err)
    })
})
