import { useState,useEffect, useMemo } from "react"
import Table from "../Table";
import "./rootequations.css"
const Secant = ()=>{
    const {evaluate } = require('mathjs')
    let xs;
    let xs_new;
    let fxs;
    let fxs_new;
    let i=0;
    let error;
    let er =0.0001
    const [fx,setFx] = useState("");
    const [inputxs,setInputxs] = useState("");
    const [inputxs_new,setInputxs_new] = useState("");
    const [btnStatus,setBtnStatus] = useState();
    const [data,setData]= useState([]);


    const calculatorfx = (x)=>{
        return evaluate(fx,{x})
    }

    const setUseState = (i,xs,xs_new,error)=>{
        const initData = {
            No:i,
            xs:xs,
            xs_new:xs_new,
            Error:error
        }

        setData(prevData =>{
            return [...prevData,initData]
        })
    }

    const btnSubmit = ()=>{
        setData([])
        xs = eval(inputxs);
        xs_new = eval(inputxs_new);

        do{

            fxs = calculatorfx(xs);
            fxs_new = calculatorfx(xs_new);
            let tempxs = xs - ( fxs*(xs - xs_new)/(fxs - fxs_new));
            error = Math.abs( fxs*(xs - xs_new)/(fxs - fxs_new));
            setUseState(i,xs.toFixed(6),xs_new.toFixed(6),error.toFixed(6));
            xs = xs_new;
            xs_new = tempxs;
            i++;
        }while(error > er)
        setUseState(i,xs.toFixed(6),xs_new.toFixed(6),error.toFixed(6));
        setFx("");
        setInputxs("");
        setInputxs_new("");
        //testcase
        /* e^(-x/4)*(2-x)-1 */
    }
    //column
    const columns = useMemo(()=>[
        {
            Header: "No",
            accessor: "No"
        },
        {
            Header: "xs(root)",
            accessor: "xs"
        },
        {
            Header: "xs(i+1)",
            accessor: "xs_new"
        },
        {
            Header: "Error",
            accessor: "Error"
        },
    ])

    //button status
    useEffect(()=>{
        if(fx.length >0 && inputxs.length >0 && inputxs_new.length >0)
        {
            setBtnStatus(false)
        }
        else
        {
            setBtnStatus(true);
        }
    },[inputxs,inputxs_new,fx])


    return(
        <div className="container-fluid">
            <div className="FormBisection">
                <div className="input-display">
                {/* input function  */}
                <div className="input-fx-display">f(x)</div>
                <input className="input-fx" type={"text"} value={fx} onChange={(event)=>{
                    setFx(event.target.value)}}/>
                {/* input x(0)  */}
                <div className="input-x-display">x(0)</div>
                <input className="input-x" type={"text"} value={inputxs} onChange={(event)=>{
                    setInputxs(event.target.value);
                }}/>
                {/* input x(1)  */}
                <div className="input-x-display">x(1)</div>
                <input className="input-x" type={"text"} value={inputxs_new} onChange={(event)=>{
                    setInputxs_new(event.target.value);
                }}/>
                
                <div className="btn">
                    <button className="btnSubmit" type="button" onClick={btnSubmit} disabled={btnStatus}>GO</button>
                </div>
            </div>
            <div className="TableforBiesection">
               <Table columns={columns} data={data}/>
            </div>
            
            </div>
        </div>
    )

}

export default Secant;