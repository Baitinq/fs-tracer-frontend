export default function SidebarButton(props: any) {
  return (
    <div role="button"
      className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500">
      <div className="grid mr-4 place-items-center">
        <i className={props.icon}></i>
      </div>
      <a href={props.href}>{props.name}</a>
    </div>
  )
}
