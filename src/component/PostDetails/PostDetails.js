import { Container, Row, Col } from "react-bootstrap";

export default function PostDetails({ post, loading }) {
  return (
    <Container>
      {!loading && post ? (
        <Row className="posts">
          <Col lg={8} md={10} sm={12}>
            <h1 className="text-center">{post?.title}</h1>
            <p className="text-center">{Object.keys(post?.real).join(', ')}</p>
          </Col>
        </Row> 
      ) : (
        <div className="loader">
          <p>Loading</p>
        </div>
      )}
    </Container>
  );
}
