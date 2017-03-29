







$('.submit').on('click', function (e) {
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
      window.location.href = 'index.html';
    })
    .catch((err) => {
    console.log(err)
    })
})
