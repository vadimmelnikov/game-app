import React, { useState, useMemo } from "react";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const POST_PER_PAGE = 12;

export default function Posts() {
  const [filterCoins, setFilterCoins] = useState('');
  const [filterProvider, setFilterProvider] = useState('');

  const [visiblePosts, setVisiblePosts] = useState(POST_PER_PAGE);
  const { posts = [], loadingPosts = false, provides = [], coins = [] } = useSelector((state) => state.PostReducer);

  const handleloadMore = () => {
    setVisiblePosts(prevState => prevState + POST_PER_PAGE);
  }

  const handleChangeSelectCoin = (e) => {
    e.preventDefault()

    if (e.target.value === 'Coin') {
      setFilterCoins('')
    } else {
      setFilterCoins(e.target.value)
    }
  }

  const handleChangeSelectProvider = (e) => {
    e.preventDefault()

    if (e.target.value === 'Provider') {
      setFilterProvider('')
    } else {
      setFilterProvider(e.target.value)
    }
  }

  const filteredPostsByProvider = filterProvider ? posts.filter(post => post.provider === filterProvider) : posts;

  const filteredPostsByCoins = filterCoins ? filteredPostsByProvider.filter(post => post.real.hasOwnProperty(filterCoins)) :  posts

  const postsForView = useMemo(() => filterCoins ? filteredPostsByCoins : filteredPostsByProvider, [filteredPostsByProvider,filterCoins, filteredPostsByCoins]);

  return (
    <Container>
      <Row>
        <Col lg={2}>
          <Form.Select aria-label="Default select example" value={filterCoins} onChange={handleChangeSelectCoin}>
            <option>Coin</option>
            {coins.map(coin => <option key={coin}>{coin}</option>)}
          </Form.Select>
        </Col>
        <Col lg={2}>
          <Form.Select aria-label="Default select example2" value={filterProvider} onChange={handleChangeSelectProvider}>
            <option>Provider</option>
            {provides.map(provider => <option key={provider}>{provider}</option>)}
          </Form.Select>
        </Col>
      </Row>
      <br />
      <div className="grid">
        {loadingPosts ? (
          <div className="loader">
            <p>Loading</p>
          </div>
        ) : (
          postsForView.slice(0, visiblePosts).map((item) => {
            return (
              <Row className="posts" key={item.id}>
                <Col>
                  <Link to={`post?q=${item.id}`}>
                    <Card>
                      <Card.Img variant="top" src={`https://cdn2.softswiss.net/i/s2/${item.id}.png`}/>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              </Row>
            );
          })
        )}
      </div>

      {visiblePosts < postsForView.length ? (
        <div className="text-center"> <Button variant="primary" onClick={handleloadMore}>Load More</Button></div>
      ) : null}
    </Container>
  );
}
