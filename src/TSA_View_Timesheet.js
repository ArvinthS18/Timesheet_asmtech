import "./App.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from "./Navbar";
import { useLocation } from 'react-router-dom';
import Admin_Navbar from "./Admin_Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';


const TSA_View_Timesheet = () => {
    const location = useLocation();
    const { submited_data } = location.state
    const { Calcultaion } = location.state
    console.log(submited_data, Calcultaion);

    const tsa_decision = async (decision) => {
        const response = await fetch('http://localhost:5000/tsa_view_timesheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Decision": decision,
                "data_id": submited_data._id.$oid,
                "For": "view"
            })
        });
        await decision == "Approved" ? toast.success("Approved ") : toast.error("Rejected")

    }

    return (

        <div>
            <div>
                <Admin_Navbar />
            </div>
            <ToastContainer autoClose={2000} closeOnClick={true} closeButton={<FontAwesomeIcon icon={icon.faXmarkCircle} className="fs-4 mt-2 text-info" />} />

            <div className="container p-4">
                <div className="row gy-4">
                    <div className="col-lg-3">
                        <div className="card d-flex flex-wrap" style={{ flexDirection: "row", height: "120px" }}>

                            <div className="col d-flex align-items-center justify-content-center text-light" style={{ backgroundColor: "#3F72AF" }}><b>Working Days</b></div>
                            <div className="col d-flex align-items-center justify-content-center font-weight-bold fs-5" style={{ backgroundColor: "#F9F7F7" }}> {Calcultaion.Working_Days} </div>

                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card" style={{ flexDirection: "row", height: "120px" }}>

                            <div className="col d-flex align-items-center justify-content-center text-light" style={{ backgroundColor: "#3F72AF" }}><b>Public HoliDays</b></div>
                            <div className="col d-flex align-items-center justify-content-center font-weight-bold fs-5" style={{ backgroundColor: "#F9F7F7" }}> {Calcultaion.Public_Holidays}</div>

                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card" style={{ flexDirection: "row", height: "120px" }}>

                            <div className="col d-flex align-items-center justify-content-center text-light" style={{ backgroundColor: "#3F72AF" }}><b>Days Absent</b></div>
                            <div className="col d-flex align-items-center justify-content-center font-weight-bold fs-5" style={{ backgroundColor: "#F9F7F7" }}> {Calcultaion.Absent} </div>

                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card" style={{ flexDirection: "row", height: "120px" }}>

                            <div className="col d-flex align-items-center justify-content-center text-light" style={{ backgroundColor: "#3F72AF" }}><b>Billable Days (if) </b></div>
                            <div className="col d-flex align-items-center justify-content-center font-weight-bold fs-5" style={{ backgroundColor: "#F9F7F7" }}> {Calcultaion.Billable_Days} </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div
                    className="card bg-light container shadow bg-white rounded"
                    style={{ width: "100%", height: "100%" }}
                >
                    <div className="card-body ">
                        <div className="row pt-4 g-2">
                            <div class="col-sm input-group flex-nowrap">
                                <span
                                    for="validationDefaultUsername"
                                    class="input-group-text"
                                    id="addon-wrapping"
                                >
                                    Name
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="form4Example2"
                                    aria-label="Username"
                                    aria-describedby="addon-wrapping"
                                    value={submited_data.employee_data.emp_name}
                                />
                            </div>
                            <div class="col-sm input-group flex-nowrap">
                                <span
                                    for="validationDefaultUsername"
                                    class="input-group-text"
                                    id="addon-wrapping"
                                >
                                    Employee ID
                                </span>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="form4Example2"
                                    aria-label="Username"
                                    aria-describedby="addon-wrapping"
                                    value={submited_data.employee_data.emp_id}
                                />
                            </div>
                        </div>
                        <div className="row pt-4 g-2">
                            <div class="col-sm input-group flex-nowrap">
                                <span
                                    for="validationDefaultUsername"
                                    class="input-group-text"
                                    id="addon-wrapping"
                                >
                                    Project Name
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="form4Example2"
                                    aria-label="Username"
                                    aria-describedby="addon-wrapping"
                                    value={submited_data.employee_data.emp_project}
                                />
                            </div>
                            <div class="col-sm input-group flex-nowrap">
                                <span
                                    for="validationDefaultUsername"
                                    class="input-group-text"
                                    id="addon-wrapping"
                                >
                                    Project ID
                                </span>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="form4Example2"
                                    aria-label="Username"
                                    aria-describedby="addon-wrapping"
                                    value={submited_data.employee_data.emp_project_id}
                                />
                            </div>
                        </div>
                        <div className="row pt-4 g-2">
                            <div class="col-sm input-group flex-nowrap">
                                <span
                                    for="validationDefaultUsername"
                                    class="input-group-text"
                                    id="addon-wrapping"
                                >
                                    Date Of Joining
                                </span>
                                <input
                                    type="date"
                                    class="form-control"
                                    id="form4Example2"
                                    aria-label="Username"
                                    aria-describedby="addon-wrapping"
                                    value={submited_data.employee_data.date_of_joining}
                                />
                            </div>
                            <div class="col-sm input-group flex-nowrap pb-4">
                                <span
                                    for="validationDefaultUsername"
                                    class="input-group-text"
                                    id="addon-wrapping"
                                >
                                    Email
                                </span>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="form4Example2"
                                    aria-label="Username"
                                    aria-describedby="addon-wrapping"
                                    value={submited_data.employee_data.emp_mail}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*---------------------------------------------------Searchbox/new Timesheet ------------------------------------------------*/}

            <div className="container">
                <div className="row">
                    <div className="col-3 pt-5">
                        <div className="form-group mb-3 search">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/*---------------------------------------------------------- Table ----------------------------------------------------------*/}
            <div className="px-2">
                <div className="container pt-4 pb-2 shadow " style={{ backgroundColor: "#F9F7F7", borderRadius: "10px" }}>
                    <div style={{ height: "auto", maxHeight: "500px", overflow: "auto" }}>
                        <table class="table table-striped bg-white rounded" >
                            <thead
                                className="rounded-top"
                                style={{ backgroundColor: "#3F72AF", color: "white", fontSize: "17px", top: "0px", position: "sticky" }}
                            >
                                <tr>
                                    <th scope="col">S.no</th>
                                    <th scope="col">Attendance</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Activity Performed/ Tasks</th>
                                    <th scope="col">No.Of Hours</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: "17px" }}>
                                {submited_data.Dates.map((data, index) => data ?
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{data.date}</td>
                                        <td>{data.Attendance}</td>
                                        <td>{data.Activity}</td>
                                        <td>{data.No_Of_hours}</td>
                                    </tr>
                                    : "")}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/*---------------------------------------------------- Approved / Rejected ----------------------------------------------------*/}

            <div className="container">
                <div className="row" >
                    <div className="col p-4" align="right">

                        <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => tsa_decision("Approved")}
                        >
                            Approved
                        </button>
                        <button
                            type="button"
                            class="btn btn-danger ms-4"
                            onClick={() => tsa_decision("Rejected")}
                        >
                            Rejected
                        </button>

                    </div>
                </div>


            </div>

        </div >
    );
}

export default TSA_View_Timesheet;
