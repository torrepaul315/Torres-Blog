// need to- limit length of post to 3 sentences, and also insert the blog posts in chron order! 



$(document).ready(function() {
  // alert('page has loaded');
  $.get('/blogpost')
  //  .then((result) => {
  //    console.log(result)
  //  })
    .then(renderPosts);


//   var movieArray
//
//   //this function breaks down the movie object into an array and then fires up the list building function
   function renderPosts(postInfo) {
 //as per jeff, add the index with the for each, so that each href in the generated list is unique! that way it loads the page with the additional info

     postInfo.forEach((blogPost, i) => {

      var individualPost = `<article><header><h2>${blogPost.title}</h2></header>
      <footer>posted on:${blogPost.blogpost_timestamp}</footer><div class="lead">${blogPost.body}</div><a href='blog.html?id=${blogPost.id}'>Read More</a>`


      $('.bloglist').append($(individualPost));

     })

      //   var movieItem = `<tr class="movie-item" id=${film.id}>
      //  <td class='movie-show'><a href="./show.html?id=${i}">${film.title}</a></td>
      //   <td>${film.director}</td>
      //   <td>${film.year}</td>
      //  <td>${film.rating}</td>
      //   <td><button type="button" class="btn btn-primary delete ${film.title}">Delete Movie</button></td>
      //   <td><a type="button" class="btn btn-primary edit ${film.title}" href="./edit.html?id=${i}">Edit</a></td></tr>`;
    }
})
