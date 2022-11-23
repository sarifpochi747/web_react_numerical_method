import { useState,useEffect, useMemo } from "react"
import Table from "../Table";
import "./rootequations.css";
import LineChart1 from "../LineChart1";

const Bisection= ()=>{
    
    const {evaluate, round } = require('mathjs')
    const [fx,setFx] = useState("");
    const [inputxr,setInputxr] = useState("");
    const [inputxl,setInputxl] = useState("");
    const [data,setData] = useState([]);
    const [btnStatus,setBtnStatus] = useState(true)
    let er = 0.0001;
    let error = 0;
    let xr;
    let xl;
    let xm;
    let xs;
    let xs_old;
    let f_xr;
    let f_xl;
    let f_xm;
    let i=0;
    

    const calculator = (x)=>{ 
        return evaluate(fx,{x});
    }
    
    const setUseState =(i,xl,xr,xm,xs,f_xl,f_xr,f_xm,error)=>{
        
        const initData = {
            No:i,
            xl:xl,
            fxl:f_xl,
            xr:xr,
            fxr:f_xr,
            xm:xm,
            fxm:f_xm,
            xs:xs,
            Error:error
        }
        setData(prevData =>{
            return [...prevData,initData]
        })
    }

    const btnSubmit = ()=>{
        setData([]);
        xr = eval(inputxr)
        xl = eval(inputxl)
        f_xr = calculator(xr);
        f_xl = calculator(xl);
        xs_old = xr;
        if(f_xl * f_xr < 0)
        {
            do
            {
                f_xr = calculator(xr);
                f_xl = calculator(xl);
                xm = (xr+xl)/2
                f_xm = calculator(xm);
                setUseState(i,xl.toFixed(6),xr.toFixed(6),xm.toFixed(6),xs_old.toFixed(6),f_xl.toFixed(6),f_xr.toFixed(6),f_xm.toFixed(6),error.toFixed(6));
                if(f_xr * f_xm > 0)
                {
                    xr=xm;
                    xs=xm;
                }
                else if(f_xr * f_xm < 0)
                {
                    xl=xm;
                    xs = xm;
                }
                else{
                    xs= xm;
                    break;
                }
                error = Math.abs((xs - xs_old)/xs)
                i++
                xs_old = xs;
            }while(error > er)
           setUseState(i,xl.toFixed(6),xr.toFixed(6),xm.toFixed(6),xs_old.toFixed(6),f_xl.toFixed(6),f_xr.toFixed(6),f_xm.toFixed(6),error.toFixed(6));
            
            
        }
        setFx("");
        setInputxr("")
        setInputxl("")
    }
    //head table
    const columns = useMemo(()=>[
        {
            Header: "No",
            accessor: "No"
        },
        {
            Header: "xl",
            accessor: "xl"
        },
        {
            Header: "f(xl)",
            accessor: "fxl"
        },
        {
            Header: "xr",
            accessor: "xr"
        },
        {
            Header: "f(xr)",
            accessor: "fxr"
        },
        {
            Header: "xm",
            accessor: "xm"
        },
        {
            Header: "f(xm)",
            accessor: "fxm"
        },
        {
            Header: "xs(root)",
            accessor: "xs"
        },
        {
            Header: "Error",
            accessor: "Error"
        },
    ])
    // button status
    useEffect(()=>{
        if(fx.length > 0 && inputxr.length > 0 && inputxl.length > 0 )
        {
            setBtnStatus(false)
        }
        else
        {
            setBtnStatus(true)
        }
    },[fx,inputxl,inputxr])

    return(
        <div className="container-fluid">
            <div className="FormBisection">
                <div className="input-display">
                {/* input function  */}
                <div className="input-fx-display">F(X)</div>
                <input className="input-fx" type={"text"} value={fx} onChange={(event)=>{
                    setFx(event.target.value)}}/>
                {/* input xl  */}
                <div className="input-xl-display">XL</div>
                <input className="input-xl" type={"text"} value={inputxl} onChange={(event)=>{
                    setInputxl(event.target.value);
                }}/>
                {/* input xr  */}
                <div className="input-xr-display">XR</div>
                <input className="input-xr" type={"text"} value={inputxr} onChange={(event)=>{
                    setInputxr(event.target.value)
                }} />
                </div>
                <div className="btn">
                    <button className="btnSubmit" type="button" onClick={btnSubmit} disabled={btnStatus}>GO</button>
                </div>
            </div>
            <div className="TableforBiesection">
                <Table columns={columns} data={data}/>
            </div>
            <div className="LineChart">
                <LineChart1 data={data}/>
            </div>
            
        </div>
    )
}

export default Bisection