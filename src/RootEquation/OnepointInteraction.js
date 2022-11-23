import { useState,useMemo,useEffect } from "react";
import Table from "../Table";
import "./rootequations.css"

const OnePointInteraction = ()=>{
    const {evaluate, } = require('mathjs')
    let xs;
    let error=0;
    let xs_new=0;
    let i=0
    let er = 0.0001;
    const [fx,setFx] =useState("");
    const [inputx,setInputx] =useState("");
    const [btnStatus,setBtnStatus] =useState();
    const [data,setData] = useState([]);
    
    const calculator = (x)=>{ 
        return evaluate(fx,{x});
    }

    const setUseState =(i,f_x,xs,error)=>{
        
        const initData = {
            No:i,
            fx:f_x,
            xs:xs,
            Error:error
        }
        setData(prevData =>{
            return [...prevData,initData]
        })
    }

    const btnSubmit = ()=>{
        setData([]);
        xs = eval(inputx);
        do {
            xs_new = calculator(xs);
            setUseState(i,xs_new.toFixed(6),xs.toFixed(6),error.toFixed(6));
            error = Math.abs((xs_new -xs)/xs_new)
            xs = xs_new;
            i++;
            
        } while (error > er);
        setUseState(i,xs_new.toFixed(6),xs.toFixed(6),error.toFixed(6));
        setFx("");
        setInputx("")
    }

    //column
    const columns = useMemo(()=>[
        {
            Header: "No",
            accessor: "No"
        },
        {
            Header: "g(x)",
            accessor: "fx"
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
    
    //button status
    useEffect(()=>{
        if(fx.length >0 && inputx.length >0)
        {
            setBtnStatus(false)
        }
        else
        {
            setBtnStatus(true);
        }
    },[inputx,fx])

    return(
        <div className="container-fluid">
            <div className="FormBisection">
                <div className="input-display">
                {/* input function  */}
                <div className="input-fx-display">g(x)</div>
                <input className="input-fx" type={"text"} value={fx} onChange={(event)=>{
                    setFx(event.target.value)}}/>
                {/* input x  */}
                <div className="input-x-display">x</div>
                <input className="input-x" type={"text"} value={inputx} onChange={(event)=>{
                    setInputx(event.target.value);
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

export default OnePointInteraction;