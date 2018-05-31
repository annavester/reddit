import React, { Component } from "react";
import styled from "styled-components";

const StyledPaging = styled.nav`
  padding: 20px;
  margin: 0;
  display: flex;
  border: 1px solid #ddd;
  border-width: 1px 0;

  a {
    padding: 5px 10px;
    margin: 3px;
    border: 1px solid #ff1b00;
    cursor: pointer;

    &.active {
      background: #ff1b00;
      color: #efefef;
    }
  }
`;

class Paging extends Component {
  render() {
    let pagingItems = [];
    for (let i = 1; i <= this.props.pageCount; i++) {
      pagingItems.push(
        <a
          className={i === this.props.pageIndex ? "active" : ""}
          onClick={this.props.pagingHandler}
          key={i}
        >
          {i}
        </a>
      );
    }
    return <StyledPaging>{pagingItems}</StyledPaging>;
  }
}

export default Paging;
