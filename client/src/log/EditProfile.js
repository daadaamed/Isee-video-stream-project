/** @format */

import React, { useContext, useEffect, useState } from 'react';
import './EditProfile.css';
import { profile } from '../data';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getUser,
  updateBio,
  uploadPicture,
  updateStatut,
  deleteUser,
} from '../actions/user.action';
import { UidContext } from '../screens/context/AppContext';

import { dateParser, removeDotFromLink } from '../Utils';
import ProfileBox from './ProfileBox';
import UploadPic from './UploadPic';

const EditProfile = () => {
  // const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  // const [file, setFile] = useState();
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [statut, setStatut] = useState('');
  // const [image, setImage] = useState(userData.picture); //./uploads/profil/random-user.png

  console.log(userData.picture == './uploads/profil/random-user.png');
  console.log('pic is', userData.picture);
  // console.log('./uploads/profil/random-user.png');
  //const [data, setData] = useState('');
  let navigate = useNavigate();
  console.log('statut (edit)', statut);
  const handleSubmit = (event) => {
    event.preventDefault();

    //dispatch(uploadPicture(data, userData._id));
    if (bio !== '') {
      dispatch(updateBio(userData._id, bio));
    }

    dispatch(updateStatut(userData._id, statut));
    setBio('');
  };

  const handleDeleteAccount = (event) => {
    event.preventDefault();
    dispatch(deleteUser(userData._id));
    navigate('/');
  };
  useEffect(() => {
    dispatch(getUser(uid));
  }, []);
  return (
    <div className="editProfilePage-container">
      <div className="editProfilePage__header">
        <img src={userData.picture} alt="your Profile picture" />
        <UploadPic />
        {/* <p>{error.maxSize}</p>
        <p>{error.format}</p> */}
        {/* <InputText
          type="file"
          id="file"
          name="file"
          onChange={handleImageUpload}
          accept=".jpg, .jpeg, .png"
        /> */}
        {/* <ProfileBox
          pseudo={userData.pseudo}
          membershipDate={dateParser(userData.createdAt)}
          bio={userData.bio}
          statut={userData.statut}
        /> */}
      </div>

      <form className="editProfile__form" onSubmit={handleSubmit}>
        <ProfileBox
          pseudo={userData.pseudo}
          membershipDate={dateParser(userData.createdAt)}
          bio={userData.bio}
          statut={userData.statut}
        />
        <br />
        <br />
        <h2>Update Profile:</h2>
        <label className="editProfile__label">
          Bio:
          <textarea
            rows={3}
            className="editProfile__input__bio"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label className="editProfile__label">
          Statut:
          <select
            className="editProfile__select"
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            {/* <option value="pending">Delete account</option> */}
          </select>
        </label>
        <button className="editProfile__button" type="submit">
          Update
        </button>
        <button className="editProfile__button" onClick={handleDeleteAccount}>
          Delete account permanently
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
