import SidebarButton from "./SidebarButton";

export default function SideBar() {
  return (
    <div
      className="relative flex h-full w-full max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5 mr-5">
      <div className="p-4 mb-2">
        <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          <a href="/">fs-tracer</a>
        </h5>
      </div>
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        <SidebarButton name="Home" icon="fa-solid fa-house" href="/" />
        <SidebarButton name="Recent files" icon="fa-solid fa-folder" href="/recent" />
        <SidebarButton name="Search" icon="fa-solid fa-magnifying-glass" href="/search" />
        <SidebarButton name="Monitoring" icon="fa-solid fa-chart-column" href="/monitoring" />
        <SidebarButton name="Setup" icon="fa-solid fa-gear" href="/setup" />
        <SidebarButton name="Logout" icon="fa-solid fa-right-from-bracket" href="/logout" />
      </nav>
    </div>
  )
}
