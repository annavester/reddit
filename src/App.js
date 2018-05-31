import React, { Component } from "react";
import axios from "axios";
import ArticlesList from "./components/ArticlesList";
import Paging from "./components/Paging";
import styled from "styled-components";
import moment from "moment";

import {
  LineChart,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
  YAxis,
  XAxis
} from "recharts";

const StyledHeader = styled.header`
  background: #222;
  color: #ff1b00;
  padding: 20px;

  h1 {
    font-style: italic;
  }
`;

const StyledSelector = styled.section`
  border: 1px solid #ddd;
  border-width: 1px 0;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

class App extends Component {
  fetchArticles() {
    axios
      .get("https://www.reddit.com/r/" + this.state.subreddit + ".json")
      .then(res => {
        const articles = res.data.data.children;

        this.setState({
          articles: articles,
          pageCount: Math.floor(articles.length / this.state.pageSize),
          chartData: articles.map(article => {
            return {
              created: article.data.created,
              ups: article.data.ups
            };
          })
        });
      });
  }

  componentDidMount() {
    this.fetchArticles(this.state.subreddit);
  }

  constructor() {
    super();
    this.state = {
      articles: null,
      subreddit: "angularjs",
      pageSize: 5,
      pageIndex: 1,
      pageCount: null,
      chartData: null
    };
    this.displaySubreddit = this.displaySubreddit.bind(this);
    this.pagingHandler = this.pagingHandler.bind(this);
  }

  displaySubreddit = event => {
    const selectedSubreddit = event.target.value;
    this.setState(
      { subreddit: selectedSubreddit, pageIndex: 1 },
      this.fetchArticles
    );
  };

  pagingHandler = event => {
    this.setState({
      pageIndex: parseInt(event.target.text, 10)
    });
  };

  formatTimestamp = timestamp => {
    return moment.unix(timestamp).format("MM DD YYYY H:mm");
  };

  render() {
    return (
      <div className="App">
        <StyledHeader className="App-header">
          <h1 className="App-title">Tiny Reddit Reader</h1>
        </StyledHeader>
        <StyledSelector>
          <label>
            Choose a subreddit:{" "}
            <select
              onChange={this.displaySubreddit}
              value={this.state.subreddit}
            >
              <option value="technology">Technology</option>
              <option value="angularjs">angularjs</option>
              <option value="reactjs">reactjs</option>
              <option value="vuejs">vuejs</option>
            </select>
          </label>
        </StyledSelector>

        {this.state &&
          this.state.chartData && (
            <LineChart width={300} height={100} data={this.state.chartData}>
              <Line type="monotone" dataKey="ups" stroke="#8884d8" />
              <CartesianGrid strokeDasharray="1 1" />
              <YAxis dataKey="ups" />
              <XAxis
                dataKey="created"
                tickCount={3}
                tickFormatter={this.formatTimestamp}
              />
              <Tooltip labelFormatter={this.formatTimestamp} />
              <Legend />
            </LineChart>
          )}

        {this.state &&
          this.state.articles && (
            <div>
              <Paging
                pageCount={this.state.pageCount}
                pageSize={this.state.pageSize}
                pageIndex={this.state.pageIndex}
                pagingHandler={this.pagingHandler}
              />
              <ArticlesList
                articles={this.state.articles}
                pageSize={this.state.pageSize}
                pageIndex={this.state.pageIndex}
              />
            </div>
          )}
      </div>
    );
  }
}

export default App;
