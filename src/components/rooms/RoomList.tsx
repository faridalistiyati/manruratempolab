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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Users, ClipboardCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Room {
  id: string;
  unitName: string;
  roomName: string;
  selfAssessmentStatus: "not_started" | "in_progress" | "completed";
  evaluationStatus: "not_started" | "in_progress" | "completed";
  assignedEvaluators: number;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      unitName: "Outpatient Department",
      roomName: "Surgical Clinic",
      selfAssessmentStatus: "completed",
      evaluationStatus: "in_progress",
      assignedEvaluators: 2,
    },
    {
      id: "2",
      unitName: "Outpatient Department",
      roomName: "Medical Clinic",
      selfAssessmentStatus: "completed",
      evaluationStatus: "completed",
      assignedEvaluators: 2,
    },
    {
      id: "3",
      unitName: "Emergency Department",
      roomName: "Triage Area",
      selfAssessmentStatus: "in_progress",
      evaluationStatus: "not_started",
      assignedEvaluators: 1,
    },
    {
      id: "4",
      unitName: "Emergency Department",
      roomName: "Resuscitation Room",
      selfAssessmentStatus: "completed",
      evaluationStatus: "in_progress",
      assignedEvaluators: 3,
    },
    {
      id: "5",
      unitName: "Inpatient Department",
      roomName: "Medical Ward",
      selfAssessmentStatus: "not_started",
      evaluationStatus: "not_started",
      assignedEvaluators: 0,
    },
    {
      id: "6",
      unitName: "Inpatient Department",
      roomName: "Surgical Ward",
      selfAssessmentStatus: "not_started",
      evaluationStatus: "not_started",
      assignedEvaluators: 0,
    },
  ]);

  const [newRoom, setNewRoom] = useState({
    unitName: "",
    roomName: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (
    status: "not_started" | "in_progress" | "completed",
  ) => {
    switch (status) {
      case "not_started":
        return <Badge variant="outline">Not Started</Badge>;
      case "in_progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Completed
          </Badge>
        );
    }
  };

  const handleCreateRoom = () => {
    if (newRoom.unitName && newRoom.roomName) {
      const room: Room = {
        id: String(rooms.length + 1),
        unitName: newRoom.unitName,
        roomName: newRoom.roomName,
        selfAssessmentStatus: "not_started",
        evaluationStatus: "not_started",
        assignedEvaluators: 0,
      };
      setRooms([...rooms, room]);
      setNewRoom({
        unitName: "",
        roomName: "",
      });
      setIsDialogOpen(false);
    }
  };

  // Group rooms by unit
  const roomsByUnit = rooms.reduce(
    (acc, room) => {
      if (!acc[room.unitName]) {
        acc[room.unitName] = [];
      }
      acc[room.unitName].push(room);
      return acc;
    },
    {} as Record<string, Room[]>,
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rooms</h2>
          <p className="text-muted-foreground">
            Manage rooms and assign evaluators
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>
                Add a new room to the assessment system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="unitName">Unit Name</Label>
                <Input
                  id="unitName"
                  value={newRoom.unitName}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, unitName: e.target.value })
                  }
                  placeholder="Outpatient Department"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="roomName">Room Name</Label>
                <Input
                  id="roomName"
                  value={newRoom.roomName}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, roomName: e.target.value })
                  }
                  placeholder="Surgical Clinic"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRoom}>Add Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Rooms</TabsTrigger>
          <TabsTrigger value="self-assessment">Self-Assessment</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {Object.entries(roomsByUnit).map(([unitName, unitRooms]) => (
            <div key={unitName} className="space-y-4">
              <h3 className="text-xl font-semibold">{unitName}</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {unitRooms.map((room) => (
                  <Card key={room.id}>
                    <CardHeader>
                      <CardTitle>{room.roomName}</CardTitle>
                      <CardDescription>{room.unitName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Self-Assessment:</span>
                          {getStatusBadge(room.selfAssessmentStatus)}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Evaluation:</span>
                          {getStatusBadge(room.evaluationStatus)}
                        </div>
                        <div className="flex items-center mt-2">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm">
                            {room.assignedEvaluators} Evaluators Assigned
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <ClipboardCheck className="mr-2 h-4 w-4" /> View
                        Assessment
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="self-assessment">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rooms
              .filter((room) => room.selfAssessmentStatus !== "completed")
              .map((room) => (
                <Card key={room.id}>
                  <CardHeader>
                    <CardTitle>{room.roomName}</CardTitle>
                    <CardDescription>{room.unitName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Self-Assessment:</span>
                        {getStatusBadge(room.selfAssessmentStatus)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      {room.selfAssessmentStatus === "not_started"
                        ? "Start Self-Assessment"
                        : "Continue Self-Assessment"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="evaluation">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rooms
              .filter(
                (room) =>
                  room.selfAssessmentStatus === "completed" &&
                  room.evaluationStatus !== "completed",
              )
              .map((room) => (
                <Card key={room.id}>
                  <CardHeader>
                    <CardTitle>{room.roomName}</CardTitle>
                    <CardDescription>{room.unitName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Evaluation:</span>
                        {getStatusBadge(room.evaluationStatus)}
                      </div>
                      <div className="flex items-center mt-2">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {room.assignedEvaluators} Evaluators Assigned
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      {room.evaluationStatus === "not_started"
                        ? "Start Evaluation"
                        : "Continue Evaluation"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
