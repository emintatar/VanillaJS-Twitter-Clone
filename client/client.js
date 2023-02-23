const form = document.querySelector("form");
const tweetList = document.querySelector(".tweetList");
const API_URL = "http://localhost:5000/tweets";

function listAllTweets() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((tweets) => {
      tweets.reverse();
      tweets.forEach((tweet) => {
        // div class="tweet"
        const div = document.createElement("div");
        div.classList.add("tweet");

        // h3
        const header = document.createElement("h3");
        header.textContent = tweet.name;

        // p
        const contents = document.createElement("p");
        contents.textContent = tweet.content;

        // small
        const date = document.createElement("small");
        date.textContent = new Date(tweet.created);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        tweetList.appendChild(div);
      });
    });
}

listAllTweets();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  // Name and Content
  const name = formData.get("name");
  const content = formData.get("content");

  const tweet = {
    name,
    content,
  };

  // Send the tweet to the server
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(tweet),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      form.reset();
      console.log("Tweet sent!");
    });
});
