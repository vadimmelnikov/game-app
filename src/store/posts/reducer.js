import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_COINS,
  GET_POSTS_PROVIDES,
  GET_POST_BY_ID
} from "./actionTypes";

const getProviders = (data) => {
  const arr = [];
  data?.forEach(item => {
    if (arr.findIndex(elem => elem === item.provider) === -1) {
      arr.push(item.provider)
    }
  })
  return arr;
}

const getCoins = (data) => {
  const arr = [];
  data.forEach(item => {

    const arrOfObj =  Object.keys(item.real);

    arrOfObj.forEach(coin => {
      if (arr.findIndex(elem => elem === coin) === -1) {
        arr.push(coin)
      }
    })
  })
  return arr;
}

const initialState = {
  posts: [],
  filteredPosts: [],
  post: {},
  coins: [],
  provides: [],
  loadingPosts: false,
  loadingPostDetails: false,
  error: {
    message: "",
  },
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      state = { ...state, loadingPosts: true };
      break;
    case GET_POSTS_SUCCESS:
      state = { ...state, posts: Object.entries(action.payload)?.map(item => {
        return {
          id: item[0],
          ...item[1]
        }
      })?.sort((a, b) => b.collections.popularity - a.collections.popularity), loadingPosts: false };
      break;
    case GET_POSTS_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingPosts: false,
      };
      break;
    case GET_POST_BY_ID:
      state = { ...state, post: action.payload[0] };
      break;
    case GET_POSTS_PROVIDES:
      state = { ...state, provides: getProviders(state.posts)}
      break;

    case GET_POSTS_COINS:
      state = { ...state, coins: getCoins(state.posts)}
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default PostReducer;
