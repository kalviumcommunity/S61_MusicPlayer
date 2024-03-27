import React from 'react';
import { Link } from 'react-router-dom';
import "./Navigation.css"

function Navigation() {
  return (
  
  
        <nav className='navbar'>
        <ul>
            <div className='nav-item'>
            <li> <Link to="/">Home</Link></li>
            </div>
          <div className='nav-item'>
          <li><Link to="/dummy"  className='nav-link'>Dummy Component</Link></li>
          </div>
          <div className='nav-item'>
          <li><Link to="/singer" className='nav-link'>Singer Component</Link></li>
          </div>
        <div className='nav-item'>
        <li ><Link to="/user-input" className='nav-link'>User Input Component</Link></li>
        </div>
        
        <div className='nav-item'>
        <li><Link to="/update" className='nav-link'>Update Component</Link></li>
       </div>
        <div>
          <li>
            <Link to="/login" className='nav-link'>Login</Link>
          </li>
        </div>

        </ul>
      
    </nav >
 
  );
}

export default Navigation;
