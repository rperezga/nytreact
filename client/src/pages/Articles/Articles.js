import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

import { ArticleList, ArticleListItem } from "../../components/ArticleList";

class Articles extends Component {
  state = {
    populatedArticles: [],
    articles: []
  };

  componentDidMount() {
    this.populateArticles();
    this.loadArticles();
  }

  populateArticles = () => {
    API.populaterticles()
      .then(res => { this.setState({ populatedArticles: res.data }) } )
      .catch(err => console.log(err));
  };

  saveArticle = event => {
    event.preventDefault();
    const id = event.target.getAttribute("dataid");
    API.saveArticle({
      title: this.state.populatedArticles[id].title,
      url: this.state.populatedArticles[id].url,
      abstract: this.state.populatedArticles[id].abstract,
      thumbnail: this.state.populatedArticles[id].thumbnail,
    })
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  }






  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };



  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveArticle({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-8">
            <Jumbotron>
              <h1>Checkout the lastest news!</h1>
            </Jumbotron>


            <ArticleList>
              {this.state.populatedArticles.map((pArticles, index) => {
                return (
                  <ArticleListItem
                    key={index}
                    index={index}
                    title={pArticles.title}
                    href={pArticles.url}
                    abstract={pArticles.abstract}
                    thumbnail={pArticles.thumbnail_standard}
                    saveArticle={this.saveArticle}                    
                  />
                );
              })}
            </ArticleList>






          </Col>
          <Col size="md-4 sm-12">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title} by {article.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
