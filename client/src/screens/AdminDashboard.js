/** @format */

import React, { useContext, useState, useEffect } from 'react';
import Header from './Header';
import { UidContext } from './context/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../actions/users.action';
import { isEmpty } from '../Utils';
import './AdminDashboard.css';
import { dateParser, timestampParser } from '../Utils';
import ProfilCardAdminDashboard from './ProfilCardAdminDashboard';
import { getPosts } from '../actions/post.action';
import VideoCardAdminDashboard from './VideoCardAdminDashboard';

function AdminDashboard() {
  const [loadPost, setLoadPost] = useState(true);
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  // if role is not admin, redirect to main page
  if (userData.role === 'Utilisateur') {
    window.location = '/';
  }
  const [loadUsers, setLoadUsers] = useState(true);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer);

  // get Users dynamically
  useEffect(() => {
    try {
      if (loadUsers) {
        dispatch(getUsers());
        setLoadUsers(false);
        console.log('done-dispatch');
      }
    } catch (err) {
      console.log(err);
    }
  }, [loadUsers, dispatch]);
  // console.log(typeof users);
  // console.log(`users1= ${users}`);
  // console.log(`users2= ${Object.entries(users)}`);
  // console.log(`users3= ${Object.keys(users)}`);
  // console.log(`users4= ${Object.values(users)}`);
  let result = [];
  if (Array.isArray(users)) {
    result = users.map(({ _id, pseudo }) => ({ _id, pseudo }));
    console.log(`results= ${result[1].pseudo}`);
  }

  // -------- GET Videos Details ---------//
  const posts = useSelector((state) => state.postReducer);
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <div className="adminDashboard__container">
      <Header />

      <div className="adminDashboard__users">
        <h3>ISEE App has {users.length} users including admins</h3>
        <br />
        <div className="user-list">
          {/* list of users  */}
          {typeof users !== 'array' &&
            Object.entries(users).map((user) => {
              return (
                <div key={user._id} className="user-card">
                  {user
                    .filter((e) => e.pseudo !== '' && e.role !== '')
                    .map((e) => {
                      return (
                        // <a href={`/userFromAdmin/${e._id}`}>
                        <a href={`/userFromAdmin/${e._id}`}>
                          <div key={e.id} className="">
                            <ProfilCardAdminDashboard
                              picture={e.picture}
                              pseudo={e.pseudo}
                              bio={e.bio}
                              createdAt={e.createdAt}
                              role={e.role}
                              statut={e.statut}
                            />
                          </div>
                        </a>
                      );
                    })}
                </div>
              );
            })}
        </div>
        <div className="adminDashboard__videos">
          <h2 className="profilePage__title">
            {/* get List of Videos */}
            ISEE App has {posts.length} videos
          </h2>
          {!isEmpty(posts[0]) &&
            posts.map((video) => {
              return (
                <div class="profilePage__video">
                  <VideoCardAdminDashboard
                    video_id={video._id}
                    videoPicture={video.picture}
                    videoTitle={video.title}
                    videoStatut={video.status}
                    videoView={video.view}
                    videoPoster={video.posterId}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
