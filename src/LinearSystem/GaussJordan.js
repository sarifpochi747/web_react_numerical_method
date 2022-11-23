import { useEffect, useState } from "react";
import MatrixCell from "./MatrixCell";
import './LinearSystem.css';


const GaussJordan = ()=>{
    const {det, round, zeros,matrix,size,set,get } = require('mathjs');
    const [vectorX,setVecX] = useState([]);
    let arrayX = new Array();
    const getMatrix = (matrixA,matrixB,n)=>{
        //setvacter X
        let a = matrix(matrixA);
        let b = matrix(matrixB);
        

        //! Elimination
        for(let i=0;i<n-1;i++)
        {
            for(let j=i+1;j<n;j++)
            {
                let target = a.get([j,i]) / a.get([i,i]);
                for(let c=i;c<n;c++)
                {
                    let temp = a.get([j,c]) - a.get([i,c])*target;
                    a.set([j,c],temp);
                }
                let temp = b.get([j]) - b.get([i])*target;
                b.set([j],temp);
            }
        }

        //! back substitution
        arrayX[n-1] = (b.get([n-1])/a.get([n-1,n-1])).toFixed(6);
        for(let i=n-2;i>=0;i--)
        {
            let sum=0;
            for(let j=i+1;j<n;j++)
            {
                sum += a.get([i,j])*arrayX[j];
            }
            arrayX[i] = (( b.get([i]) - sum )/ a.get([i,i])).toFixed(6);
        }
        setVecX(arrayX);
    }
    return(
        <div className="Gauss-jordan-display">
            <MatrixCell name={"Gauss Jordan Find"}  dataA={getMatrix} reset={setVecX}/>
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

export default GaussJordan;