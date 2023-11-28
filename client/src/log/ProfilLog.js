/** @format */

import { React, useContext, useState } from 'react';
import ProfilePage from './ProfilePage';
import { UidContext } from '../screens/context/AppContext';
import LoginScreen from './LoginScreen';

// if connected, go to update profil, else go to login page
const ProfilLog = () => {
  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? console.log('yes,conected') : console.log('no, not connected')}
      {uid ? <ProfilePage /> : <LoginScreen />}
    </div>
  );
};

export default ProfilLog;
