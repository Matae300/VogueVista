import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import girlwithbag from '../assets/images/girlwithbag.jpg';
import handbags from '../assets/images/handbags.avif'
import Header from '../assets/images/header.avif'
import Woman from '../assets/images/womens.webp'
import '../assets/Home.css'; 

const Home = () => {
  return (
    <div>
      <div className="header-container">
      <Link to={`/collect/6679e61f596201f7b7697a0b`}>
        <img className='head-img' src={Header} alt="header-img" />
        <div className="overlay">
          <p className="header-text">Women's Handbags</p>
          <button className="header-button">Explore Collection</button>
      </div>
      </Link>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
        <Link to={`/collect/6679e61f596201f7b7697a0b`}>
          <img src={girlwithbag} alt="Designer" />
          <p className="home-btn">Stylish Women's Collection</p>
        </Link>
        </div>
        <div className="image-wrapper">
        <Link to={`/collect/6679e68b596201f7b7697a0d`}>
          <img src={handbags} alt="Designer" />
          <p className="home-btn">Father's Day Collection</p>
        </Link>
        </div>
      </div>
      <div className="header-container">
      <Link to={`/collect/6679e6b6596201f7b7697a11`}>
        <img className='head-img' src={Woman} alt="Designer" />
        <div className="overlay">
          <p className="header-text">Summer Collection</p>
          <button className="header-button">Explore Collection</button>
        </div>
      </Link>
      </div>
    </div>
  );
};

export default Home;
