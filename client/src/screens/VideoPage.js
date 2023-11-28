/** @format */

import React, { useContext, useEffect, useState } from 'react';
import Header from './Header.js';
import { useDispatch, useSelector } from 'react-redux';
import './VideoPage.css';
import { useParams } from 'react-router-dom';
import { videos } from '../data';
import VideoDetails from './VideoDetails.js';
import { UidContext } from './context/AppContext.js';
import {
  getPost,
  addComment,
  deleteComment,
  getPosts,
  incrementPost,
} from '../actions/post.action';
import { isEmpty, timestampParser } from '../Utils';
import CommentSection from './CommentSection.js';
import ChatSection from './ChatSection.js';
import PosterByPosterId from './PosterByPosterId.js';

function VideoPage() {
  let videoId = useParams().id;
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [newChat, setNewChat] = useState('');
  const chats = videos[0].chat;
  const [newComment, setNewComment] = useState('');
  const [newLink, setNewLink] = useState(false);

  const dispatch = useDispatch();
  const post = useSelector((state) => state.postReducer);
  // console.log('post', post);
  // console.log('newlink', newLink);

  let link = post.link;
  if (typeof post.link === 'string') {
    link = link.slice(1);
    // console.log('link', link);
  }
  const handleChatSubmit = (e) => {
    e.preventDefault();
    // add logic to submit new Chat here
    if (newChat !== '') {
      dispatch(addComment(post._id, userData._id, newChat, userData.pseudo))
        .then(() => dispatch(getPost()))
        .then(() => setNewChat(''));
    }
  };
  const incrementOnce = (function () {
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        // do something
        dispatch(incrementPost(videoId));
      }
    };
  })();
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment !== '') {
      dispatch(addComment(post._id, userData._id, newComment, userData.pseudo))
        .then(() => dispatch(getPost()))
        .then(() => setNewComment(''));
    }
  };
  // Dispatch the getPost action when the component mounts
  useEffect(() => {
    if (!newLink) {
      incrementOnce();
      setNewLink(true);

      // dispatch(incrementPost(videoId))
      // .then(() => dispatch(getPost()))
      // .then(() => setNewLink(true));
    }
    try {
      dispatch(getPost(videoId));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, videoId, handleChatSubmit, handleCommentSubmit]);

  // console.log(videoId);
  // console.log(post);
  // console.log('uid + post = ', videoId, post.title);
  return (
    <div className="videoPage">
      <Header />
      {post.status !== 'Block' || post.posterId == userData._id ? (
        <div className="video-details">
          <div className="video-details-container">
            {/* manage hidden and blocked videos */}

            <>
              <div className="videoDetails-container">
                {/* {console.log(`${post.link}`)} */}

                <video className="videoDetails" src={`${link}`} controls />
                <div className="videoDetails-info">
                  <h2 className="videoDetails-title">{post.title}</h2>
                  <div className="videoDetails-infos">
                    <a href={`/user/${post.posterId}`}>
                      <div className="videoDetails-author">
                        <PosterByPosterId userId={post.posterId} />
                      </div>
                      {/* <p className="videoDetails-author">{post.posterId}</p> */}
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
                    {/* {console.log(post.comments)} */}
                    <CommentSection post={post} />
                  </div>
                </div>
              </div>
            </>
          </div>

          <div className="chat-container">
            <h3>Live chat</h3>
            {/* {console.log('uid + post = ', videoId, post.title)} */}
            {uid ? (
              <form onSubmit={handleChatSubmit}>
                <label htmlFor="chat-input">Post a chat:</label>
                <input
                  className="chat-input"
                  type="text"
                  id="chat-input"
                  value={newChat}
                  onChange={(e) => setNewChat(e.target.value)}
                />
                <button className="chat-button" type="submit">
                  Post
                </button>
              </form>
            ) : (
              <a href="/login">
                <button className="addChat-button">
                  !You should login to chat
                </button>
              </a>
            )}
            <ChatSection post={post} />
          </div>
        </div>
      ) : (
        <h3 className="noAccessVideo">
          This video has been blocked or hidden by its author{' '}
        </h3>
      )}
    </div>
  );
}

export default VideoPage;
