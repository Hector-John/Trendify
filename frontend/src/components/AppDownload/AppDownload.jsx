import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='AppDownload' id='AppDownload'>
        <p>For best experience download <br />Trendify App</p>
        <div className="AppPlatforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>

    </div>
  )
}

export default AppDownload