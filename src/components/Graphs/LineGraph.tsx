import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
} from 'chart.js';
import 'chart.js/auto';
import { format } from 'date-fns'

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import NoData from '../Other/NoData';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip
);

export default function LineGraph(props: any) {
	const options = {
		responsive: true,
		scales: {
			x: {
				grid: {
					display: false
				}
			},
			y: {
				min: 0,
				ticks: {
					stepSize: 1,
					callback: function(value: any, _index: any, _ticks: any) {
						return value + "wps";
					},
				},
				grid: {
					display: false
				}
			},
		}
	};

	const [data, setData] = useState({
		labels: [],
		datasets: []
	});

	useEffect(() => {
		const fetchData = async () => {
			const timeframeEnd = props.timeframe.end.toDate();
			const timeframeStart = props.timeframe.start.toDate();
			timeframeStart.setHours(timeframeStart.getHours() - 12)
			const numDatapoints = 12;

			const { data: rawData } = await props.supabase
				.from('file')
				.select('timestamp').gte('timestamp', timeframeStart.toISOString()).lte('timestamp', timeframeEnd.toISOString());
			console.log(rawData)

			if (rawData.length === 0) {
				return;
			}

			const startDate = new Date(timeframeStart);
			const endDate = new Date(timeframeEnd);

			const intervalDuration = (+endDate - +startDate) / numDatapoints;

			let labels = Array(numDatapoints).fill("");
			let points = Array(numDatapoints).fill(0);
			for (let i = 0; i < numDatapoints; i++) {
				const intervalStart = new Date(startDate.getTime() + i * intervalDuration);
				const intervalEnd = new Date(startDate.getTime() + (i + 1) * intervalDuration);

				// Format the interval start and end as strings for labeling
				labels[i] = format(intervalEnd, 'MM/dd - HH:mm');

				// Count the number of entries within the current interval
				points[i] = rawData.filter((entry: any) => {
					const entryDate = new Date(entry.timestamp);
					return entryDate >= intervalStart && entryDate < intervalEnd;
				}).length;
			}

			console.log("LABELS", labels)
			console.log("POINTS", points)

			setData({
				labels: labels as any,
				datasets: [{
					label: 'Dataset',
					data: points,
					borderColor: 'rgb(53, 162, 235)',
					backgroundColor: 'rgba(53, 162, 235, 0.5)',
				} as never]
			})
		}
		fetchData()
	}, [props.timeframe])

	return (
		<div>
			<p className="text-center">{props.name}</p>
			{data.datasets.length > 0 ?
				<Line data={data} options={options} />
				:
				<NoData />}
		</div>
	)
}
