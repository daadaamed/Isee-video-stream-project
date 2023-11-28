/** @format */

import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AdminDashboard from './screens/AdminDashboard';
import LoginScreen from './log/LoginScreen';
import NotFound from './screens/NotFound';
import SignupScreen from './log/SignupScreen';
import ProfilLog from './log/ProfilLog';
import ProfilePage from './log/ProfilePage';
import EditProfile from './log/EditProfile';
import VideoPage from './screens/VideoPage';
import OtherUserProfil from './log/OtherUserProfil';
import OtherUserProfilFromAdminDash from './log/OtherUserProfilFromAdminDash';
import axios from './api/axios';
import { UidContext } from './screens/context/AppContext';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.action';

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log('No token'));
    };
    fetchToken();
    if (uid) dispatch(getUser(uid));
  }, [uid]);
  return (
    <div className="app">
      <a href="/">
        <img
          className="app__logo"
          src={'/images/isee-logo.png'}
          alt="isee-logo"
        />
      </a>
      <UidContext.Provider value={uid}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomeScreen />}></Route>
            <Route exact path="/login" element={<LoginScreen />}></Route>
            <Route exact path="/*" element={<NotFound />}></Route>
            <Route exact path="/signup" element={<SignupScreen />}></Route>
            <Route exact path="/profil" element={<ProfilLog />}></Route>
            <Route exact path="/user/:id" element={<OtherUserProfil />}></Route>
            <Route
              exact
              path="/userFromAdmin/:id"
              element={<OtherUserProfilFromAdminDash />}
            ></Route>
            <Route exact path="/editProfil" element={<EditProfile />}></Route>
            <Route exact path="/videolink/:id" element={<VideoPage />}></Route>
            <Route
              exact
              path="/adminDashboard"
              element={<AdminDashboard />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </UidContext.Provider>
    </div>
  );
}

export default App;
