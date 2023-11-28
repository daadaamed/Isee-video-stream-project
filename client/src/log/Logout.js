/** @format */

import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Logout.css';
const Logout = () => {
  const removeCookie = (key) => {
    if (window !== 'undefined') {
      Cookies.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie('jwt'))
      .catch((err) => console.log(err));

    window.location = '/';
  };

  return (
    <div className="logout__img" onClick={logout}>
      <img src="/images/box-arrow-right.svg" alt="logout" />
    </div>
  );
};

export default Logout;
