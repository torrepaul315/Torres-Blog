
//so now we are getting the objec with the right data! just need to render it on the page!
function getUrlParameter(sParam) {
  const sPageURL = decodeURIComponent(window.location.search.substring(1));
  const sURLVariables = sPageURL.split('&');
  var returner;

  sURLVariables.forEach((paraName) => {
    const sParameterName = paraName.split('=');
    if (sParameterName[0] === sParam) {
      returner = sParameterName[1] === undefined ? false : sParameterName[1];
    }
  });
  console.log('id:', returner);


  $.ajax({
      method: 'GET',
      url: '/blogpost/' + returner,
    })
    .then((blogArray) => {
      console.log(blogArray)
      renderData(blogArray);
    })
    .catch((err) => {
      console.log(err)
    })


// return returner;
}

$(document).ready(function() {
    //  console.log('linked');

getUrlParameter('id');
// console.log(returner);
  // $.get('/movies')
  //  .then(renderMovies);
  //
  // var movieArray
});

function renderData(blogArray) {
  const blogPost = blogArray[0];
  console.log(blogPost);
  console.log(blogPost.title);
  console.log(blogPost.body);
  // $('.blog-title').text(info.title);
  // $('.director-edit').text(info.director);
  // $('.year-edit').text(info.year);
  // $('.my-rating-edit').text(info.rating);
  // $('.poster-url-edit').attr("src",info.poster);

var individualPost = `<article><header><h2>${blogPost.title}</h2></header>
<footer>posted on:${blogPost.blogpost_timestamp}</footer><div class="lead">${blogPost.body}</div><a href='blog.html?id=${blogPost.id}'>Read More</a>`

$('.bloglist').append($(individualPost));
}
