/** @format */

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';

import Button from '@mui/material/Button';

import { UidContext } from './context/AppContext';
import Logout from '../log/Logout';
import { useDispatch, useSelector } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import { addPost, getPosts } from '../actions/post.action';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

function Header() {
  let navigate = useNavigate();
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const [popup, setPop] = useState(false);
  const [gamingCheck, setGamingCheck] = useState(false);
  const [funCheck, setFunCheck] = useState(false);
  const [codingCheck, setCodingCheck] = useState(false);
  const [newsCheck, setNewsCheck] = useState(false);
  const [vlogCheck, setVlogCheck] = useState(false);
  const [title, setTitle] = useState('');
  const [categoryPopup, setCategoryPopup] = useState('');
  const [postPicture, setPostPicture] = useState(null);
  const [postVideo, setPostVideo] = useState(null);
  const [file, setFile] = useState();
  const [picture, setPicture] = useState();
  const [link, setLink] = useState('');
  const dispatch = useDispatch();

  const categorieschecked = `${gamingCheck ? 'gaming, ' : ''}${
    funCheck ? 'fun, ' : ''
  }${codingCheck ? 'coding, ' : ''}${newsCheck ? 'news, ' : ''}${
    vlogCheck ? 'vlog' : ''
  }`;
  console.log(categorieschecked);

  const handleClickAdmin = () => {
    navigate('/adminDashboard');
  };

  const handleClickUploadVideo = () => {
    !uid ? alert('You should be connected to upload a video') : setPop(!popup);
  };
  const closePopupUploadVideo = () => {
    setPop(false);
  };
  const handleVideo = (e) => {
    setPostVideo(URL.createObjectURL(e.target.files[0]));
    setLink(e.target.files[0]);
  };
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('posterId', userData._id);
    // if (file) data.append('file', file);
    data.append('title', title);
    data.append('link', link);
    data.append('category', categorieschecked);
    data.append('picture', picture);

    try {
      await dispatch(addPost(data));
      // dispatch(getPosts());
    } catch (err) {
      console.log(err);
    }
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.5),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '60ch',
      },
    },
  }));

  return (
    <div className={`header`}>
      <a href="/">
        <img
          className="header__logo"
          src={'/images/isee-logo.png'}
          alt="isee-logo"
        />
      </a>
      {userData.role == 'Admin' ? (
        <Button
          className="header__adminButton"
          variant="contained"
          onClick={handleClickAdmin}
        >
          AdminDashboard
        </Button>
      ) : (
        ''
      )}
      <div className="header__input">
        <form className="header__searchContainer">
          <input className="header__searchInput" placeholder="Search…" />
          <button type="submit" className="header__searchButton">
            <img src="/images/search.svg" />
          </button>
        </form>
      </div>
      <div className="header__uploadButton">
        <Button
          className="header__uploadButton"
          variant="contained"
          onClick={handleClickUploadVideo}
        >
          Upload a new Video
        </Button>
      </div>

      {uid ? (
        <div className="header__connected-profil">
          <h4>Welcome {userData.pseudo} </h4>
          <a href="/profil">
            <img
              className="header__avatar"
              src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
              alt="profil avatar"
            />
          </a>
          <Logout />
        </div>
      ) : (
        <a href="/profil">
          <img
            className="header__avatar"
            src="https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png"
            alt="profil avatar"
          />
        </a>
      )}

      {popup ? (
        uid ? (
          <div className="popup">
            <div className="popup__header">
              <h1>Upload a new video</h1>
              <FontAwesomeIcon icon={faTimes} onClick={closePopupUploadVideo} />
            </div>
            <form className="popup__body" onSubmit={handleSubmit}>
              <Button
                className="popup__uploadVideoButton"
                variant="contained"
                component="label"
              >
                Upload a video
                <input
                  hidden
                  type="file"
                  id="file-upload"
                  name="file"
                  accept="*"
                  onChange={(e) => handleVideo(e)}
                  className="popup__uploadVideoButton"
                ></input>
              </Button>
              {'  '}
              <Button variant="contained" component="label">
                Upload video cover image
                <input
                  hidden
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png image/*"
                  onChange={(e) => handlePicture(e)}
                />
              </Button>
              <br></br>
              <br />
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <h3>check categories that are related to your video</h3>
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="Gaming"
                    control={<Checkbox />}
                    label="Gaming"
                    labelPlacement="bottom"
                    onChange={(e) => setGamingCheck(e.target.checked)}
                  />
                  <FormControlLabel
                    value="Fun"
                    control={<Checkbox />}
                    label="Fun"
                    labelPlacement="bottom"
                    onChange={(e) => setFunCheck(e.target.checked)}
                  />
                  <FormControlLabel
                    value="Coding"
                    control={<Checkbox />}
                    label="Coding"
                    labelPlacement="bottom"
                    onChange={(e) => setCodingCheck(e.target.checked)}
                  />
                  <FormControlLabel
                    value="News"
                    control={<Checkbox />}
                    label="News"
                    labelPlacement="bottom"
                    onChange={(e) => setNewsCheck(e.target.checked)}
                  />
                  <FormControlLabel
                    value="VLOG"
                    control={<Checkbox />}
                    label="VLOG"
                    labelPlacement="bottom"
                    onChange={(e) => setVlogCheck(e.target.checked)}
                  />
                </FormGroup>
                <br />
                <FormLabel component="legend">
                  <h3>what's your video title</h3>
                </FormLabel>
                <TextField
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  color="primary"
                  defaultValue="Title"
                />
                <br />
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </FormControl>
            </form>
          </div>
        ) : (
          alert('You should be connected to upload a video')
        )
      ) : (
        ''
      )}
    </div>
  );
}

export default Header;
