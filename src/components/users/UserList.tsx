import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Key, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type UserRole = "admin" | "room_representative" | "evaluator";

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  assignedRooms?: number;
  lastLogin?: Date;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      username: "admin",
      fullName: "Admin User",
      email: "admin@example.com",
      role: "admin",
      lastLogin: new Date(2023, 5, 15),
    },
    {
      id: "2",
      username: "john.doe",
      fullName: "John Doe",
      email: "john.doe@example.com",
      role: "room_representative",
      assignedRooms: 3,
      lastLogin: new Date(2023, 5, 20),
    },
    {
      id: "3",
      username: "jane.smith",
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      role: "room_representative",
      assignedRooms: 2,
      lastLogin: new Date(2023, 5, 18),
    },
    {
      id: "4",
      username: "robert.johnson",
      fullName: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "evaluator",
      assignedRooms: 5,
      lastLogin: new Date(2023, 5, 19),
    },
    {
      id: "5",
      username: "sarah.williams",
      fullName: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "evaluator",
      assignedRooms: 4,
      lastLogin: new Date(2023, 5, 17),
    },
  ]);

  const [newUser, setNewUser] = useState({
    username: "",
    fullName: "",
    email: "",
    role: "room_representative" as UserRole,
    password: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            Admin
          </Badge>
        );
      case "room_representative":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Room Representative
          </Badge>
        );
      case "evaluator":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Evaluator
          </Badge>
        );
    }
  };

  const getAvatarFallback = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleCreateUser = () => {
    if (
      newUser.username &&
      newUser.fullName &&
      newUser.email &&
      newUser.role &&
      newUser.password
    ) {
      const user: User = {
        id: String(users.length + 1),
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        assignedRooms: 0,
      };
      setUsers([...users, user]);
      setNewUser({
        username: "",
        fullName: "",
        email: "",
        role: "room_representative",
        password: "",
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with specific role and permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={newUser.fullName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullName: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  placeholder="john.doe"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: UserRole) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="room_representative">
                      Room Representative
                    </SelectItem>
                    <SelectItem value="evaluator">Evaluator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Initial Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  placeholder="••••••••"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="admin">Admins</TabsTrigger>
          <TabsTrigger value="room_representative">
            Room Representatives
          </TabsTrigger>
          <TabsTrigger value="evaluator">Evaluators</TabsTrigger>
        </TabsList>

        {["all", "admin", "room_representative", "evaluator"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {users
                .filter((user) => tab === "all" || user.role === tab)
                .map((user) => (
                  <Card key={user.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                          />
                          <AvatarFallback>
                            {getAvatarFallback(user.fullName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">
                            {user.fullName}
                          </CardTitle>
                          <CardDescription>{user.username}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Role:
                          </span>
                          {getRoleBadge(user.role)}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Email:
                          </span>
                          <span className="text-sm">{user.email}</span>
                        </div>
                        {user.role !== "admin" &&
                          user.assignedRooms !== undefined && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                Assigned Rooms:
                              </span>
                              <span className="text-sm">
                                {user.assignedRooms}
                              </span>
                            </div>
                          )}
                        {user.lastLogin && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Last Login:
                            </span>
                            <span className="text-sm">
                              {user.lastLogin.toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Key className="mr-2 h-4 w-4" /> Reset Password
                        </Button>
                        {user.role !== "admin" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
