import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/posts/actions";
import { useSearchParams } from "react-router-dom";
import PostDetails from "../component/PostDetails";

function SinglePost() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { posts = [], loadingPosts } = useSelector((state) => state.PostReducer);
  
  useEffect(() => {
    if(posts.length === 0) {
      dispatch(getPosts());
    }
  }, [dispatch, posts]);

  const post = posts.find(({ id }) => id === searchParams.get('q'));

  return (
    <Container className="single-post">
      <div className="full-height">
          <PostDetails post={post} loading={loadingPosts} />
      </div>
    </Container>
  );
}
export default SinglePost;
