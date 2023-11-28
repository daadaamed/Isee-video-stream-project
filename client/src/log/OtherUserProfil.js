/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { videos, profile } from '../data';
import { getUser } from '../actions/user.action';
import { dateParser, isEmpty, removeDotFromLink } from '../Utils';
import ProfileBox from './ProfileBox';
import { getPosts } from '../actions/post.action';
import './OtherUserProfil.css';
import { UidContext } from '../screens/context/AppContext';
import Header from '../screens/Header';
import PosterByPosterId from '../screens/PosterByPosterId';

function OtherUserProfil() {
  const [loadPost, setLoadPost] = useState(true);
  const [loadUser, setLoadUser] = useState(true);

  // --------- User Infos ----------- //

  // const uid = useContext(UidContext);
  // let userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  let user = useSelector((state) => state.userReducer);
  console.log(`user1 ${user.pseudo}`);
  let userId = useParams().id;
  dispatch(getUser(userId));
  useEffect(() => {
    if (loadUser) {
      try {
        dispatch(getUser(userId));
      } catch (err) {
        console.log(err);
      }
      // setLoadUser(false);
    }
  }, [dispatch, userId]);
  userId = useParams().id;
  // console.log(`user2 ${user.pseudo}`);
  // console.log(`userData ${userData.pseudo}`);

  // -------- Videos Details ---------//
  const posts = useSelector((state) => state.postReducer);
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      // setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <div className="profilePage-container">
      <div className="profilePage__header">
        <img
          src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
          alt="Profile"
        />
        {console.log(user.statut, loadPost)}
        {isEmpty(user) || user.statut == 'inactive' ? (
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
                  <a href={`/videolink/${video._id}`}>
                    <img
                      className="profilePage__CoverVideo"
                      key={video._id}
                      src={removeDotFromLink(video.picture)}
                      alt={`picture of ${video.title}`}
                      title={video.title}
                    />
                    <h3 className="profilePage__posterTitle">{video.title}</h3>
                  </a>
                  {/* )} */}
                  <div className="profilePage__posterAuthor">
                    <a href="/user">
                      <PosterByPosterId userId={video.posterId} />
                      {/* <p className="">{`posted by: ${video.posterId}`}</p> */}
                    </a>
                    <p>{`${video.view} people viewed this video `}</p>
                  </div>
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

export default OtherUserProfil;
