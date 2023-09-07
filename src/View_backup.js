import "./App.css";
import React from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import { createBrowserHistory } from "history";

class View_backup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Backup_Data: [],
    };
    this.backto = this.backto.bind(this);
  }

  history = createBrowserHistory();
  componentWillMount() {
    fetch("http://localhost:5000/view_backup")
      .then((response) => response.json())
      .then((data) => this.setState({ Backup_Data: data }));
  }
  // calculateHours(startTime, endTime) {
  //     if (startTime.split(':')[0] != '00') {
  //         var end = (parseInt(endTime.split(':')[0]) + 12).toString() + ":" + (endTime.split(':')[1]).toString()
  //         var start = new Date("1970-01-01T" + startTime + ":00Z");
  //         var end = new Date("1970-01-01T" + end + ":00Z");
  //         var diff = (end.getTime() + 12) - start.getTime();
  //         var hours = Math.floor(diff / (1000 * 60 * 60));
  //         var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  //         var h = (parseInt(hours.toString().padStart(2, "0")) > 12) ? parseInt(hours.toString().padStart(2, "0")) - 12 : parseInt(hours.toString().padStart(2, "0"))
  //         return h + ":" + minutes.toString().padStart(2, "0");
  //     }
  //     else {
  //         return "00:00";
  //     }
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

  search = async (e) => {
    const response = await fetch("http://localhost:5000/view_backup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search_element: e,
      }),
    });
    const result = await response.json();
    await this.setState({ Backup_Data: result });
  };

  backto() {
    this.history.push("/export");
    window.location.reload();
  }

  render() {
    return (
      <div>
        <div>
          <Navbar />
        </div>

        {/*---------------------------------------------------Searchbox/new Timesheet ------------------------------------------------*/}

        <div className="container">
          <div className="row">
            <div className="col pt-5">
              <button
                type="button"
                class="btn btn-primary"
                style={{ borderRadius: "20px" }}
                onClick={this.backto}
              >
                <FontAwesomeIcon icon={icon.faArrowLeft} /> &nbsp; Back
              </button>
            </div>
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
          </div>
        </div>

        {/*---------------------------------------------------------- Table ----------------------------------------------------------*/}

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
                {this.state.Backup_Data
                  ? this.state.Backup_Data.map((value, index) => (
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
      </div>
    );
  }
}
export default View_backup;
