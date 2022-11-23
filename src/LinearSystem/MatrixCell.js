import { useEffect, useState } from "react";
import "./matrixcell.css"
import Table from 'react-bootstrap/Table';

const MatrixCell = ({name,dataA,reset})=>{
    const {det, round, zeros,matrix,resize } = require('mathjs')
    const [dimention,setMatrixDimention] = useState("");
    //set matrix 
    const [matrixA, setMatrixA] = useState(Array);
    const [matrixB,setMatrixB] = useState(Array);
    let n;
    const [A, setA] = useState(matrix());
    const [B, setB] = useState(matrix());

    //set status button
    const [btnStatus,setBtnStatus]  = useState(true)

    //set Label
    const [lableA,setLabelA] = useState("")
    const [lableB,setLabelB] = useState("")
    
    
    //handlerChange inputmatrix A
    //set matrix A
    const handleChangeMatrixA = (row,column,event)=>{
        let copyA = matrix(A);
        copyA.set([row,column],event.target.value);
        setA(matrix(copyA));
    }
    const handleChangeMatrixB = (row,event)=>{
        let copyB = matrix(B);
        copyB.set([row],event.target.value);
        setB(matrix(copyB));
    }

    const sendData = ()=>{
        dataA(A,B,matrixB.length);
    }


    // button submit
    const btnSubmit = ()=>{
        setMatrixA()
        setMatrixB()
        setMatrixDimention();
        n = eval(dimention)
        //set dimention matrix
        //setMatrixDimention("")
        //set matrix a and b
        setMatrixA(Array.from({length: n},()=> Array.from({length: n}, () => null)));
        setMatrixB(Array.from({length: n},()=>null));
        
        setLabelA("MATRIX A")
        setLabelB("MATRIX B")
        setA(A.resize([n,n]));
        setB(B.resize([n]));

    }

    // button reset
    const btnReset = ()=>{
        n=0;
        setMatrixDimention("");
        setMatrixB(Array.from({length: n},()=>null));
        setMatrixA(Array.from({length: n},()=> Array.from({length: n}, () => null)));
        setLabelA("");
        setLabelB("");
        setA(matrix())
        setB(matrix())
        reset(Array.from({length: n},()=>null));
    }
    


    return(
        <div>
            <div className="input-display-matrix">
                <label className="label-input-dimension">
                    Matrix dimension:
                    <input type={"number"} className="input-dimention" name="dimention"  value={dimention}  onChange={event=>setMatrixDimention(event.target.value)} />
                </label>
                <div className="btn-dislpay-set-matrix">
                    <button type="button"   className="btn-set-matrix" onClick={btnSubmit}>submit MATRIX</button>
                    <button type="button"   className="btn-reset-matrix" onClick={btnReset}>RESET MATRIX</button>
                    <button type="button" className="btn-find"   onClick={sendData}>{name}</button>

                </div>
            </div>
            {/* Matrix cell */}
            <div className="display-matrix-cell">
                {/* Table Matrix A */}
                <div className="MatrixA">{lableA}
                <Table className="table-matrixA"> 
                    <tbody className="tbody-matrixA">
                        {matrixA.map((r,rowIndex)=>{
                            return <tr className="tr-matrixA" key={rowIndex}>
                                {r.map((c,columnIndex)=>{
                                    return <td className="td-matrixA" key={columnIndex}>
                                        <input className="input-matrixA"
                                        type="number"
                                        onChange ={e => handleChangeMatrixA(rowIndex, columnIndex, e)}
                                        />
                                    </td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </Table>
                </div>


                {/*Table Matrix B */}
                <div className="MatrixB">{lableB}
                <Table className="table-matrixB">
                    <tbody className="tbody-matrixB">
                        {matrixB.map((r,rowIndex)=>{
                            return <tr className="tr-matrixB" key={rowIndex}>
                                <td className="td-matrix-b">
                                    <input className="input-matrixB"
                                        type={"number"}
                                        onChange={e=> handleChangeMatrixB(rowIndex,e)}
                                        />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                </div>
            </div>
        </div>
    )
    
}

export default MatrixCell;