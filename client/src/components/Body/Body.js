import React, { Component } from "react";
//import ReactDOM from "react-dom";

import API from "../../utils/api";

class Body extends Component {
  state = {
    topic: "",
    start: "",
    end: "",
    articles: [],
    saved: []
  };
  componentDidMount() {
    this.getSavedArticles();
  }
  getSavedArticles = () => {
    API.getArticle().then(res => {
      this.setState({ saved: res.data });
    });
  };
  renderArticles = () => {
    console.log("this method gets called");

    return (
      <div className="container jumbotron">
        <h3>Scraped Articles</h3>
        {this.state.articles.map(article => (
          <div className="container">
            <li className="list-group-item">
              <h4>
                <span>
                  <em>{article.headline.main}</em>
                </span>
                <span className="btn-group pull-right">
                  <a href={article.web_url} target="_blank">
                    <button className="btn btn-default ">View Article</button>
                  </a>
                  <button
                    className="btn btn-primary"
                    onClick={() => article.handleSaveButton(article._id)}
                  >
                    Save
                  </button>
                </span>
              </h4>
              <p>Date Published: {article.pub_date}</p>
            </li>
          </div>
        ))}
      </div>
    );
  };
  handleSubmit = event => {
    event.preventDefault();
    const { topic, start, end, articles } = this.state;
    console.log("Getting NYT Articles");
    console.log(topic);
    console.log("topic", topic);
    console.log("start ", start);
    console.log("end ", end);
    API.searchNYT(topic, start, end).then(res => {
      this.setState({ articles: res.data.response.docs });
      console.log("articles: ", articles);
    });
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div>
        <div className="container text-center">
          <h4>New York Times Article Scrubber</h4>
        </div>
        <div className="container jumbotron">
          <form className="text-center">
            <div className="form-group">
              <label htmlFor="Topic">Topic</label>
              <input
                type="text"
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                className="form-control"
                id="topic"
                placeholder="Trump Presidency"
              />
            </div>
            <div className="form-group">
              <label htmlFor="Start Year">Start Year</label>
              <input
                type="text"
                value={this.state.start}
                onChange={this.handleInputChange}
                name="start"
                className="form-control"
                id="start"
                placeholder="2016"
              />
            </div>
            <div className="form-group">
              <label htmlFor="End Year">End Year</label>
              <input
                type="text"
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
                className="form-control"
                id="end"
                placeholder="2018"
              />
            </div>
            <button
              onClick={this.handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>

        {this.renderArticles()}
        <div>
          <div className="container jumbotron">
            <h3> saved article</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
