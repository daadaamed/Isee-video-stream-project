/** @format */

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../actions/users.action';
import { isEmpty, timestampParser } from '../Utils';

function PosterByPosterId(props) {
  const [loadUsers, setLoadUsers] = useState(true);

  let usersData = useSelector((state) => state.usersReducer);
  let userId = props.userId;
  const dispatch = useDispatch();

  // dispatch(getUser(userId));

  useEffect(() => {
    try {
      if (loadUsers) {
        dispatch(getUsers());
        setLoadUsers(false);
        console.log('done-getUsers');
      }
    } catch (err) {
      console.log(err);
    }
  }, [loadUsers, dispatch]);
  return (
    <div>
      {!isEmpty(usersData[0]) &&
        usersData.map((user) => {
          {
            console.log('check map user', user._id);
          }
          if (user._id === userId) return <p>Posted by: {user.pseudo}</p>;
          else return null;
        })}
    </div>
  );
}

export default PosterByPosterId;
