/** @format */

import React from 'react';
import { dateParser, timestampParser, isEmpty } from '../Utils';
import './ProfilCardAdminDashboard.css';

// This is a card component to show user details
function ProfilCardAdminDashboard(props) {
  return (
    <div className="user-details">
      {
        <div className="user-photo">
          <img src={props.picture} alt={props.pseudo} />
        </div>
      }
      <div className="user-info">
        <h2>{props.pseudo}</h2>
        {props.bio ? <p className="user-bio">bio: {props.bio}</p> : ''}
        <div className="user-detail">
          {!isEmpty(props.createdAt) ? (
            <p className="user-date">
              {' '}
              Joined on: {dateParser(props.createdAt)}
            </p>
          ) : (
            ''
          )}
          {!isEmpty(props.createdAt) ? (
            <p className={`user-role`}>role: {props.role}</p>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilCardAdminDashboard;
