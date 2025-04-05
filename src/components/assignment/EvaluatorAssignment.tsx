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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Plus, Save, Users, CheckCircle } from "lucide-react";

interface Room {
  id: string;
  unitName: string;
  roomName: string;
}

interface Standard {
  id: string;
  code: string;
  name: string;
}

interface Evaluator {
  id: string;
  name: string;
  assignedRooms: number;
}

interface Assignment {
  id: string;
  roomId: string;
  standardId: string;
  evaluatorId: string;
}

export default function EvaluatorAssignment() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", unitName: "Outpatient Department", roomName: "Surgical Clinic" },
    { id: "2", unitName: "Outpatient Department", roomName: "Medical Clinic" },
    { id: "3", unitName: "Emergency Department", roomName: "Triage Area" },
    {
      id: "4",
      unitName: "Emergency Department",
      roomName: "Resuscitation Room",
    },
    { id: "5", unitName: "Inpatient Department", roomName: "Medical Ward" },
    { id: "6", unitName: "Inpatient Department", roomName: "Surgical Ward" },
  ]);

  const [standards, setStandards] = useState<Standard[]>([
    { id: "1", code: "PS", name: "Patient Safety" },
    { id: "2", code: "QI", name: "Quality Improvement" },
    { id: "3", code: "IC", name: "Infection Control" },
    { id: "4", code: "MM", name: "Medication Management" },
    { id: "5", code: "PFR", name: "Patient and Family Rights" },
  ]);

  const [evaluators, setEvaluators] = useState<Evaluator[]>([
    { id: "1", name: "Robert Johnson", assignedRooms: 5 },
    { id: "2", name: "Sarah Williams", assignedRooms: 4 },
    { id: "3", name: "Michael Brown", assignedRooms: 3 },
    { id: "4", name: "Emily Davis", assignedRooms: 2 },
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: "1", roomId: "1", standardId: "1", evaluatorId: "1" },
    { id: "2", roomId: "1", standardId: "2", evaluatorId: "2" },
    { id: "3", roomId: "2", standardId: "1", evaluatorId: "1" },
    { id: "4", roomId: "2", standardId: "2", evaluatorId: "2" },
    { id: "5", roomId: "3", standardId: "3", evaluatorId: "3" },
    { id: "6", roomId: "4", standardId: "1", evaluatorId: "1" },
    { id: "7", roomId: "4", standardId: "3", evaluatorId: "3" },
    { id: "8", roomId: "4", standardId: "4", evaluatorId: "4" },
  ]);

  const [newAssignment, setNewAssignment] = useState({
    roomId: "",
    standardId: "",
    evaluatorId: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("1"); // Default to first event

  const handleCreateAssignment = () => {
    if (
      newAssignment.roomId &&
      newAssignment.standardId &&
      newAssignment.evaluatorId
    ) {
      const assignment: Assignment = {
        id: String(assignments.length + 1),
        roomId: newAssignment.roomId,
        standardId: newAssignment.standardId,
        evaluatorId: newAssignment.evaluatorId,
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({
        roomId: "",
        standardId: "",
        evaluatorId: "",
      });
      setIsDialogOpen(false);
    }
  };

  const getEvaluatorForAssignment = (roomId: string, standardId: string) => {
    const assignment = assignments.find(
      (a) => a.roomId === roomId && a.standardId === standardId,
    );
    if (assignment) {
      const evaluator = evaluators.find((e) => e.id === assignment.evaluatorId);
      return evaluator ? evaluator.name : "Not Assigned";
    }
    return "Not Assigned";
  };

  const isAssigned = (roomId: string, standardId: string) => {
    return assignments.some(
      (a) => a.roomId === roomId && a.standardId === standardId,
    );
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
          <h2 className="text-3xl font-bold tracking-tight">
            Evaluator Assignment
          </h2>
          <p className="text-muted-foreground">
            Assign evaluators to rooms by standard
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedEvent} onValueChange={setSelectedEvent}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Q2 2023 Assessment</SelectItem>
              <SelectItem value="2">Emergency Department Audit</SelectItem>
              <SelectItem value="3">Q3 2023 Assessment</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>
                  Assign an evaluator to a room for a specific standard.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="room">Room</Label>
                  <Select
                    value={newAssignment.roomId}
                    onValueChange={(value) =>
                      setNewAssignment({ ...newAssignment, roomId: value })
                    }
                  >
                    <SelectTrigger id="room">
                      <SelectValue placeholder="Select Room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.unitName} - {room.roomName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="standard">Standard</Label>
                  <Select
                    value={newAssignment.standardId}
                    onValueChange={(value) =>
                      setNewAssignment({ ...newAssignment, standardId: value })
                    }
                  >
                    <SelectTrigger id="standard">
                      <SelectValue placeholder="Select Standard" />
                    </SelectTrigger>
                    <SelectContent>
                      {standards.map((standard) => (
                        <SelectItem key={standard.id} value={standard.id}>
                          {standard.code} - {standard.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="evaluator">Evaluator</Label>
                  <Select
                    value={newAssignment.evaluatorId}
                    onValueChange={(value) =>
                      setNewAssignment({ ...newAssignment, evaluatorId: value })
                    }
                  >
                    <SelectTrigger id="evaluator">
                      <SelectValue placeholder="Select Evaluator" />
                    </SelectTrigger>
                    <SelectContent>
                      {evaluators.map((evaluator) => (
                        <SelectItem key={evaluator.id} value={evaluator.id}>
                          {evaluator.name} ({evaluator.assignedRooms} rooms)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateAssignment}>
                  Create Assignment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Matrix</CardTitle>
          <CardDescription>
            View and manage evaluator assignments for Q2 2023 Assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Room</TableHead>
                  {standards.map((standard) => (
                    <TableHead key={standard.id}>{standard.code}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(roomsByUnit).map(([unitName, unitRooms]) => (
                  <React.Fragment key={`unit-${unitName}`}>
                    <TableRow className="bg-muted/50">
                      <TableCell
                        colSpan={standards.length + 1}
                        className="font-medium"
                      >
                        {unitName}
                      </TableCell>
                    </TableRow>
                    {unitRooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">
                          {room.roomName}
                        </TableCell>
                        {standards.map((standard) => (
                          <TableCell key={`${room.id}-${standard.id}`}>
                            {isAssigned(room.id, standard.id) ? (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                {getEvaluatorForAssignment(
                                  room.id,
                                  standard.id,
                                )}
                              </Badge>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                Assign
                              </Button>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Assignments
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
