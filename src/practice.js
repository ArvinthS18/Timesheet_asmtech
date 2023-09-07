import "./App.css";
import React, { useCallback, useContext, useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";


function Example1() {
    const [data, setData] = useState("")
    const [dataA, setDataA] = useState([])
    const InputRef = useRef()



    function call12() {
        dataA.push(data)
        InputRef.current.focus()
    }

    return (
        <div>
            {dataA.map((i) => {
                <ul>
                    <li>{i}</li>
                </ul>
            })
            }
            <input type="text" ref={InputRef} onChange={(e) => setData(e.target.value)} />
            <button onClick={() => call12}>click</button>

        </div>
    );
}





export default Example1;










// class Practice extends React.Component {
//     constructor() {
//         super();

//         this.state = {
//             count: 0
//         };
//     }
//     componentWillMount() {

//         //This function will call on initial rendering.
//         console.log("componentWillMount --- 2");
//     }



//     render() {
//         return (
//             <div>
//                 <p>componentWillMount page</p>

//             </div>
//         )
//     }
// }

// class Practice1 extends React.Component {
//     constructor() {
//         super();

//         this.state = {
//             count: 0
//         };
//     }
//     componentWillMount() {

//         //This function will call on initial rendering.
//         console.log("componentWillMount --- 1");
//     }

//     render() {
//         return (
//             <div>
//                 <Practice />
//             </div>
//         )
//     }
// }


// export default Practice1;
