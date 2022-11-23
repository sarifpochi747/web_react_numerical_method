import { useEffect,useMemo, useState } from "react";
import './LinearSystem.css';
import MatrixCellJacobi from "./MatrixCellJacobi";
const Jacobi = ()=>{
    const {det, round, zeros,matrix,size,set,get } = require('mathjs');
    const [dataObject,setDataObject] = useState([]);
    const [dataArr,setDataArr] = useState([]);
    //attribute
    let x_new;
    let count = 0;
    let error = 0;
    let cov = 0.0001;
    let temp = new Array();
    //set data
    const setUseState = (initData)=>{

        //chang array to object
        let object = Object.assign({}, initData);
        setDataObject(prevData =>{
            return [...prevData,object];
        })
    }
    //function claculator
    const calculator_jacobi = (a,b,x,size,n)=>{
        let sum = b.get([n]);
        for(let i=0; i<size; i++)
        {
            if(i!=n)
            {
                sum = sum -  a.get([n,i])*x.get([i]);
            }
        }
        x_new.set([n],sum/a.get([n,n]));    
    }

    //getMatrix from matrixCell Jacobi by send function getMatrix
    const getMatrix = (matrixA,matrixB,matrixX,n)=>{
        let a = matrix(matrixA);
        let b = matrix(matrixB);
        let x = matrix(matrixX);
        setDataObject([]);
        x_new = matrix([n]);
        do {
            for(let i=0;i<n;i++)
            {
                calculator_jacobi(a,b,x,n,i);
            }
            count ++;
            error = Math.abs((x_new.get([0]) - x.get([0]))/x_new.get([0]));
            x = matrix(x_new);
            for(let i=0;i<n;i++)
            {
                temp[i] = x.get([i]).toFixed(6);
            }
            //temp[n] = error.toFixed(6);
            setUseState(temp);
        } while (error > cov);
        for(let i=0;i<n;i++)
        {
            temp[i] = x.get([i]).toFixed(6);
        }
        setDataArr(temp);
    }
    
    



    return(
        <div className="Jacobi">
            <MatrixCellJacobi name={"Jacobi Find"} dataA={getMatrix} reset={setDataArr}/>
            <div className="display-vecx">
                <div className="display-show-vecx">
                    {dataArr.map((x,i)=>{
                        return <div className="result-x" key={i}>x{i+1}: {x}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Jacobi

