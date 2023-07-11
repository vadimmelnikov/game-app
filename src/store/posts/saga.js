import { takeLatest, put, call } from "redux-saga/effects";

import { GET_POSTS } from "./actionTypes";

import {
  getPostsSuccess,
  getPostsFail,
} from "./actions";

import { getPosts } from "../../helpers/backend_helper";

function* onGetPosts() {
  try {
    const response = yield call(getPosts);
    yield put(getPostsSuccess(response));
  } catch (error) {
    yield put(getPostsFail(error.response));
  }
}

function* PostsSaga() {
  yield takeLatest(GET_POSTS, onGetPosts);
}

export default PostsSaga;
