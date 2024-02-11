import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const [data, setData] = useState({
        labels: props.data.map((c) => c.category),
        datasets: [{
            label: "",
            data: props.data.map((c) => c.spent),
            backgroundColor: [
                "#1b5542",
                "#236d55",
                "#2a8568",
                "#329d7b",
                "#3ab58d",
                "#4ac59d",
                "#62cdaa",
                "#7ad5b7",
                "#92dcc4",
                "#aae4d1"
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