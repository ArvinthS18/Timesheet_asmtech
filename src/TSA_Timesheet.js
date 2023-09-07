/*eslint-disable*/
import "./App.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import Admin_Navbar from "./Admin_Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";







function TSA_Timesheet() {

  const [submited_data, setSubmited_data] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch('http://localhost:5000/tsa_timesheet')
      .then((response) => response.json())
      .then((data) =>
        setSubmited_data(data)

      )

  }, []);

  const delete_data = async (id) => {

    const response = await fetch('http://localhost:5000/tsa_timesheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "data_id": id,
        "For": "delete"
      })
    });
    const result = await response.json();

    await setSubmited_data(result)

    // await toast.success("Backup Success")

  }

  const view_data = async (id) => {
    const response = await fetch('http://localhost:5000/tsa_timesheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "data_id": id,
        "For": "view"
      })
    });
    const result = await response.json();
    console.log(result.all_data, "result.all_data")
    await navigate('/tsa_view_timesheet', { state: { "submited_data": result.all_data, "Calcultaion": result.calculation } })
  }

  const filterBy = async (e) => {
    document.getElementById('dropdownMenuButton1').innerText = e
    const response = await fetch('http://localhost:5000/tsa_timesheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "filter_element": e,
        "For": "filter"
      })
    });
    const result = await response.json();
    await setSubmited_data(result)
  }

  const search = async (e) => {
    const response = await fetch('http://localhost:5000/tsa_timesheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "search_element": e,
        "For": "search"
      })
    });
    const result = await response.json();
    await setSubmited_data(result)
  }


  return (
    <div>
      <div>
        <Admin_Navbar />
      </div>


      {/*---------------------------------------------------Searchbox/new Timesheet ------------------------------------------------*/}

      <div className="container">
        <div className="row justify-content-between  px-2">
          <div className="col-4 pt-5">
            <div className="form-group mb-3 search">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={(e) => search(e.target.value)}
              />
            </div>
          </div>
          <div className="col-2 pt-5" align="right">
            <div class="dropdown">
              <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                All
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" onClick={(e) => filterBy("None")} >None</a></li>
                <li><a class="dropdown-item" onClick={(e) => filterBy("Approved")} >Approved</a></li>
                <li><a class="dropdown-item" onClick={(e) => filterBy("Rejected")} >Rejected</a></li>
                <li><a class="dropdown-item" onClick={(e) => filterBy("Not Viewed")} >Not Viewed</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/*---------------------------------------------------------- Table ----------------------------------------------------------*/}

      <div className="container pt-4 pb-4 px-2 shadow" style={{ backgroundColor: "#F9F7F7", borderRadius: "10px" }}>
        <div style={{ height: "auto", maxHeight: "500px", overflow: "auto" }}>
          <table class="table table-striped bg-white rounded" >
            <thead
              className="rounded-top"
              style={{ backgroundColor: "#0a1a49", color: "white", fontSize: "17px", top: "0px", position: "sticky" }}
            >
              <tr>
                <th scope="col">S.no</th>
                <th scope="col">Project</th>
                <th scope="col">Emp.ID</th>
                <th scope="col">Name</th>
                <th scope="col">Month</th>
                <th scope="col">Status</th>
                <th scope="col"></th>

              </tr>
            </thead>
            <tbody style={{ fontSize: "17px" }}>
              {submited_data ? submited_data.map((data, index) =>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.employee_data.emp_project}</td>
                  <td>{data.employee_data.emp_id}</td>
                  <td>{data.employee_data.emp_name}</td>
                  <td>{data.month}</td>
                  <td>{data.status}</td>
                  <td><FontAwesomeIcon icon={icon.faEllipsisVertical} data-bs-toggle="dropdown" aria-expanded="false" />
                    <ul class="dropdown-menu text-center " style={{ borderColor: "#95BDFF", backgroundColor: "F9F7F7" }}>
                      <li className="pb-1 text-primary" onClick={() => view_data(data._id.$oid)}>View</li><hr style={{ margin: '0px' }} />
                      <li className="pt-1 text-danger" onClick={() => delete_data(data._id.$oid)}>Delete</li>
                    </ul></td>
                </tr>
              ) : "Loading..."}

            </tbody>
          </table>
        </div>
      </div>


      {/*---------------------------------------------------- Modal for Add new timesheet ----------------------------------------------------*/}

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                New Timesheet
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body ">
              <div class="input-group flex-nowrap py-4 ">
                <span
                  for="validationDefaultUsername"
                  class="input-group-text "
                  id="addon-wrapping"
                  style={{ paddingInlineEnd: "70px" }}
                >
                  Date
                </span>
                <input
                  type="text"
                  id="reportrange"
                  name="datefilter"

                />
              </div>
              <div class="col input-group flex-nowrap">
                <div class="input-group ">
                  <div class="input-group-prepend">
                    <label
                      class="input-group-text"
                      for="inputGroupSelect01"
                      style={{ paddingInlineEnd: "20px" }}
                    >
                      Attendance
                    </label>
                  </div>
                  <select
                    class="custom-select col-8"
                    id="inputGroupSelect01"
                    style={{ backgroundColor: "white" }}
                  >
                    <option selected>Choose...</option>
                    <option value="1">Present</option>
                    <option value="2">Absent</option>
                    <option value="3">Week-End</option>
                    <option value="4">Comp-Off</option>
                    <option value="5">Public-Holiday</option>
                  </select>
                </div>
              </div>
              <div className="row justify-content-between py-4 ">
                <div class="input-group ">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      Start
                    </span>
                  </div>
                  <input
                    type="time"
                    class="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      End
                    </span>
                  </div>
                  <input
                    type="time"
                    class="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Activities performed.."
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*---------------------------------------------------- Modal for Backup new timesheet ----------------------------------------------------*/}

      <div
        class="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Back Up
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body ">
              <div class="input-group flex-nowrap py-4 ">
                <span
                  for="validationDefaultUsername"
                  class="input-group-text "
                  id="addon-wrapping"
                  style={{ paddingInlineEnd: "70px" }}
                >
                  Date
                </span>
                <input
                  type="text"
                  id="reportrange"
                  name="datefilter"
                  value=""
                />
              </div>
              <div class="input-group flex-nowrap  ">
                <span
                  for="validationDefaultUsername"
                  class="input-group-text "
                  id="addon-wrapping"
                  style={{ paddingInlineEnd: "57px" }}
                >
                  Month
                </span>
                <input type="month" />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*---------------------------------------------------- Modal for Submit for approval ----------------------------------------------------*/}

      <div
        class="modal fade"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Submit For Approval
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body ">
              <div class="input-group flex-nowrap py-4 ">
                <span
                  for="validationDefaultUsername"
                  class="input-group-text "
                  id="addon-wrapping"
                  style={{ paddingInlineEnd: "70px" }}
                >
                  Date
                </span>
                <input
                  type="text"
                  id="reportrange"
                  name="datefilter"
                  value=""
                />
              </div>
              <div class="input-group flex-nowrap  ">
                <span
                  for="validationDefaultUsername"
                  class="input-group-text "
                  id="addon-wrapping"
                  style={{ paddingInlineEnd: "57px" }}
                >
                  Month
                </span>
                <input type="month" value="" />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
export default TSA_Timesheet;
