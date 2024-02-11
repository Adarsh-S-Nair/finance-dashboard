import { useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = (props) => {
    console.log(props.data);
    const [data, setData] = useState({
        labels: props.data.map((c) => c.category),
        datasets: [{
            label: "",
            data: props.data.map((c) => c.spent),
            backgroundColor: [
                '#EE4266',
                '#3CBBB1',
                '#00FFF5',
                "#FF8360",
                "#9B1D20"
            ],
            borderWidth: 1
        }]
    })

    return (
        <Doughnut data={data} height="200px" width="200px" options={{
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    position: "right"
                }
            }
        }}/>
    )
}

export default PieChart;