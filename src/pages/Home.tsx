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
        <SideBar currentPage="Home" />
        <main className="overflow-y-auto flex flex-col flex-1 mx-5">
          <div className="flex flex-col w-full gap-7 flex-grow">
            <div className="flex flex-row gap-7 flex-grow">
              <div className="ml-auto mt-2">
                <TimePicker timeframe={props.timeframe} setTimeframe={props.setTimeframe} />
              </div>
            </div>
            <div className="flex flex-row gap-7 flex-grow">
              <div className="w-1/2 flex flex-col">
                <p className="text-center">Active hosts</p>
                <div className="flex-grow block bg-white-500 border border-gray-200 rounded-lg shadow">
                  <ol>
                    <li>Host 1</li>
                    <li>Host 2</li>
                  </ol>
                </div>
              </div>
              <div className="w-1/2 ml-auto">
                <LineGraph name="File writes per second" supabase={props.supabase} />
              </div>
            </div>
            <div className="flex flex-row gap-7 mb-5 flex-grow">
              <div className="w-1/2 mr-auto">
                <LineGraph name="caca" supabase={props.supabase} />
              </div>
              <div className="w-1/2 flex flex-col">
                <p className="text-center">Most edited files</p>
                <div className="flex-grow block bg-white-500 border border-gray-200 rounded-lg shadow">
                  <ol>
                    <li>File 1</li>
                    <li>File 2</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
