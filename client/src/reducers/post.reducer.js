/** @format */
import {
  GET_POSTS,
  GET_POST,
  UPDATE_POST,
  DELETE_COMMENT,
  ADD_POST,
  DELETE_POST,
  HIDE_POST,
  BLOCK_POST,
  ACTIVE_POST,
  INCREMENT_POST,
} from '../actions/post.action';
const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case GET_POST:
      return action.payload;
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    case HIDE_POST:
      return action.payload;
    case BLOCK_POST:
      return action.payload;
    case ACTIVE_POST:
      return action.payload;
    case INCREMENT_POST:
      return action.payload;
    // case ADD_COMMENT:
    //   return
    default:
      return state;
  }
}
