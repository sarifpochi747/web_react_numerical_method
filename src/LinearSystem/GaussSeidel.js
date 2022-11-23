import { useEffect,useMemo, useState } from "react";
import './LinearSystem.css';
import MatrixCellJacobi from "./MatrixCellJacobi";


const GaussSeidel = ()=>{
    const {det, round, zeros,matrix,size,set,get } = require('mathjs');
    const [dataObject,setDataObject] = useState([]);
    const [dataArr,setDataArr] = useState([]);
    //attribute
    let count = 0;
    let error;
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

    //checking Error
    const CheckError = (x_old,x_new)=>{
        return Math.abs((x_new.get([0]) - x_old)/x_new.get([0]));
    }

    //function claculator
    const calculator_Seadel = (a,b,x,size,n)=>{
        let sum = b.get([n]);
        for(let i=0; i<size; i++)
        {
            if(i!=n)
            {
                sum = sum -  a.get([n,i])*x.get([i]);
            }
        }
        return sum/a.get([n,n]);    
    }

    //getMatrix from matrixCell Jacobi by send function getMatrix
    const getMatrix = (matrixA,matrixB,matrixX,n)=>{
        let a = matrix(matrixA);
        let b = matrix(matrixB);
        let x = matrix(matrixX);
        setDataObject([]);
        do {
            let x_old = x.get([0]);
            for(let i=0;i<n;i++)
            {
                x.set([i],calculator_Seadel(a,b,x,n,i)) ;
                
            }
            count ++;
            error = CheckError(x_old,x);



            //set data to array to object to state
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
        <div className="GaussSeidel">
            <MatrixCellJacobi name={"Gauss Seidel Find"} dataA={getMatrix} reset={setDataArr}/>
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

export default GaussSeidel

