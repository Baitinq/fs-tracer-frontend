import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip
);

export default function LineGraph() {
	const options = {
		responsive: true,
		scales: {
			x: {
				grid: {
					display: false
				}
			},
			y: {
				ticks: {
					callback: function(value: any, _index: any, _ticks: any) {
						return value + "wps";
					}
				},
				grid: {
					display: false
				}
			},
		}
	};

	const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

	const data = {
		labels,
		datasets: [
			{
				label: 'Dataset 1',
				data: labels.map(() => Math.random() * 1000),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
			{
				label: 'Dataset 2',
				data: labels.map(() => Math.random() * 1000),
				borderColor: 'rgb(53, 162, 235)',
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
			},
		],
	};

	return (
		<div>
			<p className="text-center">File writes per second</p>
			<Line data={data} options={options} />
		</div>
	)
}
