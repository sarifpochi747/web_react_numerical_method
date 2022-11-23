import { useEffect, useState } from "react";
import LineChart3 from "./LineChart3";
import Table from 'react-bootstrap/Table';
const { matrix,det,set,get } = require("mathjs");

const LinearRegression = ()=>{
    const [DataA,setDataA] = useState(Array);
    const [DataB,setDataB] = useState(Array);
    const [result,setResult] = useState("")
    const [value,setValue] = useState("")
    const [vec,setVec] = useState([]);
    const vev = []
    let matrixA = matrix([2,2]);
    let matrixB = matrix([2]);
    const createDataTable = (n)=>{
        setDataA(Array.from({length: n},()=>null));
        setDataB(Array.from({length: n},()=>null));

    }

    const handleChangeDataA = (row,event)=>{
        let temp = [...DataA];
        temp[row] = event.target.value
        setDataA(temp);
    }
    const handleChangeDataB = (row,event)=>{
        let temp = [...DataB];
        temp[row] = event.target.value
        setDataB(temp);
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
    
    const calculator = ()=>{
        matrixA.set([0,0],DataA.length);
        let sumpow=0;
        let sumxy=0;
        let sumx=0
        let sumy = 0;
        for(let i=0;i<DataA.length;i++)
        {
            sumx += eval(DataA[i]);
            sumpow += eval(DataA[i])*eval(DataA[i]);
            sumxy += eval(DataA[i])*eval(DataB[i]);
            sumy += eval(DataB[i])
        }
        
        matrixA.set([0,1],sumx);
        matrixA.set([1,0],sumx);
        matrixA.set([1,1],sumpow);
        matrixB.set([0],sumy);
        matrixB.set([1],sumxy);
        console.log(matrixA);
        console.log(matrixB);
        Cramer(matrixA,matrixB);
        let result = vev[0] +vev[1]*eval(value);
        console.log(result);
        setResult(result)
    }

    const btnReset = ()=>{
        let n =0;
        setResult("");
        setDataA(Array.from({length: n},()=>null));
        setDataB(Array.from({length: n},()=>null));
        setValue("")
    }

    return(
        <div>
            <div className="display_input_number">
                <div className="lable-number-data">Input Count Data</div>
                <div className="numberData">
                    <input type={"number"} className="input_number" onChange={e => createDataTable(e.target.value)}   />
                </div>
                <div className="btn-dislpay-set-matrix">
                    <button type="button" className="btn-find"  onClick={calculator}>LinearRegression</button>
                    <button type="button"   className="btn-reset-matrix" onClick={btnReset}>RESET Data</button>
                </div>
            </div>
        <div className="display-Data">
            <div className="DataA">
                <Table className="table-DataA">
                    <tbody className="tbody-DataA">
                        {DataA.map((r,rowIndex)=>{
                            return <tr className="tr-DataA" key={rowIndex}>
                                <td className="td-Data-A">
                                    <input className="input-DataA"
                                        type={"number"}
                                        onChange={e => handleChangeDataA(rowIndex,e)}
                                        />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                </div>
            <div className="DataB">
                <Table className="table-DataB">
                    <tbody className="tbody-DataB">
                        {DataB.map((r,rowIndex)=>{
                            return <tr className="tr-DataB" key={rowIndex}>
                                <td className="td-Data-B">
                                    <input className="input-DataB"
                                        type={"number"}
                                        onChange={e => handleChangeDataB(rowIndex,e)}
                                        />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
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
                    <LineChart3 labelsX={DataA.sort()} labelsY={DataB} a={vec[0]} b={vec[1]}/>
                </div>
                
            </div>
        </div>
    )
}

export default LinearRegression