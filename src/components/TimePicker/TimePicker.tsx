import { DateRangePicker } from '@adobe/react-spectrum'

export default function TimePicker(props: any) {

	return (
		<>
			<DateRangePicker aria-label="timeframe" value={props.timeframe} onChange={props.setTimeframe} />
		</>
	)
}
