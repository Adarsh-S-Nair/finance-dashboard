import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    const [data, setData] = useState({
        labels: props.data.map((m) => m.month),
        datasets: [
            {
                label: "Earned",
                data: props.data.map((m) => m.earned),
                borderColor: colors.greenAccent[500],
                backgroundColor: colors.greenAccent[500],
                lineTension: 0.3,
            },
            {
                label: "Spent",
                data: props.data.map((m) => m.spent),
                borderColor: colors.redAccent[500],
                backgroundColor: colors.redAccent[500],
                lineTension: 0.3
            }
        ]
    })

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: "white"
                },
                grid: {
                    display: false
                }
            },
            y: {
                ticks: {
                    color: "white",
                    stepSize: 1000
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false,
                position: "right",
                labels: {
                    color: "white"
                }
            },
            tooltip: {
                backgroundColor: colors.primary[500],
                bodyAlign: "center",
                titleAlign: "center",
                displayColors: false,
                borderWidth: 1,
                borderColor: "white"
            }
        }
    }

    return (
        <Line data={data} height="200px" width="200px" options={options}/>
    )
}

export default LineChart;