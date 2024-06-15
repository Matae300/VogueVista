import { useState } from 'react';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Menu from './Menu';
import Auth from '../../utils/auth';
import '../assets/Navbar.css'


const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSideNav, setSideNav] = useState(false);

  const toggleSidenav = () => {
    setSideNav(!isSideNav);
    document.querySelector('.side-nav').classList.toggle('active');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    document.querySelector('.dropdown-menu').classList.toggle('active');
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
        VogueVista
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
            👜
            </Link>
          </li>
          {!Auth.loggedIn() && (
            <li className="nav-item">
              <div className="nav-links dropdown-toggle" onClick={toggleDropdown}>
              👤
              </div>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <Signup />
                  <Login />
                </div>
              )}
            </li>
          )}
          <li className="nav-item">
              <div className="nav-links sidenav-toggle" onClick={toggleSidenav}>
              ☰ Menu
              </div>
              {isSideNav && (
                <div className="side-nav">
                  <Menu />
                </div>
              )}
            </li>
          {Auth.loggedIn() && (
            <li className="nav-item">
              <button className="nav-links btn-light" onClick={logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
