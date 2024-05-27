import React from 'react';
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg';
import { ReactComponent as AlarmIcon } from '../assets/alarm.svg';
import './NavBar.css';

function NavBar() {
    return (
        <div className="NavBar">
            <img src="/icon.png" alt="Icon" className="Icon"></img>
            <div className="TextBox">
                <p>Home</p>
                <p>Movies</p>
                <p>My list</p>
            </div>
            <div className="ThirdBox">
                <SearchIcon></SearchIcon>
                <AlarmIcon></AlarmIcon>
                <img src="/avatar.png" alt="Avatar"></img>
            </div>
        </div>
    );
}

export default NavBar;