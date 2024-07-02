import { useEffect, useState, useCallback } from "react"

import { useNavigate } from "react-router-dom"
import SideBar from "../components/Sidebar/Sidebar"
import LineGraph from "../components/Graphs/LineGraph"
import TimePicker from "../components/TimePicker/TimePicker"

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
        <main className="overflow-y-auto flex flex-col flex-1 mx-5">
          <div className="flex flex-col w-full gap-7 flex-grow">
            <div className="flex flex-row gap-7 flex-grow">
              <div className="ml-auto">
                <TimePicker />
              </div>
            </div>
            <div className="flex flex-row gap-7 flex-grow">
              <div className="w-1/2 block bg-white border border-gray-200 rounded-lg shadow">
              </div>
              <div className="w-1/2 ml-auto">
                <LineGraph />
              </div>
            </div>
            <div className="flex flex-row gap-7 mb-5 flex-grow">
              <div className="w-1/2 mr-auto">
                <LineGraph />
              </div>
              <div className="w-1/2 block bg-white-500 border border-gray-200 rounded-lg shadow">
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
