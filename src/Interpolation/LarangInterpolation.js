import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "./Interpolation.css"
import {Line} from "react-chartjs-2"
import LineChart2 from "./LineChart2";



const LarangInterpolation = ()=>{

    
    const [DataA,setDataA] = useState(Array);
    const [DataB,setDataB] = useState(Array);
    const [data,setData] = useState([]);
    const [result,setResult] = useState("")
    const [value,setValue] = useState("")
    let labelsX = [];
    const createDataTable = (n)=>{
        setDataA(Array.from({length: n},()=>null));
        setDataB(Array.from({length: n},()=>null));

    }
    const setObject = (xnew,ynew)=>{


        const initData = {
            x:xnew,
            y:ynew
        }

        setData(prev =>{
            return [...prev,initData];
        })
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

    const L = (v,num)=>{
        let temp1 = 1;
        let temp2 = 1;
        for(let i=0;i<DataA.length;i++)
        {
            if(i != num)
            {
                temp1 *=  (eval(DataA[i])-v)
                temp2 *=  (eval(DataA[i])-eval(DataA[num]));
            }
        }

        return temp1/temp2;


    }
    const calculator = ()=>{
        let result = 0;
        setData([]);

        for(let i=0;i<DataA.length;i++)
        {
            setObject(DataA[i],DataB[i])
            result += eval(DataB[i])*L(value,i);
        }

        setResult(result)
        console.log(result);

    }

    const btnReset = ()=>{
        let n =0;
        setResult("");
        setDataA(Array.from({length: n},()=>null));
        setDataB(Array.from({length: n},()=>null));
        setData([]);
        setValue("")
    }

    return (


        <div>
            <div className="display_input_number">
                <div className="lable-number-data">Input Count Data</div>
                <div className="numberData">
                    <input type={"number"} className="input_number" onChange={e => createDataTable(e.target.value)}   />
                </div>
                <div className="btn-dislpay-set-matrix">
                    <button type="button" className="btn-find"  onClick={calculator}>LarangInterpolation</button>
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
                    <h4>f({value}) : <span>{result}</span></h4>
                </div>
                <div className="LineChart">
                    <LineChart2 labelsX={DataA.sort()} labelsY={DataB}/>
                </div>
            </div>
        </div>
    )
}

export default LarangInterpolation;