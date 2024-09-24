import { Link } from "react-router-dom";

export default function UserMenu({urlMenu, path, text}) {
  return (
    <li>
      <Link
        href={urlMenu}
        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
        role="menuitem"
      >
        <svg
          className="flex-shrink-0 w-5 h-5 mr-3 transition duration-75 text-gray-400  group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={path}
          />
        </svg>
        {text}
      </Link>
    </li>
  );
}
