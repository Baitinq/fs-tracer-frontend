import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
} from 'chart.js';
import 'chart.js/auto';

import { useEffect, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';

import * as ss from 'simple-statistics';
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

			const { data: rawData } = await props.supabase
				.from('file')
				.select('contents').gte('timestamp', timeframeStart.toISOString()).lte('timestamp', timeframeEnd.toISOString());
			console.log("RAWDATA", rawData)

			if (rawData.length === 0) {
				return;
			}

			let sortedLengths = rawData.map((element: any) => element.contents.length).sort((a: any, b: any) => a - b);
			console.log("TOP LENGTHS", sortedLengths)
			let p25Value = ss.quantileSorted(sortedLengths, 0.25);
			let p50Value = ss.quantileSorted(sortedLengths, 0.50);
			let p75Value = ss.quantileSorted(sortedLengths, 0.75);
			let p100Value = ss.quantileSorted(sortedLengths, 1.00);
			console.log("p25: ", p25Value)
			console.log("p50: ", p50Value)
			console.log("p75: ", p75Value)
			console.log("p100: ", p100Value)

			setData({
				labels: ['p25', 'p50', 'p75', 'p100'] as any,
				datasets: [{
					data: [p25Value, p50Value, p75Value, p100Value]
				} as never]
			})
		}
		fetchData()
	}, [props.timeframe]);

	console.log("length: aaa", data.datasets.length)

	return (
		<div className="flex-grow flex-1">
			<p className="text-center">{props.name}</p>
			{data.datasets.length > 0 ?
				<PolarArea data={data} options={options} />
				:
				<NoData />}
		</div>
	)
}
