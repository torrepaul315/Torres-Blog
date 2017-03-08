
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
    .then((data) => {
      console.log(data)
      // renderData(data);
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

// function renderData(info) {
//   console.log(info);
//   $('.movie-title-edit').text(info.title);
//   $('.director-edit').text(info.director);
//   $('.year-edit').text(info.year);
//   $('.my-rating-edit').text(info.rating);
//   $('.poster-url-edit').attr("src",info.poster);
// }
