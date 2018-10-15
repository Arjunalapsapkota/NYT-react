import axios from "axios";

const api = {
  // Query NYT API
  searchNYT: function(topic, start, end) {
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    const queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
      authKey +
      "&q=" +
      topic +
      "&begin_date=" +
      start +
      "0101&end_date=" +
      end +
      "0101";
    console.log(queryURL);
    return axios.get(queryURL);
  },
  // Retrieves saved articles from the db
  getArticle: function() {
    return axios.get("/api/articles");
  },
  // Saves a new article to the db
  saveArticle: function(articleObj) {
    return axios.post("/api/articles", articleObj);
  },
  // Deletes an article from the db
  deleteArticle: function(id) {
    return axios.delete(`/api/articles/${id}`);
  }
};

export default api;
