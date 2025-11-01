import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent
} from "@/components/ui/popover"
import { Link, useLocation } from "react-router"
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useDispatch } from "react-redux"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ModeToggler"
import UserMenu from "../ui/user-menu"


const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" }
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
            
            <PopoverContent align="start" className="w-36 p-1 mr-9 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
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
