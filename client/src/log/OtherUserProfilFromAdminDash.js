/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { videos, profile } from '../data';
import { getUser } from '../actions/user.action';
import { dateParser, isEmpty, removeDotFromLink } from '../Utils';
import ProfileBox from './ProfileBox';
import { getPosts } from '../actions/post.action';
import './OtherUserProfilFromAdminDash.css';
import { UidContext } from '../screens/context/AppContext';
import VideoCardAdminDashboard from '../screens/VideoCardAdminDashboard';

function OtherUserProfilFromAdminDash() {
  const [loadPost, setLoadPost] = useState(true);

  const uid = useContext(UidContext);
  let userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  // --------- User Infos ----------- //
  if (userData.role !== 'Admin') {
    console.log(uid);
    // window.location = '/';
  }

  let user = useSelector((state) => state.userReducer);
  console.log(`user1 ${user.pseudo}`);
  let userId = useParams().id;
  dispatch(getUser(userId));
  useEffect(() => {
    try {
      dispatch(getUser(userId));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, userId]);
  userId = useParams().id;
  console.log(`user2 ${user.pseudo}`);
  console.log(`userData ${userData.pseudo}`);

  // -------- Videos Details ---------//
  const posts = useSelector((state) => state.postReducer);
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <div className="profilePage-container">
      <div className="profilePage__header">
        <img
          src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
          alt="Profile"
        />
        {isEmpty(user) ? (
          <p>This user is either desactivated or no longer exist</p>
        ) : (
          <>
            <ProfileBox
              pseudo={user.pseudo}
              membershipDate={dateParser(user.createdAt)}
              bio={user.bio}
              statut={user.statut}
            />
            {/* <p>
              As an admin, you can block or desactivate a user for any
              disrespectful case of ISEE general condition
            </p>
            <button>Block</button> */}
          </>
        )}
      </div>
      <div className="profilePage__body">
        <h2 className="profilePage__title">videos contents of {user.pseudo}</h2>
        {!isEmpty(posts[0]) &&
          posts
            .filter((video) => video.posterId == userId)
            .map((video) => {
              return (
                <div class="profilePage__video">
                  <VideoCardAdminDashboard
                    video_id={video._id}
                    videoPicture={removeDotFromLink(video.picture)}
                    videoTitle={video.title}
                    videoStatut={video.status}
                    videoView={video.view}
                    videoPoster={video.posterId}
                  />
                </div>
              );
            })}
        {!isEmpty(posts[0]) &&
        posts.filter((video) => video.posterId == userId).length == 0 ? (
          <p className="AdminDashboard__noVideo">
            This user did not post any video yet
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default OtherUserProfilFromAdminDash;
