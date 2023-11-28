/** @format */

import React from 'react';
import './ProfileBox.css'; // import CSS file

const ProfileBox = (props) => {
  return (
    <div className="profile-box">
      <div className="profile-name">{props.pseudo}</div>
      <p>{props.statut} account</p>
      <p>member since {props.membershipDate}</p>
      <div className="profile-bio">{props.bio} </div>
    </div>
  );
};

export default ProfileBox;
