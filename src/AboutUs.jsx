import React from "react";
import "./css/aboutus.css";
import { UserNav } from "./UserNav";
const AboutUs = () => {
    return (
        <div>


            <UserNav></UserNav>
            <div className="about-container">


                {/* Hero Section */}
                <div className="hero">
                    <h1>About Our Ground Booking System</h1>
                    <p>Making sports ground booking simple, fast, and reliable</p>
                </div>

                {/* About Section */}
                <div className="section">
                    <h2>Who We Are</h2>
                    <p>
                        Our Online Ground Booking System is designed to simplify the process of booking sports grounds.
                        Whether you're planning a cricket match, football game, or any outdoor activity,
                        our platform helps users easily find and reserve available grounds in real-time.
                    </p>
                    <p>
                        We connect players and ground owners through a seamless digital platform.
                    </p>
                </div>

                {/* Mission */}
                <div className="section">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to provide a transparent, efficient, and user-friendly system
                        where users can check availability, book grounds instantly, and manage bookings effortlessly.
                    </p>
                </div>

                {/* Features */}
                <div className="section">
                    <h2>Key Features</h2>
                    <div className="features">

                        <div className="feature-box">
                            <h3>Real-Time Booking</h3>
                            <p>Instant booking with live availability tracking.</p>
                        </div>

                        <div className="feature-box">
                            <h3>User Dashboard</h3>
                            <p>Track bookings, history, and cancellations easily.</p>
                        </div>

                        <div className="feature-box">
                            <h3>Admin Control</h3>
                            <p>Manage grounds, pricing, and schedules.</p>
                        </div>

                        <div className="feature-box">
                            <h3>Secure Payments</h3>
                            <p>Reliable and safe transaction system.</p>
                        </div>

                    </div>
                </div>

                {/* Team Section */}
                {/* <div className="section">
                    <h2>Our Team</h2>
                    <div className="team">

                        <div className="member">
                            <img src="https://via.placeholder.com/100" alt="team" />
                            <h4>Pratik</h4>
                            <p>Full Stack Developer</p>
                        </div>

                        <div className="member">
                            <img src="https://via.placeholder.com/100" alt="team" />
                            <h4>Team Member</h4>
                            <p>Backend Developer</p>
                        </div>

                        <div className="member">
                            <img src="https://via.placeholder.com/100" alt="team" />
                            <h4>Team Member</h4>
                            <p>Frontend Developer</p>
                        </div>

                    </div>
                </div> */}

                {/* Footer */}
                <div className="footer">
                    <p>© 2026 Ground Booking System | All Rights Reserved</p>
                </div>

            </div>

        </div>
    );
};

export default AboutUs;