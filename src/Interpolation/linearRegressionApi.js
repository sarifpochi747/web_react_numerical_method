import { useEffect, useState } from "react";
import LineChart4 from "./LineChart4";
import Table from 'react-bootstrap/Table';
const { matrix,det,set,get } = require("mathjs");


const LinearRegressionAPI = ()=>{
    const [data,setData]= useState([]);
    const [labesX,setLabesX]= useState([]);
    const [labesY,setLabesY]= useState([]);
    let x = []
    let y = []
    const [result,setResult] = useState("")
    const [value,setValue] = useState("")
    const [vec,setVec] = useState([]);
    const vev = []
    let matrixA = matrix([2,2]);
    let matrixB = matrix([2]);
    const API_URL = "https://mocki.io/v1/3224c50e-7ceb-4264-81a0-22053fff3089"
    const getUsers = async()=>{
        const response = await fetch(API_URL);
        const test =  await response.json();
        setData(test)
    }
    const Cramer = (matrixA,matrixB)=>{
        let a = matrix(matrixA);
        let b = matrix(matrixB);
        let detA = det(matrix(matrixA));
        let n = 2;
        for(let i=0;i<n;i++)
        {
            for(let j=0;j<n;j++)
            {
                a.set([j,i],b.get([j]));
            }
            vev[i] = (det(a)/detA);
            a = matrix(matrixA);
        }
        setVec(vev)
    }
    const calculator =()=>{
        let n = data.length
        for(let i=0;i<n;i++)
        {
            x[i] = data[i].TV
            y[i] = data[i].Sales
        }
        matrixA.set([0,0],n);
        let sumpow=0;
        let sumxy=0;
        let sumx=0
        let sumy = 0;
        for(let i=0;i<n;i++)
        {
            sumx += x[i];
            sumpow += x[i]*x[i];
            sumxy += x[i]*y[i]
            sumy += y[i]
        }
        
        matrixA.set([0,1],sumx);
        matrixA.set([1,0],sumx);
        matrixA.set([1,1],sumpow);
        matrixB.set([0],sumy);
        matrixB.set([1],sumxy);
        console.log(matrixA);
        console.log(matrixB);
        Cramer(matrixA,matrixB);
        setLabesX(x);
        setLabesY(y);
        let result = vev[0] +vev[1]*eval(value);
        console.log(result);
        setResult(result)
    }
    
    const btnReset = ()=>{
        setValue("");
        setResult("");
        setLabesX([]);
        setLabesY([]);
    }

    useEffect(()=>{
        getUsers();
    },[])
    return(
        <div>
            <div className="display_input_number">
                
                <div className="btn-dislpay-set-matrix">
                    <button type="button" className="btn-find"  onClick={calculator}>LinearRegressionAPI</button>
                    <button type="button"   className="btn-reset-matrix" onClick={btnReset}>RESET DATA</button>
                </div>
            </div>
            <div className="display-input-value">
                <div className="label-value">Input Value</div>
                <input className="input-value" type={"number"} value={value} onChange={e =>
                        setValue(e.target.value)
                        }/>
            </div>
            <div className="display-result">
                <div className="result">
                    <h4>g({value}) : <span>{result}</span></h4>
                </div>
                <div className="LineChart">
                    <LineChart4 labelsX={labesX.sort()} labelsY={labesY} a={vec[0]} b={vec[1]}/>
                </div>
                
            </div>
        </div>
    )
}

export default LinearRegressionAPI