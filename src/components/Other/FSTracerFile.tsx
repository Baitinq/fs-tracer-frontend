import { FSTracerFile } from "../../lib/types"

interface FileComponentProps {
	file: FSTracerFile
}

export default function FileComponent(props: FileComponentProps) {
	return (
		<a href={`/file/${encodeURIComponent(props.file.id)}`}>
			<p className="underline">file: {props.file.absolute_path}</p>
		</a>
	)
}
