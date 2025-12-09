import React from 'react';
import "./Navbar.css"
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <header className="header">
            <div className="left">
                <a href="#">Bar Navbar</a>
            </div>
            <div className="mid">
                <ul className="navbar">

                    <li>
                        <Link to="/barchart">BarChart</Link>
                    </li>
                    <li>
                        <Link to="/bartype">BarType</Link>
                    </li>
                    <li>
                        <Link to="/backend">Backend</Link>
                    </li>

                </ul>

            </div>


        </header>
    );
}
export default Navbar;