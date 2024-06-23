export default function SidebarButton(props: any) {
  return (
    <div role="button"
      className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
      <div className="grid mr-4 place-items-center">
        <i className={props.icon}></i>
      </div>
      <a href={props.href}>{props.name}</a>
    </div >
  )
}
