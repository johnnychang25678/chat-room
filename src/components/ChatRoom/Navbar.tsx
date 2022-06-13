import { MenuIcon, XIcon } from '@heroicons/react/outline'

export const NavBar = () => {
  return (
    <div className="h-[10%] bg-zinc-200">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4 sm:text-4xl">Hello </h1>
          <ul className="hidden md:flex">
            <li>aaa</li>

          </ul>
        </div>
      </div>
      {/* <MenuIcon className="w-5" /> */}
    </div>

  )
}