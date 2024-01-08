import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';
import config from '../../configRoute';
const Header = () => {
    return (
        <div className="containerHeader">
            <div className="topcontainer">
                <div className="topleft">
                    <NavLink to={config.routes.home} className="logo">
                        <h1 className="lable">ATQ</h1>
                    </NavLink>
                    <h1 className="lable1">ADMIN-DASHBOARD</h1>
                </div>
                <button className="btnimg">
                    <img className="imgprofile" src={require('../image/profile.png')} alt="profile" />
                </button>
            </div>
        </div>
    );
};
export default Header;
