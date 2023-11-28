/** @format */

import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const GET_POST_ERRORS = 'GET_POST_ERRORS';
export const HIDE_POST = 'HIDE_POST';
export const BLOCK_POST = 'BLOCK_POST';
export const ACTIVE_POST = 'ACTIVE_POST';
export const INCREMENT_POST = 'INCREMENT_POST';

// posts
export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: '' });
        }
      });
  };
};

export const getPost = (pid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/${pid}`)
      .then((res) => {
        dispatch({ type: GET_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const hidePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/hide/${postId}`,
    })
      .then((res) => {
        dispatch({ type: HIDE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};
export const blockPost = (postId) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/block/${postId}`,
    })
      .then((res) => {
        dispatch({ type: HIDE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};
export const activePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/active/${postId}`,
    })
      .then((res) => {
        dispatch({ type: HIDE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const incrementPost = (postId) => {
  return (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/increment/${postId}`,
    })
      .then((res) => {
        dispatch({ type: INCREMENT_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};
// comments
export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: 'patch',
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
      data: { commentId },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};
