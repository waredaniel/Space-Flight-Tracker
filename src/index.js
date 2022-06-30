import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SpaceflightTrack from './services/Spaceflight-Tracker';
import News from './services/CurrentsNews.js';

function getSpaceflight(response) {
  if (response) {
    for (let i = 0; i < response.results.length; i++) {
      $('.brifeNote').append(`<p>${response.results[i].window_start.replace("T"," ").replace("Z", "")}.</p> <p>${response.results[i].name.slice(0, (response.results[i].name.indexOf("|")-1))} was launched at ${response.results[i].location} and supported by ${response.results[i].lsp_name}. ${response.results[i].status.description}</p> <img src="${response.results[i].image}" width="100px">`)
    }
  }
}

async function makeApiCall (spaceflight) {
  const response = await SpaceflightTrack.getSpaceflight(spaceflight);
  getSpaceflight(response);
  const news = await News.getNews(`${response.results[0].lsp_name}`);
  displayNews(news);
}

let displayNews = (response) => {
  const newsTitle = response.news[0].title;
  const newsURL = `<a href=${response.news[0].url}> Click here to learn more.</a>`;
  const newsAuthor = response.news[0].author;
  $('.newsTitle').html(newsTitle);
  $('.newsAuthor').html(newsAuthor);
  $('.newsURL').append(newsURL);
}

// async function makeApiCallNews (response) {
//   const news = await News.getNews(response);
//   displayNews(news);
// }

$(document).ready(function() {
  $("#submit").click(()=> {
  let spaceflight = $("#search").val();
  makeApiCall(spaceflight);
  // return makeApiCallNews(spaceflight);
  })
});
