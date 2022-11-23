import { useEffect, useState } from "react";
import MatrixCell from "./MatrixCell";
import './LinearSystem.css';

const Cramer = ()=>{
    const {det, round, zeros,matrix,size,set,get } = require('mathjs');
    const [vectorX,setVecX] = useState([]);
    let arrayX = new Array();
    const getMatrix = (matrixA,matrixB,n)=>{
        //setvacter X
        //setVecX(Array.from({length: n},()=>null));
        let a = matrix(matrixA);
        let b = matrix(matrixB);
        let detA = det(matrix(matrixA));
        for(let i=0;i<n;i++)
        {
            for(let j=0;j<n;j++)
            {
                a.set([j,i],b.get([j]));
            }
            arrayX[i] = (det(a)/detA).toFixed(6);
            a = matrix(matrixA);
        }
        setVecX(arrayX);
    }

    return(
        <div className="Cramer-Display">
            <MatrixCell name={"Cramer Find"} dataA={getMatrix} reset={setVecX}/>
            <div className="display-vecx">
                <div className="display-show-vecx">
                    {vectorX.map((x,i)=>{
                        return <div className="result-x" key={i}>x{i+1}: {x}</div>
                    })}
                </div>
            </div>
        </div>
    )
}


export default Cramer;