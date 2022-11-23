import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
  
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  );
  
  


const LineChart3 = ({labelsX,labelsY,a,b})=>{
    //const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const labels = labelsX; 
    //y = a0 = a1*x   
    //const labels = [10,15,20,25,30,35];    
    //labelsY = [2.2,4.6,4.2,7.0,6.6,9.2]
    let regression = [];
    //a = 0.001904
    //b = 0.25086
    for(let i=0;i<labels.length;i++)
    {
      let temp = a + b*labels[i];
      regression[i] = { x:labels[i],y:temp}
    }
    return(
        <div>

            <Chart type='scatter'
                data = {{
                    labels,
                    datasets: [
                      {
                        label: 'Data',
                        type:'scatter',
                        data: labelsY,
                        borderColor: '#362417',
                        backgroundColor: '#362417',
                        tension:0.1,
                        pointRadius: 5

                    },
                    {
                      type:'line',
                      label: 'g(x)',
                      data: regression,
                      borderColor: '#fc0b0b',
                      backgroundColor: '#fc0b0b',
                      tension:0.1,
                      pointRadius: 5

                  },
                    ],
                  }}
                  
                  
            />

            
            
        </div>

    )


  
}

export default LineChart3;


