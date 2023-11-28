/** @format */

import React, { useState } from 'react';
import { isEmpty, timestampParser } from '../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../actions/post.action';
function ChatSection(props) {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleDelete = (piid, ciid) => {
    dispatch(deleteComment(piid, ciid));
  };
  const currentDate = new Date();
  const startingDate = new Date(currentDate.getTime() - 5 * 60 * 60 * 1000);
  return (
    <div>
      {console.log(props.post.comments)}
      {!isEmpty(props.post.comments) &&
        props.post.comments
          .filter((comment) => comment.timestamp >= startingDate.getTime())
          .map((comment) => (
            <div className="comment">
              <p className="comment-author">{comment.commenterPseudo}</p>
              <p className="comment-date">
                {timestampParser(comment.timestamp)}
              </p>
              <span className="comment-content"> {comment.text}</span>
              {userData.pseudo === comment.commenterPseudo ||
              userData.role == 'admin' ? (
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

export default ChatSection;
