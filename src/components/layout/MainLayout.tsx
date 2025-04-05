import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Calendar,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  userRole?: "admin" | "room_representative" | "evaluator";
}

export default function MainLayout({
  children,
  userRole = "admin",
}: MainLayoutProps) {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Assessment Events", href: "/events", icon: Calendar },
    { name: "Rooms", href: "/rooms", icon: ClipboardList },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter((item) => {
    if (userRole === "room_representative") {
      return ["Dashboard", "Assessment Events"].includes(item.name);
    }
    if (userRole === "evaluator") {
      return ["Dashboard", "Assessment Events", "Rooms"].includes(item.name);
    }
    return true; // Admin sees all
  });

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r bg-card">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-semibold">Assessment System</h1>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {filteredNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    )}
                  >
                    <item.icon
                      className={cn(
                        isActive
                          ? "text-primary-foreground"
                          : "text-muted-foreground",
                        "mr-3 flex-shrink-0 h-5 w-5",
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-border p-4">
            <div className="flex items-center">
              <div>
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center text-xs text-muted-foreground"
                >
                  <LogOut className="mr-2 h-3 w-3" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-card border-b border-border">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-semibold md:hidden">
                Assessment System
              </h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="ml-3 relative">
                <Avatar className="md:hidden">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
