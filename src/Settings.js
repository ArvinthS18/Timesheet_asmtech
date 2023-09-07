/*eslint-disable*/
import "./App.css";
import React from "react";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import Logo from './person_images.png';
import { ToastContainer, toast } from 'react-toastify';
class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            image: Logo,
            "emp_name": "",
            "emp_id": "",
            "emp_mail": "",
            "emp_project": "",
            "emp_project_id": "",
            "date_of_joining": "",
        }
        this.delete_photo = this.delete_photo.bind(this)
    }
    componentWillMount() {
        fetch('http://localhost:5000/settings')
            .then((response) => response.json())
            .then((data) =>
                this.setState({
                    emp_name: data.emp_name,
                    emp_id: data.emp_id,
                    emp_mail: data.emp_mail,
                    date_of_joining: data.date_of_joining,
                    emp_project: data.emp_project,
                    emp_project_id: data.emp_project_id,
                    image: data.image
                })

            );
    }
    delete_photo = async () => {
        this.upload_photo('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEUAAAD////u7u7t7e35+fn19fX39/fx8fH8/Pzk5OTo6OjZ2dm3t7ff39+kpKRBQUEeHh4ODg59fX1fX19xcXEiIiJHR0ctLS2urq5jY2OIiIjQ0NA6Ojq/v7+WlpZbW1sWFhampqaTk5MxMTF5eXmMjIzS0tK0tLRRUVG+vr49PT1GRkYnJydra2sAa6mSAAAVUklEQVR4nNVd6WKzrBIOgoKaPWmbxMamS7q8p73/2ztuwKCooNj0m1+tGofHAWZhGGaIE8FeSZiIax4nKi4F4jEmrolLvrhEMcY0IAwFUZwk83S/Wz3eXWYFbe7Wj6vdPp0nSRwFiJGAYnsGvGm4B8FsIoQBQ4wtnrc/n4+bWTttHj9/ts8LJt/1X0FIk/n1sQNZnb6v84T+ZxASujyuugTXIs7VcRmRvB34zyLMBxM9p2trcJLW6RwjRv8kQkx9hM/H1xHwSnp4+sD53PPHEOIAkfn2MhpeRfs5yRj9IYSUsHg7pnM2ab2NA/F+RwiZ7j4YYR0I0eHHKbySdodOhNgUIamIEeqXRAPGr/mCxKVAPEaKawiFyz55/Hv62W9P6eH565zT1/MhPW33P0//+uS+DLN2Z2TWNFJrWvnYDHOSYvLFNSBgTrLv5GaLj6LTd0cTL8f0nBkuJNf/UuRZq7P/GMnNnfR46fj99ynKmuMBMXECg5STFDBEMBNDDd5vdADZhSFCH8XbtrZtnk7LuOjWNB8y2MMqg1Lrlf/Hy9NTqwLdxkjyJO26SkEABqkWYXMQ6xD6DLfNnpdtsuDv62kAv7Q4n1pfFjlHaCbD6KRt0Hq/XCBAZgiZl43oxXKvH5mn8AYyJMsHTVPudueIEN+iAZIB9nxCovPuTvPehyX5bRl+rTTtOM5pZXL1NKCdAWWIfuw17159/aoMF5o2rK6UZHoYWzZAx4DRq+YD7he/J8NDk/1uziw+cX8nYfNdk8kBPGaO0F4fhvd1zt/7am4ZoK40DCqK3hqa9j5k1FofcpuGBMJICMQ1aTgI0wctG5rrukCk/sug8UtDBvKxAC2udVabZ8QsGcw0XxHapXUBx3UBPpxI1ikaX5GCr4jqAu5ikBm+oB+QU31mvY+tGGBs6Vuc6wx/cm08xvSvMWiY9ou6UX93tmNghTCo6/hjOf6mRJhhPNa4noKpEHq1Hnp3rtowLULE6j3n3psG4bw2xaRiOpsYYYYxrU04cwv/0LgBNSV4D4zPyRFStqj1n4Pg4AYhDtipzsF3E0YxQphrydoXfmPVg24Qkkgd7U8xcxUKM0OY/cviJ6UNx4hYIuzQhyxUzcSXwmjotCo06krHQFzS6UOkPuajF6UVq5AZ6UPxFTVWHY8exIrX9sp1bvP7E/FLjZg6GOT+IScQRGgwiJVw7Do2YSAQ4nbDeHFReodXbwAMo+h7WA8D1BImaTLwlNFyiQ0YGHhP70rfeO5qwADnxg4hq+mN934G/QgTRQ1+oa4GTI6QUPQFm7NJxvuHiTq4UXcDnPmHrQwwUqe9ZKwM36EEn0LS14CpZYgzVRBCtbF5Fz8dJMMF/Fy7fCa/tQyLJxT/P+a/HYCQxXAW3RKKDRowOUIPUwID0ZeYGSFszrVZd4B68FQYu0rM2wIhhg1APi2uDESYLxRBiOuwBN6iLSgnn3HyywtBBId0iqqr9ccyEpeIuETEteLdAQqiMHyfH9I0PcyTRZiZHYGv/WWg/LLGIOBXENQaqyjQIih+2WG1MahdT/wxJcjAxdRntUWHl6MaVnr9eTlEIGRkYLWpDBB0BY6sFLBlFAO+IgUNaB9qDcsbez7z4lPbItr69O5VPco6ncVXpHjSIkDdvgX0Vrby01khJCh6acQeFbpPo4KzfcaQOhYP9gjnCsBBKUskSOohFh0dE0aGJF15CsS5LUIPaPpdNg3YN4Cid03YWks/78i3ZpDJnQAGG88OYQD61hMakHbmo/jTEF8hx3gAwgwisG7uA20mQhtCMMuswoynNUL2crEAmKnt5wEIPQJt1BOyQHgGvMMhE4GVAEv6XNgjzIwS8IazSM7qi2KwGMQnv1CbuurQhx/2aW1FiNCYgVC40Jm6i7l6VfRh0CQEBuEz0jzQTYi0pi/0UKbV7LkBtXiv+7ludQ3kxxwbAg7qXxHXkkFU58aOfnDQz6AuYKCRltWlnmyTUHaxV/5ucweVRDZ5pXX6jAJ750UmFGyqjIYe7wn0UTGHGyMki3HZia8glG6IkMTy5/cmCIG19iLeYoowiP43CmDWRk1UuUeGDMRRP/oRAq/+SX5OQ4Qo0qVo2NGKdjDQO6AIjPxFL0KQZREDBW4oQxM7tI/erBEGoJ/u+xAC9XJg1i64PkvKlq62CDEcWl/dCInsZffIOsgw1zR3CH1ZIsxMLjk9rkhntglQhQvfIPtSUVehqzTh1zJVz6szaE9n8cH0sazpQxgp8SOpWlIEIyV+M1IigyfVY2jsNCrpiHQMuqJEwLR5iHwYJVLsUrAMeld8IyFsg1x9Z300pznrzdWvRSSZtKVPrM238LFkcUYQoYFvQUNdruJQegip7RIs8IdADEtFCKICZfDKBiF6cwiwcPYsEYLQIAgrKQh9EOFe8PumCKFKckKhb7uMLiebi4wYKAiBCH/EfUOEmA31mNroyqwTBWT2lIjuKghRJB54iMR9Q4T+QtfKUbSgtgjBWrVor4JQTqQned8MIUauRVioK0uEoBHcLFIQhjLsTuR9M4TUv2jaOI4uIIJvoC2Kx8SPv3nqO0QozZmrfI0GoUAtEDKPabKGR9McSQacOvM54EzCvf0MobDZJP6FL20ezqPbamNT7HvaMslAgGix2gry0UL2w6p50vImUgpv0pQBCPklreWNdS0cTZg2xdSzBCt9vwOpEHCEgQyQR0Gzi/cgnKKTZnaV4GqMUE7pu0BFCBT2fkAigX3814R+kDVCsMIfBxAhnO3n1svslPybBOFKDBdzhNL83+Y3BEJKhGu3YtYy9JMhIe5+WsechTlCJlz4NaEAIZHQr/apEuRjEoBZd+Lf2hwhuiq/lgjlHEStE3owSnXNc0BLztYCIRW/fst9zCqKQeVsv2dWe0gLIlNow7Ixlvowb6kUVoYrR5hvMUGym82RdjsK0W5H4U+NieN30SOpt6Nz301xCcw1Hyj/ZWm1iYjqHaU2W1qqSxMBzCYLrZjUHlTLEaZUhDOekMg2oWKtYYc8+zTsyRDO+JAw8y3KzCipEl+psLxliCM3I6wRUm3rboWQATQCoZgL1xEdIMNI2zoXVN8tbbIZgEZCt6ccoVT3+9xctUbo3r/nxCdRG4RA9WXjuEQoe9lyEELXQShJPJpih1B6urRCKK9gfwjC6XrpIBmCmNGyQigCjZcCkjXCabzDnIaMw8wCuvDfH0uEVBir21Lx/Bl9KOdSc32IYVhsRT08o4H0DBJUW3wRKxy6BFe+NuL7kyH0/dZ1ITVFV3lM7i/YZIhmWPoVmyrSbVz5o7rmuy2+I2ld+gDYzPKWAl4Imc1zy5sJf+OpesTWPySmOYi2dM8De0YIZSDOF1botUAo7GYeCLb0D3FtT5k7uvLWWyKUwe3HPJOdiReKjCI7GWIyTSBqNnvme+FsEUr9lyEMpPbgKza2Pr5/1jXPAQ3x8QuSNkiEZuQZ4B0kQ4/SaRzE79A+TlOReMcSzeSy2EUgtI6XdmerD6UhsbaKLvwdWzSTq248D3EAQpdL+JK2A+KlFQkz7ScbhyKaK/ZU2MZpvIks04QIBhJhX5ymJKEBj2gmkyXP3CCztdoQDqbQiBvJ1M5qy5omrJrHaBZLm63qdgM2k7O+onRD6G34dniJcBPPxN8iwjwAIcUX9wjBhlxrhHL3eSIR/ov4/QEFARznmuT0LZthjzASKynnmZgGn7gBMQSh82STPH13RNGGQFimzzMRhfph4r49Qs993DscVXhDNCedibDNXrsfwxhhom/nYNra59NAhBLWbCdfOUaGHnKsMLB1TpSCUMwLu5kIYZyYRob8Ui9C7MdOFxHfevPamoYXRCj8p9VMKPwUNRY9QBnUrjJlxdoIRS514iMmputCokIrXCuSQe7HmVjHkDVt7a22khwiXGoZmJe8ky7r3ezC/3wGCBsdwCjP+13b2CH0qWdgvuFfIrzIt0oTYnBRBzep+iJ7cgzCL81rz6NliFxlncxbGRgj1IUdXCAcuempom07g1EIEwcIkQu9/+m3M3AlQ/4T+7IVDrz9b6+Lwa17KcHoWfNqG1qH3QzsEQpLBMylA/Vhoa7YOIgPMgl9lD4Uc+lGavznpk3TWUC1zeQYJ8UQ2ea6aFNRZCPuZsIZPvAeMMguLS+VX3H4dJOvnJhXjSgv6e1SofHXwC4d4wGrDfi6DAN4DAwZoF7fAtilwLdwhhD5g1ypuTmDXoTAt3DlH6oNYPbLUZ/vNgws/ENHPn69ASi2E+M6tWRg7uOLDrtzKUNEg+DZfDPb+i2yZtCNEMRphBHy6cv7DhBmSoymFzOApwUo5ecEoYy1LWW8dDUmXqppQG4ckEM/xsuBZDaG23PXQLw0gTFvvkphv26hWVbwCGIf1/ajRwRtji/n3KJtMkCdDJqPAYMHxrzBugV/ssvy1hVQBUaV/NY42ZmHpi7bmJBKh3dVaJUlYLvtUgLXLcDak0A4wvLOH8F5iS/bbc+7D9Qo6tfCoL8LSxfnMQLrh2JD1yiE2CPsPKx+Sxrmfc9FYUZl/VC3BtzRS3sbQNDX4NIRD2nAqBOEogf9wHV8makwXIYBO4/LWkilYhyDULxv6yQXA0QxGlX+relx3sXAECERr/tQ8mn4ZDpYhr6TcOIuaWVgilD6b6GSE8UL7gyVofb8oCH0EoxEKO1+Na+NR/FscxPLBvgONzuXRdGtSsAq2kI0pchrkzPrPdYW1ejLL80fQ+jsNgUzZUjXDqP8UoZFBtMV5RVaZQAwpgOttnrJewd09OA6vpXVRuWS+xfL98zIHOFDWaXE2vIm4QSbSC8yRG1neYOKQ5uEqnneu4EIF9PsIZV6wxKhcL5XlKq5+rPid9YIXS/hCxJ2pBVCsPH+2NhvkQzZbzFN2l5BPGvZCqEvv/iysWfmJdcKlgjHhvE76RhYI4QF6mhj39POXoZT5XhXtPftZSiGodj3BPbxhrZ716ZK8Rb0ySwRUlm0VexdA/sPU2anD6fISazRj2+nD8EZH2deoZXI+pj/symR6iPdarlz2mdOmU3JVuEbPmDCK7TKfcCb3CA0XV2bTk2oJGsimayuycDTE+K1TTCTe7mXyNjyJlHXWccuKQUI67qq4VvIgfPBRPUWsB//1Tf2nrC7Gnt9NDdH6MtkCUy1NRXejWXoPmm2le6oMUKZtsRrKpQIpV2yM5XhVKUitPRITBHKBSGlLgaobfK9MEM43dZYLaWGCGUdJbW2CVZqSJn0UjLNNpl2SswQynlGrU8D87TXLDBA+AuqXqV/kQlC2RdljSGu5kD/lcoPIFT14XRb8FvprUTYrQ/BfBJUCHiFVmBgfvqIXxQhEIqUSMlku0a76MxAlAj5zaYRKpco8vOfSwSyIh14lbgmphzF8sZsQpewne4D1S5tDCUCVMJMINDV3LtvIFR9C+oyG9iCrqjbt2Cgzi+ouSfug7qJ750I8e9PMxUFtLsypPSRtHUTQYbvZyDuaxD6zmo+29KWdSKkUoNpa19CHZ6I+xqEU7v1HRRK11WDEPhy2vqlsHKkHKdNhHS6gju9JJY4tQjlc/oatEod4WU7QvKrBmmNNMmnAqGcHdrqCEPT7S5qQ0g8J7ncA0kKp6EtIlnQu60WtBeAMixb9UNJhFOGR/tpI5aIGxVawRhT63kLmycHAeaQYpuxeBAYcr9tcquUMr3VBvfOvXScMwPqqn/6VGd5+8qxlr9Pr1X2Xb0ivC/ttYew6/QHoMtT3ekP09VINKWzr0MIm7U0Pd9i9h7oZDjNMpM5bRluIMQB2HLVON9CRQi15ifzGgiDsMnzd+lCaQMhZWD9sueMEuWcGXlUEEfovri8PZ2r0noAIZwhe8+ZUXzb9zrCqSoG21BZXRgiJHBbYP9ZQaDSpwzicYT0/VZGt6R/AVUR+hQchKc570nRhwUBhbeVCEutc1N1X1Hiq/oQBm75mV1QHza2ozBw7lo28yrbUZztoRxDH0jZPQM13CZkjY09mvMPlZ1LcQAFzFyetDKUirlErK4phQCWvK/JQao7DxgenjR7KCu0c4S/DkdHRQetDhwOIuAI3POrfad0KmdYrpgvEd4giKihQCDEPgImyl1cRXotzyF9y+euCuGkWQnGlAiElMDlob5zSNvOkp29MIHw9vo+p1QgVAwQq7NklfOA82SwCuFUhbvt6KdCqBwoZ3sesHKm82xenVrNhp8w6pKOFUJl0Nie6Vxz5avY26gjRt1RsdmbYjWNwOBcbunGN89WryDCOfaGVJxVSpXpsDpbXUWQU6YPm/mnVeaqsop9SVD2xESnPNjSXZy1UJXgG9IgKHNvheUNd0KXuUVMybtPsunml7JLeimpd9Ejo7iJoM23EPcD9djULzRZjUtbOvvqGFpFQQ1Bp/ckEGKiLlB8oD+DUAW4Dss5xgIhv8TUwFr6ZxAq4bBLzFoRdMswv68aorcNlUpS2xFzTT9Ahtn9978xfbbT5l3GAYfIcMIkbkeUaCt/2CBE75dbg+igTaKvbQK1RS13sbyvZJv8ZSm+I31tExinEVfrVltORY4wu/FSRTtlsyjW7nTuiWLU87zhzug/RetiFtVXHJAIDBBmEENX++5c0iosZlEXCD2PRC6OhXdLx4jI6XA0QhywvxAphfTGEwzdIMzjNJPvrLCiAzi4wBVCNP875s1m3lfdcxBC5P0Zu9Trrd6iQ6iNVPEAZBmJCv7GYDzlIWFTGeKZTckwhs63j9TcnRHTVzMj2kua1bWuPTMovnVPvY9LM627Ih202sRQa7O8lS6cvWV5ywlns6w2z/VUFQSDtM8/bAzSAIW3E+N9yCjPKBiFsC9Xf6qTVfvoANoxpQwzWuz7m+Oc9gvz2pdjZYgc1sAwpVVRm9MVwl4Z5rwOv7ni/bAsVdwvyjCj6NrfMkd04pmzQxDa6UO4h9RneHv5BXiXraw7ZFqhFerD4WVQSdZx4untuG2MkFnT9Ais7NKc6vvx6XXKvbLfVwo7onmFVilgG99CixChcLoNJstQHWrmlSElAgcIMzpMscC/k2cZ3ByhR1i8dRuPW29jOafdHmGepYvI3N3Mup+TjNGY+qXOEeaTUUDw+Th+M8bD0wcmQb6m+8cQFpQxPqdjuus6PWPEaBuDmyMsG0Do8nhv70RuVsdlRAql3sNgKMLWdQvV4DGr0EqS+dUm+ebx+pXQOgPUwaC7QquiD4WYrO3SrpJ45aVouf05PnaJc/P49LMttB6h1IZBj11qlosxBiFoQBQn52W6360e13cV2Mvd42q3T5/PSRyR0Qw0XRgi+D9QbH7hiPC+GgAAAABJRU5ErkJggg==')

    }
    upload_file = () => {
        console.log("1 - upload file")
        document.getElementById('file-input').click()
    }

    handleImageUpload = async (event) => {
        console.log("2 - upload file")
        const file = await event.target.files[0];
        const reader = await new FileReader();
        await reader.readAsDataURL(file);
        reader.onloadend = async () => {

            await this.upload_photo(reader.result)

        };
    }

    upload_photo = async (img) => {
        await console.log("3 - upload file", img, typeof (img))
        const response = await fetch('http://localhost:5000/settings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "image": img
            })
        });
        const result = await response.json();
        console.log(response.json(),"iugkuhyfkjhgfg");
        await this.setState({ image: result.image })
        await toast.success("Updated Successfully..")

    }

    render() {
        console.log(this.state.image, "changed in state - 5");
        return (
            <div>
                <Navbar />
                <ToastContainer autoClose={2000} closeOnClick={true} closeButton={<FontAwesomeIcon icon={icon.faXmarkCircle} className="fs-4 mt-2 text-info" />} />

                <div className="p-4 ">
                    <div
                        className="card bg-light container shadow p-3 mb-5 bg-white rounded"
                        style={{ width: "100%", height: "100%" }}
                    >
                        <div className="card-header"> Edit Profile</div>
                        <div className="card-body ">
                            <div className="row pt-4 g-2 justify-content-center flex-wrap" >
                                <div className="col-lg-2 text-center">
                                    <img
                                        src={this.state.image}
                                        alt=""
                                        width="180"
                                        height="200"
                                        style={{ borderRadius: "25px" }}
                                    />
                                </div>
                                <div className="col-lg-2 g-4 py-4 text-center" >

                                    <div class="btn-group">

                                        <button className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" onClick={this.upload_file} aria-expanded="false"><FontAwesomeIcon icon={icon.faUserPen} /> &nbsp; Edit</button>
                                        <input type="file" id="file-input" onChange={(e) => this.handleImageUpload(e)} style={{ display: "none" }} />

                                    </div>
                                    <div><button className="btn btn-danger my-4" onClick={this.delete_photo} ><FontAwesomeIcon icon={icon.faTrash} /> &nbsp; Delete</button></div>
                                </div>
                            </div>
                            <div className="row pt-4 g-2">
                                <div class="col-sm input-group pt-4 flex-nowrap">
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
                                        value={this.state.emp_name}
                                        disabled
                                    />
                                </div>
                                <div class="col-sm input-group pt-4 flex-nowrap">
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
                                        value={this.state.emp_id}
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
                                        class="form-control"
                                        id="form4Example2"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        value={this.state.emp_project}
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
                                        class="form-control"
                                        id="form4Example2"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        value={this.state.emp_project_id}
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
                                        class="form-control"
                                        id="form4Example2"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        value={this.state.date_of_joining}
                                        disabled
                                    />
                                </div>
                                <div class="col-sm input-group flex-nowrap">
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
                                        value={this.state.emp_mail}
                                        disabled
                                    />
                                </div>

                                <div className="row pt-4 g-2">
                                    <div className="text-center ">
                                        <button className="btn btn-primary col-sm-3 ">Save</button>
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

export default Settings;
