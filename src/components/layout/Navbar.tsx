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
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
]

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined)
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()
  const location = useLocation()

  const handleLogout = async () => {
    await logout(undefined)
    dispatch(authApi.util.resetApiState())
  }

  const isActive = (href: string) => location.pathname === href

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md shadow-sm px-4 md:px-6"
      )}
    >
      <div className="flex h-16 container mx-auto items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex flex-1 items-center gap-2">
          <Link to="/" className="text-primary font-semibold text-lg hover:text-primary/90">
            Ride<span className="text-foreground">Share</span>
          </Link>
        </div>

        {/* Right: Nav & Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop nav */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex items-center gap-2">
              {navigationLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className={cn(
                        "px-3 py-2 text-sm font-medium transition-colors",
                        isActive(link.href)
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu / User */}
          <Popover>
            {data?.data?.data?.email ? (
              <UserMenu data={data} handleLogout={handleLogout} />
            ) : (
              <>
                <span className="hidden md:flex">
                  <ModeToggle />
                </span>
                <Button asChild className="text-sm">
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}

            {/* Mobile dropdown */}
            <PopoverContent align="start" className="w-40 p-2 mr-6 md:hidden">
              <NavigationMenu className="max-w-none w-full">
                <NavigationMenuList className="flex flex-col items-start gap-2">
                  {navigationLinks.map((link) => (
                    <NavigationMenuItem key={link.href} className="w-full">
                      <NavigationMenuLink asChild>
                        <Link
                          to={link.href}
                          className={cn(
                            "block w-full px-2 py-1.5 text-sm rounded-md",
                            isActive(link.href)
                              ? "bg-muted text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  <div className="flex justify-center w-full pt-2 border-t">
                    <ModeToggle />
                  </div>
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  )
}
