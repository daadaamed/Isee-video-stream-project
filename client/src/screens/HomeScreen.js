/** @format */

import React, { useEffect } from 'react';
import './HomeScreen.css';
import Header from './Header';
import Row from './Row';

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Header />
      <Row category="Latest uploads" />
      {/* <Row category="Fun" />
      <Row category="Gaming" />
      <Row category="Coding" />
      <Row category="News" /> */}
    </div>
  );
}

export default HomeScreen;
