import React from 'react'
import './Preloader.css'

const Preloader = ({ isPreloaderVisible }) => {
  return (
    <div
      className="preloader"
      style={{ display: isPreloaderVisible ? 'flex' : 'none' }}
    >
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader
