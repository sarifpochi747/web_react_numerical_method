import {Line,LineChart,XAxis,YAxis,CartesianGrid} from "recharts"

const LineChart1 = ({data})=>{





    return(
        <>
            <LineChart  width={600} height = {300}  data={data}> 
                <Line type = "monotone" dataKey="xm" stroke="#21963F" strokeWidth={3}  />
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="No"/>
            </LineChart>
        </>
    )
}

export default LineChart1;