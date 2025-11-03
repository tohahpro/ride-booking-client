/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Layers2Icon,
  LogOutIcon,
  Moon,
  Sun,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { role } from "@/constants/role";
import { PopoverTrigger } from "./popover";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/rider", label: "Dashboard", role: role.rider },
  { href: "/driver", label: "Dashboard", role: role.driver },
];

export default function UserMenu({ handleLogout, data }: any) {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const info = data?.data?.data;
  const avatar = info?.name
    ? info.name
      .split(" ")
      .slice(0, 2)
      .map((w: string) => w.charAt(0).toUpperCase())
      .join("")
    : "?";

  const isActive = (path: string) => location.pathname === path;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <>
          <Avatar className="hidden md:flex">
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
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
          </>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-64" align="end">
        {/* User Info */}
        <DropdownMenuLabel className="flex flex-col min-w-0">
          <span className="text-sm font-medium truncate text-foreground">
            {info?.name}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {info?.email}
          </span>
        </DropdownMenuLabel>

        
        {info?.role === role.rider && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  to="/driver-registration"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Layers2Icon size={16} className="opacity-60" />
                  Register as Driver
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navigationLinks
            .filter(
              (link) =>
                (link.role === "PUBLIC" ? true : link.role === info?.role)
            )
            .map((link, index) => (
              <DropdownMenuItem
                key={index}
                asChild
                className={cn(
                  link.role === "PUBLIC" ? "md:hidden" : "",
                )}
              >
                <Link
                  to={link.href}
                  className={cn(
                    "flex items-center gap-2 w-full py-1.5 px-2 rounded-md transition-colors",
                    isActive(link.href)
                      ? "bg-muted text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-[popover]"
            onClick={handleLogout}
          >
            <LogOutIcon size={16} className="opacity-60" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {/* Theme toggle */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={toggleTheme}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:scale-100 dark:rotate-0" />
          <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
