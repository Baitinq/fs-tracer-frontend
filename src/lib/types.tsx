export type FSTracerFile = {
  id: number;
  user_id: string;
  absolute_path: string;
  contents: string;
  timestamp: string;
}

interface FileComponentProps {
  file: FSTracerFile
}

export default function FileComponent(props: FileComponentProps) {
  return (
    <p className="underline">file: {props.file.absolute_path}</p>
  )
}
