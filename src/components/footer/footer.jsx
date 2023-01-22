import React from 'react'
import "./footer.css";

export default function footer() {
  return (
    <footer class="footer-distributed">

    <div class="footer-left">
        <h3>Robot<span>exchange</span></h3>

        <p class="footer-links">
            <a href="#">Home</a>
            |
            <a href="#">About</a>
            |
            <a href="#">Contact</a>
            |
            <a href="#">Blog</a>
        </p>

        <p class="footer-company-name">Copyright © 2021 <strong>Robots</strong> All rights reserved</p>
    </div>

    <div class="footer-center" style={{color:"#fffff"}}>
        <div>
            <i class="fa fa-map-marker"></i>
            <p><span>Bennane</span>
                Tunisia</p>
        </div>

        <div>
            <i class="fa fa-phone"></i>
            <p>+216 74 25 14 58</p>
        </div>
        <div>
            <i class="fa fa-envelope" ></i>
            <p><a href="mailto:sagar00001.co@gmail.com">robot@gmail.com</a></p>
        </div>
    </div>
    <div class="footer-right">
        <p class="footer-company-about">
            <span>About the company</span>
            <strong>Robotics</strong> is a blog website where people all around the world can share Robot's news  
           
        </p>
        <div class="footer-icons">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-instagram"></i></a>
            <a href="#"><i class="fa fa-linkedin"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-youtube"></i></a>
        </div>
    </div>
</footer>
  )
}
