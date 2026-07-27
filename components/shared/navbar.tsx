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

// {
//     "success": true,
//     "statusCode": 200,
//     "message": "User Information with profile fetched successfully",
//     "data": {
//         "id": "81dc3d86-8bfa-4154-b7ae-7ccf5c927540",
//         "name": "Sanjana Akther",
//         "email": "sanjana@gmail.com",
//         "activeStatus": "ACTIVE",
//         "role": "USER",
//         "createdAt": "2026-06-29T14:38:12.817Z",
//         "updatedAt": "2026-06-29T14:38:12.817Z",
//         "isPremium": false,
//         "profile": {
//             "id": "17c28091-53fa-4c71-967c-6abe2312175d",
//             "profilePhoto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa2SAkeKXmDcRI7JSHTlDZCcKPpeIGuUvIBnT0vqkSTwBKonytW8FZOiNv2E0zvSQHlpO_LRUaSrRp7_8ZpTPktA1-mFY6hUscWEGfkYs&s=10",
//             "bio": null,
//             "userId": "81dc3d86-8bfa-4154-b7ae-7ccf5c927540",
//             "createdAt": "2026-06-29T14:38:12.817Z",
//             "updatedAt": "2026-06-29T14:38:12.817Z"
//         }
//     }
// }

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
        <DropdownMenu>
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
                  <span className="text-sm font-medium">{user.data.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {user.data.email}
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
              onClick={() => console.log("[v0] logout")}
            >
              <LogOut data-icon="inline-start" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
