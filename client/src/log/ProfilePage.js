/** @format */
import React, { useContext, useEffect, useState } from 'react';
import './ProfilePage.css'; // import your css file here
import { useParams } from 'react-router-dom';
import { videos, profile } from '../data';
import { useDispatch, useSelector } from 'react-redux';
import ProfileBox from './ProfileBox';
import VideoCardAdminDashboard from '../screens/VideoCardAdminDashboard';
import { dateParser, isEmpty } from './../Utils';
import { UidContext } from '../screens/context/AppContext';
import { getPosts } from '../actions/post.action';

function ProfilePage() {
  const [loadPost, setLoadPost] = useState(true);

  const uid = useContext(UidContext);
  let userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  let userId = userData._id;
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuButton = (event) => {
    event.preventDefault();
    setOpenMenu(!openMenu);
  };
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
        <ProfileBox
          pseudo={userData.pseudo}
          membershipDate={dateParser(userData.createdAt)}
          bio={userData.bio}
          statut={userData.statut}
        />{' '}
        <a className="profilePage__editButton" href="/editProfil">
          <button>Edit Profile</button>
        </a>
      </div>
      <div className="profilePage__body">
        <h2 className="profilePage__title">This is your list of videos</h2>
        {!isEmpty(posts[0]) &&
          posts
            .filter((video) => video.posterId == userId)
            .map((video) => {
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
                  {/* <a href={`/videolink/${video._id}`}>
                    <img
                      className="profilePage__CoverVideo"
                      key={video._id}
                      src={`${video.picture}`}
                      alt={`picture of ${video.title}`}
                      title={video.title}
                    />
                    <h3 className="profilePage__posterTitle">{video.title}</h3>
                  </a> */}
                  {/* )} */}
                  {/* <div className="profilePage__posterAuthor">
                    <a href="/user">
                      <p className="">{`posted by: ${video.posterId}`}</p>
                    </a>
                    <p>{`${video.view} people viewed this video `}</p>
                  </div> */}
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
        {/* {videos.map((video) => (
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
        ))} */}
      </div>
    </div>
  );
}
export default ProfilePage;
