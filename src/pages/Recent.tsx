import { useEffect, useState, useCallback } from "react"

import { useNavigate } from "react-router-dom"
import SideBar from "../components/Sidebar/Sidebar"
import { FSTracerFile } from "../lib/types";
import FileComponent from "../components/Other/FSTracerFile";

export default function Recent(props: any) {
  const navigate = useNavigate()

  const numOfFilesToShow = 20;

  const [files, setFiles] = useState([])

  const [paginationOffset, setPaginationOffset] = useState(0);

  useEffect(() => {
    if (!props.session) {
      navigate('/login')
    }
  }, [props.session])

  const fetchFiles = useCallback(async () => {
    console.log("FETCHIN FILES, pagination: ", paginationOffset)
    const { data, error } = await props.supabase
      .from('file')
      .select()
      .order('timestamp', { ascending: false })
      .range(paginationOffset, paginationOffset + numOfFilesToShow - 1)
    if (error) {
      console.error(error)
      return
    }
    console.log("RAW FILES: ", data)
    setFiles(data.map((file: any) => {
      return file as File
    }))
    console.log("FETCHED FILES")
  }, [props.supabase, paginationOffset])

  useEffect(() => {
    console.log("Aaa")
    fetchFiles()
  }, [paginationOffset])

  return (
    <>
      <div className="flex h-screen">
        <SideBar currentPage="Recent" />
        <main className="flex-1 overflow-y-auto my-4">
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-2">
              {files.map((file: FSTracerFile) => (
                <div key={file.id} role="button">
                  <FileComponent file={file} />
                </div>
              ))
              }
            </div>
          </div>
          <div className="flex flex-row gap-2 mt-4">
            <button className="ml-7 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPaginationOffset(paginationOffset + -numOfFilesToShow)}>
              prev
            </button>
            <button className="mr-7 ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setPaginationOffset(paginationOffset + numOfFilesToShow)}>
              next
            </button>
          </div>
        </main >
      </div >
    </>
  )
}
