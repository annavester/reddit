import React from "react";
import ReactDOM from "react-dom";
import ArticlesList from "./ArticlesList";
import renderer from "react-test-renderer";

it("it renders Articles List component", () => {
  let data = [
    {
      data: {
        id: "df345",
        title: "Test Title1",
        author: "John Doe1",
        url: "http://cnn.com"
      }
    },
    {
      data: {
        id: "df3f5",
        title: "Test Title2",
        author: "John Doe2",
        url: "http://google.com"
      }
    },
    {
      data: {
        id: "dfer5",
        title: "Test Title3",
        author: "John Doe3",
        url: "http://yahoo.com"
      }
    },
    {
      data: {
        id: "df34t",
        title: "Test Title4",
        author: "John Doe4",
        url: "http://teradata.com"
      }
    }
  ];
  const component = renderer.create(
    <ArticlesList articles={data} pageSize={2} pageIndex={1} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
