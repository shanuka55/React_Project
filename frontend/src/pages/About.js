import React from 'react'
import Header from '../components/Layout/Header'
import AboutBackground from "../assets/about-background.png";

const About = () => {
  return (

       <>
        <Header />
        <h1>
          <div className="about-background-image-container">
                <img src={AboutBackground} alt="" />
          </div>
        </h1>
       </>

  )
}

export default About