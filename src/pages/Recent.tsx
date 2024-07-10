import { useEffect, useState, useCallback } from "react"

import { useNavigate } from "react-router-dom"
import SideBar from "../components/Sidebar/Sidebar"

export default function Recent(props: any) {
  const navigate = useNavigate()

  const [files, setFiles] = useState([])

  const [paginationOffset, setPaginationOffset] = useState(0);

  useEffect(() => {
    if (!props.session) {
      navigate('/login')
    }
  }, [props.session])

  const fetchFiles = useCallback(async () => {
    console.log("FETCHIN FILES")
    const { data, error } = await props.supabase
      .from('file')
      .select().limit(10).offset(paginationOffset)
    if (error) {
      console.error(error)
      return
    }
    console.log("FETCHED FILES")
    setFiles(data.map((file: any) => {
      return file as File
    }))
  }, [props.supabase])

  useEffect(() => {
    console.log("Aaa")
    fetchFiles()
  }, [paginationOffset])

  return (
    <>
      <div className="flex h-screen">
        <SideBar currentPage="Recent" />
        <main className="flex-1 overflow-y-auto">
          <button onClick={() => setPaginationOffset(paginationOffset + 1)}>
            clickmeforpaginate
          </button>
          <div>
            {files.map((file: any) => (
              <div key={file.id}>
                <p className="underline">file: {file.absolute_path}</p>
              </div>
            ))
            }
          </div>
        </main>
      </div>
    </>
  )
}
