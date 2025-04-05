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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  Link,
  Save,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

interface AssessmentItem {
  id: string;
  standard: string;
  evaluationElement: string;
  epTitle: string;
  number: string;
  subPoint: string;
  maxWeight: number;
  evidenceType: "file" | "link" | "both";
  selfAssessmentScore?: number;
  selfAssessmentEvidence?: string;
  selfAssessmentNotes?: string;
}

export default function SelfAssessmentForm() {
  const [assessmentItems, setAssessmentItems] = useState<AssessmentItem[]>([
    {
      id: "1",
      standard: "Patient Safety",
      evaluationElement: "Medication Safety",
      epTitle: "Medication Administration",
      number: "PS.01",
      subPoint: "1.1",
      maxWeight: 10,
      evidenceType: "file",
      selfAssessmentScore: 10,
      selfAssessmentEvidence: "medication_policy.pdf",
      selfAssessmentNotes:
        "All medication administration protocols are documented and followed.",
    },
    {
      id: "2",
      standard: "Patient Safety",
      evaluationElement: "Medication Safety",
      epTitle: "Medication Storage",
      number: "PS.01",
      subPoint: "1.2",
      maxWeight: 10,
      evidenceType: "both",
      selfAssessmentScore: 5,
      selfAssessmentEvidence: "https://example.com/storage-guidelines",
      selfAssessmentNotes:
        "Some medications are not stored at the correct temperature.",
    },
    {
      id: "3",
      standard: "Patient Safety",
      evaluationElement: "Infection Control",
      epTitle: "Hand Hygiene",
      number: "PS.02",
      subPoint: "2.1",
      maxWeight: 10,
      evidenceType: "file",
    },
    {
      id: "4",
      standard: "Patient Safety",
      evaluationElement: "Infection Control",
      epTitle: "Isolation Procedures",
      number: "PS.02",
      subPoint: "2.2",
      maxWeight: 10,
      evidenceType: "link",
    },
    {
      id: "5",
      standard: "Quality Improvement",
      evaluationElement: "Performance Measurement",
      epTitle: "Data Collection",
      number: "QI.01",
      subPoint: "1.1",
      maxWeight: 10,
      evidenceType: "both",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<AssessmentItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleScoreChange = (id: string, score: number) => {
    setAssessmentItems(
      assessmentItems.map((item) =>
        item.id === id ? { ...item, selfAssessmentScore: score } : item,
      ),
    );
  };

  const handleEvidenceChange = (id: string, evidence: string) => {
    setAssessmentItems(
      assessmentItems.map((item) =>
        item.id === id ? { ...item, selfAssessmentEvidence: evidence } : item,
      ),
    );
  };

  const handleNotesChange = (id: string, notes: string) => {
    setAssessmentItems(
      assessmentItems.map((item) =>
        item.id === id ? { ...item, selfAssessmentNotes: notes } : item,
      ),
    );
  };

  const openItemDialog = (item: AssessmentItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const saveItemAssessment = () => {
    if (selectedItem) {
      setAssessmentItems(
        assessmentItems.map((item) =>
          item.id === selectedItem.id ? selectedItem : item,
        ),
      );
      setIsDialogOpen(false);
    }
  };

  // Group items by standard and evaluation element
  const groupedItems = assessmentItems.reduce(
    (acc, item) => {
      if (!acc[item.standard]) {
        acc[item.standard] = {};
      }
      if (!acc[item.standard][item.evaluationElement]) {
        acc[item.standard][item.evaluationElement] = [];
      }
      acc[item.standard][item.evaluationElement].push(item);
      return acc;
    },
    {} as Record<string, Record<string, AssessmentItem[]>>,
  );

  const getCompletionStatus = () => {
    const total = assessmentItems.length;
    const completed = assessmentItems.filter(
      (item) => item.selfAssessmentScore !== undefined,
    ).length;
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
    };
  };

  const status = getCompletionStatus();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Self-Assessment</h2>
        <p className="text-muted-foreground">
          Surgical Clinic - Q2 2023 Assessment
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment Progress</CardTitle>
          <CardDescription>
            {status.completed} of {status.total} items completed (
            {status.percentage}%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${status.percentage}%` }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">
            <Save className="mr-2 h-4 w-4" /> Save Progress
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue={Object.keys(groupedItems)[0]}>
        <TabsList className="w-full flex-wrap h-auto">
          {Object.keys(groupedItems).map((standard) => (
            <TabsTrigger key={standard} value={standard} className="flex-grow">
              {standard}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(groupedItems).map(([standard, elements]) => (
          <TabsContent key={standard} value={standard} className="space-y-6">
            {Object.entries(elements).map(([element, items]) => (
              <div key={element} className="space-y-4">
                <h3 className="text-xl font-semibold">{element}</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className={
                        item.selfAssessmentScore !== undefined
                          ? "border-green-200"
                          : ""
                      }
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="text-base">
                              {item.number}.{item.subPoint} {item.epTitle}
                            </CardTitle>
                            <CardDescription>
                              Max Weight: {item.maxWeight}
                            </CardDescription>
                          </div>
                          {item.selfAssessmentScore !== undefined ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              <CheckCircle className="mr-1 h-3 w-3" /> Completed
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-muted-foreground"
                            >
                              <AlertCircle className="mr-1 h-3 w-3" /> Pending
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              Self-Assessment Score:
                            </span>
                            <span className="text-sm font-bold">
                              {item.selfAssessmentScore !== undefined
                                ? item.selfAssessmentScore
                                : "Not scored"}
                            </span>
                          </div>
                          {item.selfAssessmentEvidence && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Evidence:
                              </span>
                              <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                                {item.selfAssessmentEvidence.includes(
                                  "http",
                                ) ? (
                                  <Link className="inline-block mr-1 h-3 w-3" />
                                ) : (
                                  <FileText className="inline-block mr-1 h-3 w-3" />
                                )}
                                {item.selfAssessmentEvidence.includes("http")
                                  ? "View Link"
                                  : item.selfAssessmentEvidence}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => openItemDialog(item)}
                          variant={
                            item.selfAssessmentScore !== undefined
                              ? "outline"
                              : "default"
                          }
                          className="w-full"
                        >
                          {item.selfAssessmentScore !== undefined
                            ? "Edit Assessment"
                            : "Complete Assessment"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {selectedItem && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedItem.number}.{selectedItem.subPoint}{" "}
                {selectedItem.epTitle}
              </DialogTitle>
              <DialogDescription>
                {selectedItem.standard} - {selectedItem.evaluationElement}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Self-Assessment Score</Label>
                <RadioGroup
                  value={String(selectedItem.selfAssessmentScore || "")}
                  onValueChange={(value) => {
                    setSelectedItem({
                      ...selectedItem,
                      selfAssessmentScore: parseInt(value),
                    });
                  }}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="score-0" />
                    <Label htmlFor="score-0">0 - Not Met</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="score-5" />
                    <Label htmlFor="score-5">5 - Partially Met</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10" id="score-10" />
                    <Label htmlFor="score-10">10 - Fully Met</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Evidence</Label>
                {(selectedItem.evidenceType === "file" ||
                  selectedItem.evidenceType === "both") && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" /> Upload File
                    </Button>
                  </div>
                )}
                {(selectedItem.evidenceType === "link" ||
                  selectedItem.evidenceType === "both") && (
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="https://example.com/evidence"
                      value={selectedItem.selfAssessmentEvidence || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          selfAssessmentEvidence: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="Add any additional notes or comments..."
                  value={selectedItem.selfAssessmentNotes || ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      selfAssessmentNotes: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveItemAssessment}>Save Assessment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
