import { useEffect, useState, useCallback } from "react"

import { useNavigate } from "react-router-dom"

interface File {
  id: number
  user_id: string
  absolute_path: string
  contents: string
  timestamp: string
}

export default function Home(props: any) {
  const navigate = useNavigate()

  const [files, setFiles] = useState([])

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
      <div>
        <h1 className="font-bold">Home</h1>
        <p>Logged in!</p>
        {files.map((file: any) => (
          <div key={file.id}>
            <p className="underline">file: {file.absolute_path}</p>
          </div>
        ))
        }
      </div>
    </>
  )
}
