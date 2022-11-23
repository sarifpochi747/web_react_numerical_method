import { useState,useEffect,useMemo } from 'react';
import "./rootequations.css"
import Table from '../Table';

const FalsePosition = ()=>{
    const {evaluate } = require('mathjs')
    const [fx,setFx] = useState("");
    const [inputxr,setInputxr] = useState("");
    const [inputxl,setInputxl] = useState("");
    const [data,setData] = useState([]);
    const [btnStatus,setBtnStatus] = useState(true)
    let er = 0.0001;
    let error = 0;
    let xr;
    let xl;
    let xf;
    let xs;
    let xs_old;
    let f_xr;
    let f_xl;
    let f_xf;
    let i=0;
    
    const calculator = (x)=>{ 
        return evaluate(fx,{x});
    }
    
    const setUseState =(i,xl,xr,xf,xs,f_xl,f_xr,f_xf,error)=>{
        
        const initData = {
            No:i,
            xl:xl,
            fxl:f_xl,
            xr:xr,
            fxr:f_xr,
            xf:xf,
            fxf:f_xf,
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
                xf = (xl*f_xr - xr*f_xl)/(f_xr - f_xl)
                f_xf = calculator(xf);
                setUseState(i,xl.toFixed(6),xr.toFixed(6),xf.toFixed(6),xs_old.toFixed(6),f_xl.toFixed(6),f_xr.toFixed(6),f_xf.toFixed(6),error.toFixed(6));
                if(f_xr * f_xf > 0)
                {
                    xr=xf;
                    xs=xf;
                }
                else if(f_xr * f_xf < 0)
                {
                    xl=xf;
                    xs = xf;
                }
                else{
                    xs= xf;
                    break;
                }
                error = Math.abs((xs - xs_old)/xs)
                i++
                xs_old = xs;
            }while(error > er)
           setUseState(i,xl.toFixed(6),xr.toFixed(6),xf.toFixed(6),xs_old.toFixed(6),f_xl.toFixed(6),f_xr.toFixed(6),f_xf.toFixed(6),error.toFixed(6));
            
            
        }
        setFx("");
        setInputxr("")
        setInputxl("")
    }

    //setColumn
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
            Header: "xf",
            accessor: "xf"
        },
        {
            Header: "f(xf)",
            accessor: "fxf"
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
    //setStatusbutton
    useEffect(()=>{
        if(fx.length > 0 && inputxr.length > 0 && inputxl.length > 0)
        {
            setBtnStatus(false);
        }
        else
        {
            setBtnStatus(true);
        }
    },[fx,inputxr,inputxl])
    
    
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
        </div>
    )
}

export default FalsePosition; 