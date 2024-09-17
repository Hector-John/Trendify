import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div>
<div className="navbar">
    <img src={assets.logo} alt="Logo" className='logo' />
    <h1>ADMIN PANEL</h1>
    <img src={assets.profile_image} alt="Profile Image" className='profile'/>
</div>

    </div>
  )
}

export default Navbar