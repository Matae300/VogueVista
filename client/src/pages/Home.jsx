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
        <img className='head-img' src={Header} alt="header-img" />
        <div className="overlay">
          <p className="header-text">Women's Handbags</p>
          <button className="header-button">Explore Collection</button>
      </div>
      </div>
      <div className="image-container">
        <div className="image-wrapper">
          <img src={girlwithbag} alt="Designer" />
          <p className="home-btn">Explore Collection</p>
        </div>
        <div className="image-wrapper">
          <img src={handbags} alt="Designer" />
          <p className="home-btn">Father's Day Collection</p>
        </div>
      </div>
      <div className="header-container">
        <img className='head-img' src={Woman} alt="Designer" />
        <div className="overlay">
          <p className="header-text">Summer Collection</p>
          <button className="header-button">Explore Collection</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
