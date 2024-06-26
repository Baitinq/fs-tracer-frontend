import { useEffect, useState, useCallback } from "react"

import { useNavigate } from "react-router-dom"
import SideBar from "../components/Sidebar/Sidebar"
import LineGraph from "../components/Graphs/LineGraph"

export default function Home(props: any) {
  const navigate = useNavigate()

  const [_, setFiles] = useState([])

  useEffect(() => {
    if (!props.session) {
      navigate('/login')
    }
  }, [props.session])

  const fetchFiles = useCallback(async () => {
    const { data, error } = await props.supabase
      .from('file')
      .select()
    if (error) {
      console.error(error)
      return
    }
    setFiles(data.map((file: any) => {
      return file as File
    }))
  }, [props.supabase])

  useEffect(() => {
    fetchFiles()
  }, [])

  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 overflow-y-auto">
          <div className="w-3/12">
            <LineGraph />
          </div>
          <div className="w-3/12">
            <LineGraph />
          </div>
        </main>
      </div>
    </>
  )
}
