import React from 'react'
import { Link, useNavigate } from 'react-router'

export const UserNav = () => {
    
    const navigate=useNavigate();

    let user=JSON.parse(localStorage.getItem("userinfo"));


let logout=()=>{
    localStorage.removeItem("userinfo")
    navigate("/registeruser")
}
    return (
        <div>
            <nav className="admin-nav">
                <div className="nav-left">
                    <div className="logo">🏟️ GroundBook UserDashBoard</div>
                </div>

                <ul className="nav-links">
                    <li><Link to={"/bookground"}>View Ground</Link></li>
                    <li><Link >View Bookings</Link></li>
                    <li>My Bookings(Pending)</li>
                    <li>Reports (Pending)</li>
                </ul>

                <div className="nav-right">
                    <button className="logout-btn" onClick={logout}>Logout</button>
                </div>
            </nav>
        </div>

    )
}
