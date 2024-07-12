import { useNavigate, useParams } from "react-router-dom"
import SideBar from "../components/Sidebar/Sidebar"
import { useCallback, useEffect, useState } from "react";
import { FSTracerFile } from "../lib/types";

export default function File(props: any) {
  const navigate = useNavigate()
  let { filepath } = useParams();

  console.log("FILEPATH: ", filepath)

  const [files, setFiles] = useState([])

  const latestFile = files[0] as FSTracerFile | undefined

  useEffect(() => {
    if (!props.session) {
      navigate('/login')
    }
  }, [props.session])

  const fetchFiles = useCallback(async () => {
    console.log("FETCHIN FILES")
    const { data, error } = await props.supabase
      .from('file')
      .select()
      .eq('absolute_path', filepath)
      .order('timestamp', { ascending: false })
      .range(0, 20)
    if (error) {
      console.error(error)
      return
    }
    console.log("RAW FILES: ", data)
    setFiles(data.map((file: any) => {
      return file as File
    }))
    console.log("FETCHED FILES")
  }, [props.supabase])

  useEffect(() => {
    fetchFiles()
  }, [])

  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 overflow-y-auto my-4">
          <div className="flex flex-col items-center">
            {filepath}
          </div>
          <div className="mt-5 flex flex-col items-center">
            {latestFile && <FileInfo file={latestFile} />
            }
          </div>
          <div className="mt-5 flex flex-col items-center">
            {files.map((file: FSTracerFile) => (
              <div key={file.id}>
                <p>{file.absolute_path} - {file.timestamp}</p>
              </div>
            ))
            }
          </div>
        </main>
      </div>
    </>
  )
}

interface FileInfoProps {
  file: FSTracerFile
}

function FileInfo(props: FileInfoProps) {
  return (
    <>
      <p>Absolute path: {props.file.absolute_path}</p>
      <p>Timestamp: {props.file.timestamp}</p>
      <p>Content: {props.file.contents}</p>
      <p>ID: {props.file.id}</p>
    </>
  )
}
