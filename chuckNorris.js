let jokeArea = document.getElementById("jokeArea");
let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let randomBtn = document.getElementById("random-btn");
let categoryBtn = document.getElementById("category-btn");
let select = document.getElementById("select");

// Get Random Jokes
async function getRandomJoke() {
  try {
    let resolvedPromise = await fetch(
      "https://api.chucknorris.io/jokes/random"
    );
    let randomJoke = await resolvedPromise.json();
    renderRandomJokes(randomJoke.value);
  } catch (error) {
    console.log(error);
  }
}
const renderRandomJokes = (joke) => {
  jokeArea.innerHTML += `
  <div>
  <p> ${joke}</p>
  </div>`;
};
randomBtn.addEventListener("click", () => {
  jokeArea.style.display = "block";
  jokeArea.innerHTML = "";
  getRandomJoke();
});

// Get Jokes by Search
async function searchJoke(searchString) {
  try {
    let resolvedPromise = await fetch(
      `https://api.chucknorris.io/jokes/search?query=${searchString}`
    );
    let listJokes = await resolvedPromise.json();
    let results = listJokes.result.slice(0, 6);
    renderSearched(results);
  } catch (error) {
    console.log(error);
  }
}

function renderSearched(array) {
  array.forEach((element) => {
    jokeArea.innerHTML += `
  <div class= "container">
  <p>Category: ${element.categories[0]}</p>
  <p>Joke: ${element.value}</p>
  </div>`;
  });
}
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  jokeArea.style.display = "block";
  jokeArea.innerHTML = "";
  let input = searchInput.value.trim().toLowerCase();
  searchJoke(input);
});

// Get Joke by Categories
async function listofCategories() {
  try {
    let resolvedPromise = await fetch(
      "https://api.chucknorris.io/jokes/categories"
    );
    let list = await resolvedPromise.json();
    renderList(list);
  } catch (error) {
    console.log(error);
  }
}

function renderList(list) {
  list.forEach((element) => {
    select.innerHTML += `
  <option value=${element}>${element}</option>
  `;
  });
}
listofCategories();

async function getJokeWithCategory(category) {
  try {
    let resolvedPromise = await fetch(
      `https://api.chucknorris.io/jokes/random?category=${category}`
    );
    let listJokes = await resolvedPromise.json();
    let results = listJokes.value;
    renderCategorizedJoke(results);
  } catch (error) {
    console.log(error);
  }
}

function renderCategorizedJoke(data) {
  jokeArea.innerHTML += `
<p>${data}</p>`;
}

categoryBtn.addEventListener("click", () => {
  jokeArea.style.display = "block";
  jokeArea.innerHTML = "";
  let valueSelected = select.value;
  getJokeWithCategory(valueSelected);
});
