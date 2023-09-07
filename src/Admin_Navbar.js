/*eslint-disable*/
import "./App.css";
import React from "react";
import { NavLink } from "react-router-dom";
import Logo from './person_images.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";

class Admin_Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: Logo
        }
    }



    render() {
        return (
            <div className="mb-10">
                <nav class="navbar fixed-top navbar-expand-lg navbar-dark" style={{ backgroundColor: "#112D4E" }}>
                    <div class="container-fluid">
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i class="fas fa-bars"></i>

                        </button>

                        <a className="navbar-brand fs-1" >
                            Timesheet
                        </a>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent"> </div>

                        <div class="d-flex align-items-center">
                            <div className=" collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item px-4">
                                        <NavLink exact to="/tsa_timesheet" className="nav-link">
                                            <a
                                                className="nav-link fs-5 active_1 text-light hvr-underline-from-left"
                                            >
                                                Timesheet's
                                            </a></NavLink>
                                    </li>
                                    <NavLink exact to="/" className="nav-link">
                                        <li className="nav-item fs-5 px-4">
                                            <a className="nav-link active_1 text-light hvr-underline-from-left" >
                                                Logout
                                            </a>
                                        </li>
                                    </NavLink>
                                    <li className="ps-3">
                                        <img
                                            src={this.state.image}
                                            alt=""
                                            width="50"
                                            height="50"
                                            style={{ borderRadius: "25px" }}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Admin_Navbar;