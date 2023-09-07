import "./App.css";
import React from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import { createBrowserHistory } from 'history'

class Export extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Backup_Data: [],
            New_date: [],
            file_format: "",
            file_name: ""
        }
    }
    history = createBrowserHistory()

    componentWillMount() {
        fetch('http://localhost:5000/export')
            .then((response) => response.json())
            .then((data) => this.setState({ Backup_Data: data })
            );
    }

    delete_backups = async (e) => {

        const response = await fetch('http://localhost:5000/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "delete_backup": e,
                "For": "Delete_Backup"
            })
        });
        const result = await response.json();
        await this.setState({ Backup_Data: result })
        toast.success("Deleted Successfully..")

    }

    view_backups = async (e) => {

        const response = await fetch('http://localhost:5000/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "view_backup": e,
                "For": "View_Backup"
            })
        });
        await console.log(e)
        await this.history.push('/view_backup')
        await window.location.reload()

    }

    export = async () => {
        var [_year, _month] = await document.getElementById("backup_month").value.split('-')
        var datelist = await this.getDaysInMonth((_month - 1), _year);
        const response = await fetch('http://localhost:5000/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "dates": this.state.New_date,
                "file_name": this.state.file_name,
                "file_format": this.state.file_format,
                "For": "export"
            })
        });
        await toast.success("Exported Successfully..")
    }

    getDaysInMonth(month, year) {
        console.log(month, year)
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            console.log(date.getMonth())
            var _Date = new Date(date)
            days.push(moment(_Date).format("DD/MM/YYYY"));
            date.setDate(date.getDate() + 1);
        }
        this.setState({ New_date: days, file_name: document.getElementById("export_file_name").value, file_format: document.getElementById("export_file_format").value })
    }


    render() {
        return (
            <div>
                <Navbar />
                <ToastContainer autoClose={2000} closeOnClick={true} closeButton={<FontAwesomeIcon icon={icon.faXmarkCircle} className="fs-4 mt-2 text-info" />} />

                <div className="p-4">
                    <div
                        className="card bg-light container shadow p-3 mb-5 bg-white rounded "
                        style={{ width: "100%", height: "100%" }}>
                        <div className="card-header"> Export</div>
                        <div className="card-body ">
                            <div className="row justify-content-evenly">
                                <div className="col-lg-5">
                                    <div className="row">
                                        <div >
                                            <div class="input-group flex-nowrap py-4 ">
                                                <span
                                                    for="validationDefaultUsername"
                                                    class="input-group-text "
                                                    id="addon-wrapping"
                                                    style={{ paddingInlineEnd: "57px" }}
                                                >
                                                    Month
                                                </span>
                                                <input type="month" className="form-control" id="backup_month" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div>
                                            <div class=" input-group flex-nowrap py-4 ">

                                                <span
                                                    for="validationDefaultUsername"
                                                    class="input-group-text "
                                                    id="File_Format"

                                                >
                                                    File Name
                                                </span>

                                                <select
                                                    class="custom-select form-control"
                                                    id="export_file_format"
                                                    style={{ backgroundColor: "white" }}
                                                >
                                                    <option selected>Choose...</option>
                                                    <option value=".xlsx">Execl &nbsp; (.xlsx)</option>
                                                    <option value=".pdf">Pdf   &nbsp; (.pdf)</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div >
                                            <div class=" input-group flex-nowrap py-4 ">

                                                <span
                                                    for="validationDefaultUsername"
                                                    class="input-group-text "
                                                    id="File_Name"
                                                >
                                                    File Name
                                                </span>

                                                <input
                                                    type="text"
                                                    id="export_file_name"
                                                    name="file_name"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-1 vl g-4"></div>
                                <div className="col-lg-3 d-flex align-items-center justify-content-center pad" style={{ paddingInlineStart: "5%" }}>
                                    <div><FontAwesomeIcon icon={icon.faFileExport} data-bs-toggle="tooltip" data-bs-placement="top" title="Click to Export" style={{ width: "40%", height: "40%" }} onClick={this.export} />
                                        <p className="fs-5 " > &nbsp; Export </p></div>


                                </div>


                            </div>



                        </div>
                    </div>
                </div>
                <div className="p-4">

                    <div
                        className="card bg-light container shadow p-3 mb-5 bg-white rounded "
                        style={{ width: "100%", height: "100%" }}>
                        <div className="card-header"> Back Up's</div>
                        <div className="card-body">
                            <div className="row flex-wrap">
                                <div className="col-lg ">
                                    <div className="row ">
                                        {this.state.Backup_Data.map((value) => <div className="col-sm-2 pt-4 dropend">

                                            <FontAwesomeIcon icon={icon.faFile} style={{ width: "40%", height: "40%" }} /><FontAwesomeIcon icon={icon.faEllipsisVertical} style={{ paddingBottom: "30px" }} data-bs-toggle="dropdown" aria-expanded="false" />
                                            <ul class="dropdown-menu text-info " >
                                                <li className="px-2"><button type="button" onClick={() => this.view_backups(value.month)} class="btn btn-primary btn-sm mx-2">View</button><button type="button" class="btn btn-danger btn-sm" onClick={() => this.delete_backups(value.month)} >Delete</button></li>
                                            </ul>
                                            <p className="fs-6">{value.month}</p>

                                        </div>)}
                                    </div>
                                </div>
                            </div>



                        </div>



                    </div>
                </div>
            </div>


        );
    }
}
export default Export;
