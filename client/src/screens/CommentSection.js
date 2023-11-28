/** @format */

import React, { useState } from 'react';
import { isEmpty, timestampParser } from '../Utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPost,
  addComment,
  deleteComment,
  getPosts,
} from '../actions/post.action';
function CommentSection(props) {
  const [deleteCom, setDeleteCom] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const handleDelete = (piid, ciid) => {
    dispatch(deleteComment(piid, ciid));
  };
  return (
    <div>
      {console.log(props.post.comments)}
      {!isEmpty(props.post.comments) &&
        props.post.comments.map((comment) => (
          <div className="comment">
            <p className="comment-author">{comment.commenterPseudo}</p>
            <p className="comment-date">{timestampParser(comment.timestamp)}</p>
            <span className="comment-content"> {comment.text}</span>
            {userData.pseudo === comment.commenterPseudo ||
            userData.role == 'Admin' ? (
              <button
                onClick={() => {
                  if (window.confirm('are you sure to delete?')) {
                    handleDelete(props.post._id, comment._id);
                  }
                }}
                className="btn-delete-comment"
              >
                delete
              </button>
            ) : (
              ''
            )}
          </div>
        ))}
    </div>
  );
}

export default CommentSection;
