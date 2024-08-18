import { useNavigate, useParams } from "react-router-dom"
import SideBar from "../components/Sidebar/Sidebar"
import { useCallback, useEffect, useState } from "react";
import { FSTracerFile } from "../lib/types";

export default function File(props: any) {
  const navigate = useNavigate()
  let { fileID } = useParams();

  console.log("FILEID: ", fileID)

  const [files, setFiles] = useState([])
  const [file, setFile] = useState<FSTracerFile>()

  const maxFilesToShow = 20;

  useEffect(() => {
    if (!props.session) {
      navigate('/login')
    }
  }, [props.session])

  const fetchFiles = useCallback(async () => {
    console.log("FETCHING FILE")
    const { data: data1, error: err1 } = await props.supabase
      .from('file')
      .select()
      .eq('id', fileID)
    if (err1) {
      console.error(err1)
      return
    }

    if (data1.length === 0) {
      return
    }

    let fetchedFile = data1[0] as FSTracerFile;
    setFile(fetchedFile)

    console.log("FETCHIN FILES", JSON.stringify(fetchedFile))
    const { data: data2, error: err2 } = await props.supabase
      .from('file')
      .select()
      .eq('absolute_path', fetchedFile.absolute_path)
      .order('timestamp', { ascending: false })
      .range(0, maxFilesToShow)
    if (err2) {
      console.error(err2)
      return
    }
    console.log("RAW FILES: ", data2)
    setFiles(data2.map((file: any) => {
      return file as File
    }))
    console.log("FETCHED FILES")
  }, [props.supabase])

  useEffect(() => {
    fetchFiles()
  }, [props.supabase])

  const formatFilePathAsName = (filepath: string) => {
    const parts = filepath.split('/')
    return parts[parts.length - 1]
  }

  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 overflow-y-auto my-4">
          {fileID && file !== undefined ? <>
            <div className="flex flex-col items-center">
              {
                formatFilePathAsName(file.absolute_path)
              }
            </div>
            <div className="mt-5 flex flex-col items-center">
              <div className="block border rounded shadowpy-5 px-5 bg-blue">
                <FileInfo file={file} />
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center">
              <div className="block border rounded shadow py-5 px-5 bg-blue">
                {files.map((currFile: FSTracerFile) => (
                  <div key={currFile.id}>
                    <p>{currFile.absolute_path} - {currFile.timestamp} {currFile.id === file.id && "*"}</p>
                  </div>
                ))
                }
              </div>
            </div>
          </> : <>
            <div className="flex flex-col items-center">
              <p>File not found</p>
            </div>
          </>
          }
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
      <p style={{ whiteSpace: "pre-wrap" }}>Content: {props.file.contents}</p>
      <p>ID: {props.file.id}</p>
    </>
  )
}
