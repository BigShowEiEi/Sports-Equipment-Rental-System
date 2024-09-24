

export default function SideMenu({ urlMenu, path , name}) {
  return (
    <li>
      <a
        href={urlMenu}
        className="flex items-center p-2 rounded-lg text-white  hover:bg-gray-700 group"
      >
        <svg
          className="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400  group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d={path} />
        </svg>
        <span className="flex-1 ms-3 whitespace-nowrap">{name}</span>
      </a>
    </li>
  );
}
