import React, { Component } from "react";
import styled from "styled-components";
import Moment from "react-moment";

const StyledArticles = styled.ul`
  list-style: none;
  padding: 20px;
  margin: 0;

  .item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;

    img {
      margin-right: 10px;
    }
  }
  h2 {
    margin-top: 5px;
    font-size: 14px;
    font-weight: normal;
  }

  a {
    text-decoration: none;
  }
  .item-ups {
    padding: 0 10px;

    svg {
      fill: green;
      width: 18px;
      height: 18px;
      vertical-align: middle;
    }
  }

  .item-comments {
    svg {
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin-right: 4px;
    }
  }
`;

class ArticlesList extends Component {
  render() {
    let articleIndex =
      this.props.pageIndex > 1 ? this.props.pageIndex * this.props.pageSize : 0;
    return (
      <StyledArticles>
        {this.props.articles
          .slice(articleIndex, articleIndex + this.props.pageSize)
          .map(article => (
            <li key={article.data.id} className="item">
              {article.data.thumbnail && (
                <img src={article.data.thumbnail} alt="" />
              )}
              <div>
                <h2>
                  <a href={article.data.url}>{article.data.title}</a> by{" "}
                  <strong>{article.data.author}</strong> on{" "}
                  <Moment unix format="MMMM Do YYYY">
                    {article.data.created}
                  </Moment>{" "}
                  at{" "}
                  <Moment unix format="H:mm">
                    {article.data.created}
                  </Moment>
                </h2>

                <span className="item-ups">
                  <svg viewBox="0 0 24 24">
                    <path fill="none" d="M0,0h24v24H0V0z" />
                    <path d="M1,21h4V9H1V21z M23,10c0-1.1-0.9-2-2-2h-6.31l0.95-4.57l0.03-0.32c0-0.41-0.17-0.79-0.44-1.06L14.17,1L7.59,7.59  C7.22,7.95,7,8.45,7,9v10c0,1.1,0.9,2,2,2h9c0.83,0,1.54-0.5,1.84-1.22l3.02-7.05C22.95,12.5,23,12.26,23,12V10z" />
                  </svg>{" "}
                  {article.data.ups}
                </span>
                <span class="item-comments">
                  <svg viewBox="0 0 24 24">
                    <g id="Bounding_Boxes">
                      <g id="ui_x5F_spec_x5F_header_copy_3" />
                      <path fill="none" d="M0,0h24v24H0V0z" />
                    </g>
                    <g id="Outline">
                      <g id="ui_x5F_spec_x5F_header" />
                      <path d="M20,17.17L18.83,16H4V4h16V17.17z M20,2H4C2.9,2,2,2.9,2,4v12c0,1.1,0.9,2,2,2h14l4,4V4C22,2.9,21.1,2,20,2L20,2z" />
                    </g>
                  </svg>
                  {article.data.num_comments}
                </span>
              </div>
            </li>
          ))}
      </StyledArticles>
    );
  }
}

export default ArticlesList;
