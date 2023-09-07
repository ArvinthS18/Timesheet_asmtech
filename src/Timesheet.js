/*eslint-disable*/
import "./App.css";
import React, { useState } from "react";
import Navbar from "./Navbar";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ToastContainer, toast } from "react-toastify";

class Timesheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emp_name: "",
      emp_id: "",
      emp_email: "",
      emp_project: "",
      emp_project_id: "",
      date_of_joining: "",
      New_date: [],
      backup_date: [],
      submit_date: [],
      New_attendance: "",
      New_startTime: "",
      New_endTime: "",
      New_activity: "",
      Added_Timesheet: [],
    };
    this.Add_NewTimeSheet = this.Add_NewTimeSheet.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:5000/timesheet")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          emp_name: data.emp_data.emp_name,
          emp_id: data.emp_data.emp_id,
          emp_email: data.emp_data.emp_mail,
          date_of_joining: data.emp_data.date_of_joining,
          emp_project: data.emp_data.emp_project,
          emp_project_id: data.emp_data.emp_project_id,
          Added_Timesheet: data.timesheet,
        })
      );
  }

  //* --------------------------------------------------------------------------------------- *//

  getDates(startDate, stopDate) {
    let s = new Date(startDate).getDate();
    let e = new Date(stopDate).getDate();
    var dateArray = new Array();
    var currentDate = new Date(startDate);
    var sd = moment(currentDate).format("DD/MM/YYYY");
    for (var i = 0; i <= e - s; i++) {
      dateArray.push(moment(currentDate).format("DD/MM/YYYY"));
      currentDate.setDate(new Date(currentDate).getDate() + 1);
    }

    startDate == stopDate
      ? this.setState({ New_date: [sd] })
      : this.setState({ New_date: dateArray });
  }

  //* --------------------------------------------------------------------------------------- *//

  Add_NewTimeSheet = async () => {
    var [startDate, stopDate] = await document
      .getElementById("reportrange")
      .value.split(" - ");
    var datelist = await this.getDates(startDate, stopDate);

    const response = await fetch("http://localhost:5000/timesheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dates: this.state.New_date,
        Attendance: this.state.New_attendance,
        startTime: this.state.New_startTime,
        endTime: this.state.New_endTime,
        Activity: this.state.New_activity,
        "No.Of hours": this.calculateHours(
          this.state.New_startTime,
          this.state.New_endTime
        ),
        For: "addTimeSheet",
      }),
    });
    const result = await response.json();

    this.setState({ Added_Timesheet: result });
    await toast.success("Added Successfullly..");
  };

  //* --------------------------------------------------------------------------------------- *//
  getDaysInMonth(month, year, For) {
    console.log(month, year);
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      console.log(date.getMonth());
      var _Date = new Date(date);
      days.push(moment(_Date).format("DD/MM/YYYY"));
      date.setDate(date.getDate() + 1);
    }
    console.log(days);
    For == "backup"
      ? this.setState({ backup_date: days })
      : this.setState({ submit_date: days });
  }

  back_up = async () => {
    var month = await document.getElementById("backup_month").value;
    var [_year, _month] = await document
      .getElementById("backup_month")
      .value.split("-");
    var date = new Date(month);
    var month1 =
      (await date.toLocaleString("default", { month: "long" })) +
      "-" +
      date.getFullYear();

    var datelist = await this.getDaysInMonth(_month - 1, _year, "backup");
    const response = await fetch("http://localhost:5000/timesheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Backup_dates: this.state.backup_date,
        Backup_month: month1,
        For: "backup",
      }),
    });
    const result = await response.json();

    await this.setState({ Added_Timesheet: result });
    await toast.success("Backup Success");
  };
  //* --------------------------------------------------------------------------------------- *//
  submit_for_approval = async () => {
    var month = await document.getElementById("submit_month").value;
    var [_year, _month] = await document
      .getElementById("submit_month")
      .value.split("-");
    var date = new Date(month);
    var month1 =
      (await date.toLocaleString("default", { month: "long" })) +
      "-" +
      date.getFullYear();

    var datelist = await this.getDaysInMonth(_month - 1, _year, "submit");
    const response = await fetch("http://localhost:5000/timesheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Submit_dates: this.state.submit_date,
        Submit_month: month1,
        For: "submit",
      }),
    });

    await toast.success("Submit Successfully...");
  };

  //* --------------------------------------------------------------------------------------- *//

  search = async (e) => {
    const response = await fetch("http://localhost:5000/timesheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search_element: e,
        For: "search",
      }),
    });
    const result = await response.json();
    await this.setState({ Added_Timesheet: result });
  };

  //* --------------------------------------------------------------------------------------- *//

  filterBy = async (e) => {
    document.getElementById("filter_id").innerText = e;
    const response = await fetch("http://localhost:5000/timesheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter_element: e,
        For: "filter",
      }),
    });
    const result = await response.json();
    await this.setState({ Added_Timesheet: result });
  };
  //* --------------------------------------------------------------------------------------- *//

  // calculateHours(startTime, endTime) {
  //   if (startTime.split(":")[0] != "00") {
  //     var end =
  //       (parseInt(endTime.split(":")[0]) + 12).toString() +
  //       ":" +
  //       endTime.split(":")[1].toString();
  //     var start = new Date("1970-01-01T" + startTime + ":00Z");
  //     var end = new Date("1970-01-01T" + end + ":00Z");
  //     var diff = end.getTime() + 12 - start.getTime();
  //     var hours = Math.floor(diff / (1000 * 60 * 60));
  //     var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //     var h =
  //       parseInt(hours.toString().padStart(2, "0")) > 12
  //         ? parseInt(hours.toString().padStart(2, "0")) - 12
  //         : parseInt(hours.toString().padStart(2, "0"));
  //     return h + ":" + minutes.toString().padStart(2, "0");
  //   } else {
  //     return "00:00";
  //   }
  // }

  calculateHours(startTime, endTime) {
    if (startTime && endTime) {
      const start = new Date("1970-01-01T" + startTime + ":00Z");
      const end = new Date("1970-01-01T" + endTime + ":00Z");

      const timeDiff = end - start;

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      const formattedHours = String(hours).padStart(2, "0");
      const formattedMinutes = String(minutes).padStart(2, "0");
      // console.log(formattedHours + ":" + formattedMinutes,"fdihgujfoerikjhgflkerjhlkjhihgf--");
      return formattedHours + ":" + formattedMinutes;
    } else {
      return "00:00";
    }
  }

  //* --------------------------------------------------------------------------------------- *//

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>
        <ToastContainer
          autoClose={2000}
          closeOnClick={true}
          closeButton={
            <FontAwesomeIcon
              icon={icon.faXmarkCircle}
              className="fs-4 mt-2 text-info"
            />
          }
        />

        {/*------------------------------------------------------- Card --------------------------------------------------------- */}
        <div className="p-4">
          <div
            className="card container shadow bg-white rounded"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#F9F7F7",
            }}
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
                    value={this.state.emp_name}
                    class="form-control"
                    id="form4Example2"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    disabled
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
                    value={this.state.emp_id}
                    class="form-control"
                    id="form4Example2"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    disabled
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
                    value={this.state.emp_project}
                    class="form-control"
                    id="form4Example2"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    disabled
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
                    value={this.state.emp_project_id}
                    class="form-control"
                    id="form4Example2"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    disabled
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
                    value={this.state.date_of_joining}
                    class="form-control"
                    id="form4Example2"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    disabled
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
                    value={this.state.emp_email}
                    class="form-control"
                    id="form4Example2"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*---------------------------------------------------Searchbox/new Timesheet/BackUp -------------------------------------*/}
        <div className="container">
          <div className="row">
            <div className="col-3 pt-5">
              <div className="form-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onChange={(e) => this.search(e.target.value)}
                />
              </div>
            </div>
            <div className="col-4 pt-5 ">
              <button
                type="button"
                class="btn btn-success"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span id="filter_id">Filter</span> &nbsp;{" "}
                <FontAwesomeIcon icon={icon.faFilter} />
              </button>
              <div class="dropend">
                <ul class="dropdown-menu ">
                  <li
                    className="ps-2 cursor"
                    onClick={(e) => this.filterBy("None")}
                  >
                    None
                  </li>
                  <li
                    className="ps-2 cursor"
                    onClick={(e) => this.filterBy("Present")}
                  >
                    Present
                  </li>
                  <li
                    className="ps-2 cursor"
                    onClick={(e) => this.filterBy("Absent")}
                  >
                    Absent
                  </li>
                  <li
                    className="ps-2 cursor"
                    onClick={(e) => this.filterBy("Week-End")}
                  >
                    Week-End
                  </li>
                  <li
                    className="ps-2 cursor"
                    onClick={(e) => this.filterBy("Comp-Off")}
                  >
                    Comp-Off
                  </li>
                  <li
                    className="ps-2 cursor"
                    onClick={(e) => this.filterBy("Public-Holiday")}
                  >
                    Public Holiday
                  </li>
                </ul>
              </div>
            </div>

            <div className="col pt-5" align="right">
              <button
                type="button"
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop1"
              >
                BackUp &nbsp; <FontAwesomeIcon icon={icon.faUpload} />
              </button>

              <button
                type="button"
                class="btn btn-primary m-2"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Add &nbsp; <FontAwesomeIcon icon={icon.faCirclePlus} />
              </button>
            </div>
          </div>
        </div>
        {/*---------------------------------------------------------- Table ------------------------------------------------------*/}

        <div
          className="container pt-4 pb-4 shadow"
          style={{ backgroundColor: "#F9F7F7", borderRadius: "10px" }}
        >
          <div style={{ height: "auto", maxHeight: "500px", overflow: "auto" }}>
            <table class="table table-striped bg-white rounded">
              <thead
                className="rounded-top"
                style={{
                  backgroundColor: "#0a1a49",
                  color: "white",
                  fontSize: "17px",
                  top: "0px",
                  position: "sticky",
                }}
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
                {this.state.Added_Timesheet
                  ? this.state.Added_Timesheet.map((value, index) => (
                      <tr key={index}>
                        <th scope="col">{index + 1}</th>
                        <th scope="col">{value.Attendance}</th>
                        <th scope="col">{value.date}</th>
                        <th scope="col">{value.Activity}</th>{" "}
                        {/*<th scope="col">{value.Attendance == 'Present' ? value.Activity : "-"}</th> */}
                        <th scope="col">
                          {this.calculateHours(value.StartTime, value.Stoptime)}
                        </th>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>

        {/*---------------------------------------------------- Submit for approval -----------------------------------------------*/}

        <div className="container">
          <div className="pb-5 pt-4" align="right">
            <button
              type="button"
              class="btn btn-danger "
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop2"
            >
              Submit For Approval
            </button>
          </div>
        </div>

        {/*---------------------------------------------------- Modal for Add new timesheet ---------------------------------------*/}

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
                    className="form-control"
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
                      class="custom-select col-8 form-control"
                      id="inputGroupSelect01"
                      style={{ backgroundColor: "white" }}
                      onChange={(e) =>
                        this.setState({ New_attendance: e.target.value })
                      }
                    >
                      <option selected>Choose...</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Week-End">Week-End</option>
                      <option value="Comp-Off">Comp-Off</option>
                      <option value="Public-Holiday">Public-Holiday</option>
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
                      // value={"00:00"}
                      class="form-control"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={(e) =>
                        this.setState({ New_startTime: e.target.value })
                      }
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
                      onChange={(e) =>
                        this.setState({ New_endTime: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div class="form-group">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Activities performed.."
                    onChange={(e) =>
                      this.setState({ New_activity: e.target.value })
                    }
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
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={this.Add_NewTimeSheet}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*---------------------------------------------------- Modal for Backup new timesheet -----------------------------------*/}

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
                <div class="input-group flex-nowrap  ">
                  <span
                    for="validationDefaultUsername"
                    class="input-group-text "
                    id="addon-wrapping"
                    style={{ paddingInlineEnd: "57px" }}
                  >
                    Month
                  </span>
                  <input
                    type="month"
                    className="form-control"
                    id="backup_month"
                  />
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
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={this.back_up}
                >
                  BackUp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*---------------------------------------------------- Modal for Submit for approval --------------------------------------*/}

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
                <div class="input-group flex-nowrap  ">
                  <span
                    for="validationDefaultUsername"
                    class="input-group-text "
                    id="addon-wrapping"
                    style={{ paddingInlineEnd: "57px" }}
                  >
                    Month
                  </span>
                  <input
                    type="month"
                    className="form-control"
                    id="submit_month"
                  />
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
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={this.submit_for_approval}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Timesheet;
