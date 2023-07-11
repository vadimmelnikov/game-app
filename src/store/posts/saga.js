import { put, call } from "redux-saga/effects";


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

export default onGetPosts;
