import React from 'react';
import Login from "./Login";
import Signup from "./Signup";
import Users from "./Users";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";


const NavBar = () => {

    return (


            <div>
                <BrowserRouter>

                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/users">View Users</Link></li>
                    </ul>

                    <Routes>

                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/users" element={<Users />} />

                    </Routes>



                </BrowserRouter>

            </div>







        );
}



export default NavBar;