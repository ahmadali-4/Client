import React from "react";
import {nav} from 'react-dom';
import "../Hero/Hero.css";

function Navbar() {
  return (

    <nav>
    <div className="reload-home">
        <h3>CUI Chat<span>Hub</span></h3>
        
    </div>
    <div className="infos">
        <a className='nav-div-a'>Home</a>
        <a className='nav-div-a'>Features</a>
        <a className='nav-div-a'>About Us</a>
        <a className='nav-div-a'>Contact Us</a>
    </div>
    {/* <div>
        <button className='login-btn'>
            <a href='/login'>Login</a>
        </button>
    </div> */}
</nav>

    // <>
      // {/* <nav className="navbar">
      //   <div className="logo">
      //     <a href="" target="_blank" rel="noopener noreferrer">
      //       <span className="l-initial">Minimalist</span>Navbar
      //     </a>
      //   </div>
      //   <div className="nav-link">
      //     <ul>
      //       <li>
      //         <a href="#">Home</a>
      //       </li>
      //       <li>
      //         <a href="#">About</a>
      //       </li>
      //       <li>
      //         <a href="#">Blog</a>
      //       </li>
      //       <li>
      //         <a href="#">Contact</a>
      //       </li>
      //       <li>
      //         <a href="#"></a>
      //       </li>
      //     </ul>
      //   </div>
      //   <div className="cta-btn">
      //     <button className="btn s-btn">
      //       <a href="">Login</a>
      //     </button>
      //     <button className="btn p-btn">
      //       <a href="" style="color:rgb(251, 251, 251);">
      //         Register
      //       </a>
      //     </button>
      //   </div>
      // </nav> */}
    // </>
  );
}

export default Navbar;
