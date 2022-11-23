import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  


const LineChart2 = ({labelsX,labelsY})=>{
    //const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = labelsX;    
    return(
        <div>

            <Line
                data = {{
                    labels,
                    datasets: [
                      {
                        label: 'fx',
                        data: labelsY,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        tension:0.1,
                    }
                    ],
                  }}
                  
                  options = {{
                    responsive: true,
                    plugins: {
                      legend: {
                        position : 'bottom',
                      },
                      title: {
                        display: true,
                        text: 'Larange Interpolation',
                      },
                    },
                    scales:{
                        x:{
                            title:{
                                display:true,
                                text: "x",
                                font:{size: 25 }
                            }
                        },
                        y:{
                            title:{
                                display:true,
                                text: "y=f(x)",
                                font:{size: 25 }
                            }
                        }
                    }
                  }}
            />
        </div>

    )


  
}

export default LineChart2;