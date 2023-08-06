import React from 'react'
import Header from '../components/Layout/Header'
import image from "../assets/photo-01.jpg";
import { Link } from 'react-router-dom';
import BannerBackground from "../assets/home-banner-background.png";
import BannerImage from "../assets/banner-image-2.png";


const Home = () => {
  return (
   
  
  <div>
        <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
        </div>

        <div className="home-text-section">
           <h1 className="primary-heading">
             Order the Best Foods From Foodie
          </h1>

          <p className="primary-text">
              We belive good food 
              offer great smile...
          </p>
        <button className="secondary-button" ><Link to={'/order'}>
        Order Now 
        </Link>
          
        </button>

        <div className="home-image-section">
           <img src={BannerImage} alt="" />
        </div>



      </div>
    </div>
  
   
  )
}

export default Home