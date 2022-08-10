import React from 'react';
import Strings from '../../utils/strings';
import logo from '../../static/img/logo-striveworks.gif'

const MainHeader = () => {
    return (
    <>
      <h1>{Strings.str('mainHeaderMessage')}</h1>
      <header>
        <img
          src={logo}
          alt="Logo for Striveworks"
        />
      </header>
    </>
  );
};

export default MainHeader;
