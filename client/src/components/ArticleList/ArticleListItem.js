import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";
import './ArticleListItem.css';


// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export const ArticleListItem = props => (
  <li className="list-group-item">
    <Container>
      <Row>
        <Col size="xs-4 sm-2">
          <Thumbnail src={props.thumbnail || "https://placehold.it/300x300"} />
        </Col>
        <Col size="xs-8 sm-10">
          <h3>{props.title}</h3>
          <p>Abstract: {props.abstract}</p>         
          <a className="btn btn-primary" id="readbtn" rel="noreferrer noopener" target="_blank" href={props.href}>Read</a>
          <button className="btn btn-secundary" id="savebtn" dataid={props.index} onClick={props.saveArticle}>Save</button>
        </Col>
      </Row>
    </Container>
  </li>
);
