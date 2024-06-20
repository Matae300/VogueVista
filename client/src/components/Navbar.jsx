import { useState } from 'react';
import { Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Menu from './Menu';
import Auth from '../../utils/auth';
import '../assets/Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSideNav, setSideNav] = useState(false);

  const toggleSidenav = () => {
    setSideNav(!isSideNav);
    const sideNav = document.querySelector('.side-nav');
    if (sideNav.classList.contains('active')) {
      sideNav.classList.remove('active');
    }
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

  const closeMenu = () => {
    setSideNav(false);
    const sideNav = document.querySelector('.side-nav');
    sideNav.classList.remove('active');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          VogueVista
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/cart" className="nav-links">
              Cart
            </Link>
          </li>
          {!Auth.loggedIn() && (
            <li className="nav-item">
              <div className="nav-links dropdown-toggle" onClick={toggleDropdown}>
                Sign In
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
                <br/>
                <button className="close-btn" onClick={closeMenu}>
                  Close Menu
                </button>
              </div>
            )}
          </li>
          {Auth.loggedIn() && (
            <li className="nav-item">
              <button className="nav-links logout" onClick={logout}>
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
