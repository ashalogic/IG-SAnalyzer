import React from "react";
import "./NavBar.css";

export default () => (
  <nav className="p-3 scrolling-navbar fixed-top navbar-style text-center">
    <ul class="nav justify-content-center text-center Righteous">
      <li class="nav-item">
        <a class="nav-link" style={{ color: "#545b62" }} href="#">
          Home
        </a>
      </li>
      <span className="h3 Lobster text-center" style={{ color: "#E1306C" }}>
        IGSAnalyzer
      </span>
      <li class="nav-item">
        <a class="nav-link" style={{ color: "#545b62" }} href="#">
          Source
        </a>
      </li>
    </ul>
  </nav>
);
