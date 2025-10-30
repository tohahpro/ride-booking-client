import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link, useLocation } from "react-router"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useDispatch } from "react-redux"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ModeToggler"
import { role } from "@/constants/role"
import UserMenu from "../ui/user-menu"


// Navigation links with icons for desktop icon-only navigation
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/rider", label: "Dashboard", role: role.rider },
  { href: "/driver", label: "Dashboard", role: role.driver },

]


export default function Navbar() {

  const { data } = useUserInfoQuery(undefined)
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()
  const location = useLocation()

  console.log(data?.data?.data);

  const handleLogout = async () => {
    await logout(undefined)
    dispatch(authApi.util.resetApiState())
  }

  const isActive = (href: string) => {
    return location.pathname === href
  }

  return (
    <header className="border-b px-4 md:px-6">
      <div className="flex h-16 px-4 container mx-auto items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-2">

          {/* Logo */}
          <Link to="/" className="text-primary flex items-center hover:text-primary/90">
            logo
          </Link>          
        </div>


        {/* Right side */}
        <div className="flex items-center gap-2">

          {/* Desktop navigation - icon only */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-start gap-0 md:gap-2">
              {navigationLinks.map((link, index) => (
                <div key={index}>
                  {
                    link.role === "PUBLIC" && (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            className={cn(
                              "flex-row items-center gap-2 py-1.5 block w-full px-2",
                              isActive(link.href) ? "text-sidebar-primary font-medium" : ""
                            )}
                            to={link.href}>{link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  }

                  {
                    link.role === data?.data?.data?.role && (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            className={cn(
                              "flex-row items-center gap-2 py-1.5 block w-full px-2",
                              isActive(link.href) ? "text-primary font-medium" : "text-muted-foreground"
                            )}
                            to={link.href}>{link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  }
                </div>


              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile menu trigger */}
          <Popover>
            {
              data?.data?.data?.email ? (
                <>
                  <UserMenu data={data} handleLogout={handleLogout} />
                </>
              ) : (
                <>
                  <span className="hidden md:flex">
                    <ModeToggle />
                  </span>
                  <Button asChild
                    className="text-sm">
                    <Link to={"/login"}>Login</Link>
                  </Button>
                </>
              )
            }

            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-315"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                  />
                </svg>
              </Button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-36 p-1 mr-9 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {

                    return (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          asChild
                          className="flex-row items-center gap-2 py-1.5"
                        >
                          <Link to={link.href}>{link.label}</Link>

                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )
                  })}
                  <div className="flex justify-center w-full"><ModeToggle /></div>
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

        </div>
      </div>
    </header>
  )
}
