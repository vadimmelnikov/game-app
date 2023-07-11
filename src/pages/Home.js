
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../component/Posts";
import { getPosts, getPostsProviders, getPostsCoins } from "../store/posts/actions";

export default function Home() {
  const dispatch = useDispatch();

  const { posts = [] } = useSelector((state) => state.PostReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      dispatch(getPostsProviders());
      dispatch(getPostsCoins());
    }
  }, [dispatch, posts]);
  
  return (
    <Container className="home">
      <Posts />
    </Container>
  );
}