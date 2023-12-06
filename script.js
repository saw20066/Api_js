// Define an API access key for some service or application.
const accessKey = "BOWojiksChdLwTgHfNEm3hqTRsQETX1gbHM25b79Grc";

// Select the <form> element in the HTML document.
const fromEl = document.querySelector("form");

// Get the input element with the id "search-input" from the HTML document.
const inputEl = document.getElementById("search-input");

// Select an element with the class "search-results" in the HTML document.
const searchResults = document.querySelector(".search-results");

// Get the element with the id "show-more-button" from the HTML document.
const showMore = document.getElementById("show-more-button");


let inputData = "";
let page = 1;


 async function searchImages() {

    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();


    const results = data.results;

    if (page == 1){

        searchResults.innerHTML = "";
     }

     results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
      
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
         
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        searchResults.appendChild(imageWrapper);
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        

});
    page ++
    if (page > 1) {
        showMore.style.display = 'block';   
 }
}

 fromEl.addEventListener('submit',  (event) => {
    event.preventDefault();
    page=1;
    searchImages();
  });

  
 showMore.addEventListener('click',  ()  =>{
    searchImages();
  });