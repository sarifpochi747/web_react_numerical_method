import { useState,useEffect, useMemo } from "react"
import Table from "../Table";
import "./rootequations.css"

const Newton = ()=>{
    const {evaluate,derivative } = require('mathjs')
    let xs;
    let xs_new;
    let f_x;
    let difff_x;
    let i=0;
    let error;
    let er = 0.0001;
    const [fx,setFx] =useState("");
    const [inputx,setInputx] =useState("");
    const [btnStatus,setBtnStatus] =useState(true);
    const [data,setData] = useState([]);
    const calculatorfx = (x)=>{
        return evaluate(fx,{x})
    }
    const calculatordifffx = (x)=>{
        return derivative(fx,'x').evaluate({x});
    }

    const setUseState = (i,xs,xs_new,f_x,difff_x,error)=>{

        const initData = {
            No:i,
            xs:xs,
            fx:f_x,
            derivative: difff_x,
            xs_new:xs_new,
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

            f_x = calculatorfx(xs);
            difff_x = calculatordifffx(xs);
            xs_new = xs - (f_x/difff_x);
            error = Math.abs(f_x/difff_x)
            setUseState(i,xs.toFixed(6),xs_new.toFixed(6),f_x.toFixed(6),difff_x.toFixed(6),error.toFixed(6));
            xs = xs_new;
            i++;
            //testcase
            /* e^(-x/4)*(2-x)-1 */
        } while (error > er);
        setUseState(i,xs.toFixed(6),xs_new.toFixed(6),f_x.toFixed(6),difff_x.toFixed(6),error.toFixed(6));
        setInputx("");
        setFx("");
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
            Header: "f(x)",
            accessor: "fx"
        },
        {
            Header: "f'(x)",
            accessor: "derivative"
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
                <div className="input-fx-display">f(x)</div>
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

export default Newton;