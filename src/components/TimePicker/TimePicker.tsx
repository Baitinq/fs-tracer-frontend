import { DateRangePicker, Provider, defaultTheme } from '@adobe/react-spectrum'
import { useState } from 'react';
import { today, getLocalTimeZone } from '@internationalized/date';


export default function TimePicker() {
	const endTimeframe = today(getLocalTimeZone());
	const [value, setValue] = useState({
		start: endTimeframe.subtract({ days: 7 }),
		end: endTimeframe
	});

	return (
		<>
			<Provider theme={defaultTheme}>
				<DateRangePicker aria-label="timeframe" value={value} onChange={setValue} />
			</Provider>
		</>
	)
}
