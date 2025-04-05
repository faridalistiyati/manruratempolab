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
import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Plus,
  Edit,
  Archive,
  Eye,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type EventStatus = "draft" | "active" | "completed" | "archived";

interface Event {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: EventStatus;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "Q2 2023 Assessment",
      description: "Quarterly assessment for all departments",
      startDate: new Date(2023, 3, 1), // April 1, 2023
      endDate: new Date(2023, 5, 30), // June 30, 2023
      status: "active",
    },
    {
      id: "2",
      name: "Emergency Department Audit",
      description: "Special audit for emergency department",
      startDate: new Date(2023, 4, 15), // May 15, 2023
      endDate: new Date(2023, 5, 15), // June 15, 2023
      status: "active",
    },
    {
      id: "3",
      name: "Q3 2023 Assessment",
      description: "Quarterly assessment for all departments",
      startDate: new Date(2023, 6, 1), // July 1, 2023
      endDate: new Date(2023, 8, 30), // September 30, 2023
      status: "draft",
    },
    {
      id: "4",
      name: "Q1 2023 Assessment",
      description: "Quarterly assessment for all departments",
      startDate: new Date(2023, 0, 1), // January 1, 2023
      endDate: new Date(2023, 2, 31), // March 31, 2023
      status: "completed",
    },
  ]);

  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    status: "draft",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case "draft":
        return "bg-muted text-muted-foreground";
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleCreateEvent = () => {
    if (newEvent.name && newEvent.startDate && newEvent.endDate) {
      const event: Event = {
        id: String(events.length + 1),
        name: newEvent.name,
        description: newEvent.description || "",
        startDate: newEvent.startDate,
        endDate: newEvent.endDate,
        status: "draft",
      };
      setEvents([...events, event]);
      setNewEvent({
        name: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        status: "draft",
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Assessment Events
          </h2>
          <p className="text-muted-foreground">Manage your assessment events</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Assessment Event</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new assessment event.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  value={newEvent.name}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, name: e.target.value })
                  }
                  placeholder="Q3 2023 Assessment"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  placeholder="Quarterly assessment for all departments"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newEvent.startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newEvent.startDate ? (
                          format(newEvent.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newEvent.startDate}
                        onSelect={(date) =>
                          date && setNewEvent({ ...newEvent, startDate: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newEvent.endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newEvent.endDate ? (
                          format(newEvent.endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={newEvent.endDate}
                        onSelect={(date) =>
                          date && setNewEvent({ ...newEvent, endDate: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEvent}>Create Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{event.name}</CardTitle>
                <Badge className={getStatusColor(event.status)}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              </div>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(event.startDate, "MMM d, yyyy")} -{" "}
                    {format(event.endDate, "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" /> View
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Archive className="mr-2 h-4 w-4" /> Archive
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
