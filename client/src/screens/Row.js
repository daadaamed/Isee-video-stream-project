/** @format */

import React, { useState, useEffect } from 'react';
import { videos } from '../data';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, incrementPost } from '../actions/post.action';
import { useSelect } from '@mui/base';
import './Row.css';
import { isEmpty } from '../Utils';
import PosterByPosterId from './PosterByPosterId.js';

function Row({ category }) {
  var isLargeRow = false;
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);
  return (
    <div className="row">
      <div className="row__title">
        <h2>{category}</h2>
      </div>
      <div className="row__posters">
        {console.log(posts)}
        {/* get posts that are active and contain images */}
        {!isEmpty(posts[0]) &&
          posts
            .filter(
              (video) => video.status === 'Active' && video.picture.length !== 0
            )
            .map((video) => (
              <div>
                <a
                  // onClick={dispatch(incrementPost(video._id))}
                  href={`/videolink/${video._id}`}
                >
                  <img
                    key={video._id}
                    className={`row__poster ${
                      isLargeRow && 'row__posterLarge'
                    }`}
                    src={video.picture}
                    // src={`https://www.howtogeek.com/wp-content/uploads/2021/06/youtube_hero_1200x675.jpg?width=398&trim=1,1&bg-color=000&pad=1,1`} //../public/uploads/posts/youtube_hero.webp
                    alt={video.title}
                    title={video.title}
                  />
                  {console.log(
                    '../../public' + video.picture + video.picture.length
                  )}
                  <h3 className="row__posterTitle">{video.title}</h3>
                </a>
                <div className="row__posterAuthor">
                  <a href={`/user/${video.posterId}`}>
                    <PosterByPosterId userId={video.posterId} />
                    {/* <p className="">{`posted by: ${video.posterId}`}</p> */}
                  </a>
                  <p>{`${video.view} views`}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Row;
