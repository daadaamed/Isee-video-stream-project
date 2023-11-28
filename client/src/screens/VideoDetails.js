/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './VideoDetails.css';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { videos } from '../data';
import { UidContext } from './context/AppContext.js';
import { getPosts, addComment, deleteComment } from '../actions/post.action';
import { timestampParser } from '../Utils';
import { isEmpty } from '../Utils';

function VideoDetails(props) {
  console.log('videoId is', props.videoId);
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  const post = useSelector((state) => state.postReducer);

  const [newComment, setNewComment] = useState('');
  console.log(post);
  console.log('uid + post-title = ', props.videoId, post.title);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment !== '') {
      dispatch(addComment(post._id, userData._id, newComment, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setNewComment(''));
    }
  };

  const handleDelete = (piid, ciid) => {
    dispatch(deleteComment(piid, ciid));
  };

  return (
    <>
      <div className="videoDetails-container">
        <video className="videoDetails" src="example.mp4" controls />
        <div className="videoDetails-info">
          <h2 className="videoDetails-title">{post.title}</h2>
          <div className="videoDetails-infos">
            <a href={`/user/${post.posterId}`}>
              <p className="videoDetails-author">{post.posterId}</p>
            </a>
            <p className="videoDetails-views">{post.view} views</p>
          </div>
        </div>
        <div className="comments-container">
          <h3>Comments</h3>
          <div className="comment">
            {uid ? (
              <form
                className="comment-newComment"
                onSubmit={handleCommentSubmit}
              >
                <label htmlFor="comment-input">Post a comment:</label>
                <input
                  className="comment-input"
                  type="text"
                  name="text"
                  id="comment-input"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="comment-button" type="submit">
                  Post
                </button>
              </form>
            ) : (
              <a href="/login">
                <button className="addComment-button">
                  !You should login to add a comment
                </button>
              </a>
            )}
            {console.log(post.comments)}
            {!isEmpty(post.comments) &&
              post.comments.map((comment) => (
                <div className="comment">
                  <p className="comment-author">{comment.commenterPseudo}</p>
                  <p className="comment-date">
                    {timestampParser(comment.timestamp)}
                  </p>
                  <span className="comment-content"> {comment.text}</span>
                  {userData.pseudo === comment.commenterPseudo ||
                  userData.role == 'admin' ? (
                    <button
                      onClick={handleDelete(post._id, comment._id)}
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
        </div>
      </div>
    </>
  );
}

export default VideoDetails;
