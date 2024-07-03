export default function SidebarButton(props: any) {
  let buttonStyle = "flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-500"

  if (props.name === props.currentPage) {
    buttonStyle += " border-2 border-black"
  }

  return (
    <div role="button"
      className={buttonStyle}>
      <div className="grid mr-4 place-items-center">
        <i className={props.icon}></i>
      </div>
      <a href={props.href}>{props.name}</a>
    </div>
  )
}
