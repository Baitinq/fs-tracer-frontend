import { useParams } from "react-router-dom"
import SideBar from "../components/Sidebar/Sidebar"

export default function File() {
  let { filepath } = useParams();

  console.log("FILEPATH: ", filepath)

  return (
    <>
      <div className="flex h-screen">
        <SideBar />
        <main className="flex-1 overflow-y-auto my-4">
          <div className="flex flex-col items-center">
            {filepath}
          </div>
        </main>
      </div>
    </>
  )
}
