"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CircleUser,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Zap,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logOut } from "@/services/logout"
import { toast } from "sonner"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const userMenuItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Settings", href: "/settings", icon: Settings },
]

interface IUser {
  success : boolean;
  statusCode : number;
  message : string;
  data : {
    id : string;
    name : string;
    email : string; 
    activeStatus : string;
    role : string;
    createdAt : string;
    updatedAt : string;
    isPremium : boolean;
    profile : {
      id : string;
      profilePhoto : string;
      bio : string | null;
      userId : string;
      createdAt : string;
      updatedAt : string;
    }
  }
}

interface NavbarProps {
  user : IUser
}

export const Navbar = ({user} : NavbarProps)=> {
  const router = useRouter()


  const handleUserMenuAction = async(action:string)=>{
    if(action === 'logOut'){
      await logOut();
      toast.success("User Logged Out Successfully.");
      router.push("/login");
    }
  }

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Zap className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Next Js Press</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User dropdown */}
       {
        user.success ?  <DropdownMenu>
          <DropdownMenuTrigger className="flex size-9 items-center justify-center rounded-full outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Avatar className="size-9 cursor-pointer">
              <AvatarImage src="/diverse-avatars.png" alt="User avatar" />
              <AvatarFallback>
                <CircleUser className="size-5" />
              </AvatarFallback>
            </Avatar>
            <span className="sr-only">Open user menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{user.data.name || "name"}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {user.data.email || "Email"}
                  </span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {userMenuItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon data-icon="inline-start" />
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={async() => await handleUserMenuAction("logOut")}
            >
              <LogOut data-icon="inline-start" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> : <Link 
        href={'/login'}
        className="rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-accent-foreground"
        >Login</Link>
       }
      </div>
    </header>
  )
}
