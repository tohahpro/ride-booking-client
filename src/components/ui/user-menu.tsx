/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Layers2Icon,
  LogOutIcon,
  Moon,
  Sun,
  UserPenIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/useTheme"
import { Link } from "react-router"


export default function UserMenu({ handleLogout, data }: any) {  

  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const info = data?.data?.data
  const avatar = info?.name?.includes(" ")
    ? info?.name.split(" ").slice(0, 2).map((w: string) => w.charAt(0).toUpperCase()).join("")
    : info?.name.slice(0, 1).toUpperCase();


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {info?.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {info?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>          
          <DropdownMenuItem className="cursor-pointer">
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <Link to={'/driver-registration'}>Register as Driver</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link to="/profile" className="flex gap-2">
              <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer hover:bg-[popover]" onClick={handleLogout} >
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="hidden md:flex" />
        <DropdownMenuItem onClick={toggleTheme} className="p-2 cursor-pointer hidden md:flex">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          {/* <span className="sr-only">Toggle theme</span> */}
          <span className="">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
