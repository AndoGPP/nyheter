import { key } from "./configApi";
import "./style.css";
import axios from "axios";
/* import {
  searchWordButton,
  searchInputField, searchOnWord,
} from "./searchword.js"; */

//const reactWord = "react.js";
const searchDefault = "javascript&css";
const articleElement = document.querySelector("#article");

async function getNews(searchWord) {
  try {
    const url = `https://newsapi.org/v2/everything?language=en&searchIn=title&q=${searchWord}&apiKey=${key.API_KEY_2}`;
    const response = await axios.get(url);
    // console.log(response.data.articles);
    // console.log(url);
    displayArticles(response.data.articles);
  } catch (error) {
    console.error(error);
  }
}
getNews(searchDefault);

function displayArticles(articles) {
  const html = articles.map(
    (article) => `
    <div class="articleCard"> 
      <div class="cardHeader">Category
        <div class="Marked"><img src="star.png" style="width:20px; height:20px"></div>
      </div>
       ${
         article.urlToImage
           ? `<img src="${article.urlToImage}" class="card-img-top" alt="..." />`
           : ""
       }
        <div class="cardBody">
          <h5 class="cardTitle">${article.title}</h5>
          <p class="cardText">${article.description}</p>
          <a href="${
            article.url
          }" class="btn btn-primary">Read the full article</a>
        <span>Source:${article.name}</span>
        </div>
      </div>
    </div>
  `
  );

  articleElement.innerHTML = html;
}

//Search on word
const searchWordButton = document.querySelector("#search-word-button");
let searchInputField = document.querySelector("#search-input");

const searchOnWord = (searchInputField) => {
  let word = searchInputField.value;
  getNews(word);
};

searchWordButton.addEventListener("click", (e) => {
  searchOnWord(searchInputField);

  if (e) {
    searchInputField.value = "";
  }
});
