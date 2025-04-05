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
  Save,
  CheckCircle,
  AlertCircle,
  FileText,
  Link,
  ExternalLink,
} from "lucide-react";

interface AssessmentItem {
  id: string;
  standard: string;
  evaluationElement: string;
  epTitle: string;
  number: string;
  subPoint: string;
  maxWeight: number;
  selfAssessmentScore: number;
  selfAssessmentEvidence?: string;
  selfAssessmentNotes?: string;
  evaluationScore?: number;
  evaluationNotes?: string;
}

export default function EvaluationForm() {
  const [assessmentItems, setAssessmentItems] = useState<AssessmentItem[]>([
    {
      id: "1",
      standard: "Patient Safety",
      evaluationElement: "Medication Safety",
      epTitle: "Medication Administration",
      number: "PS.01",
      subPoint: "1.1",
      maxWeight: 10,
      selfAssessmentScore: 10,
      selfAssessmentEvidence: "medication_policy.pdf",
      selfAssessmentNotes:
        "All medication administration protocols are documented and followed.",
      evaluationScore: 10,
      evaluationNotes:
        "Verified documentation and observed proper medication administration protocols.",
    },
    {
      id: "2",
      standard: "Patient Safety",
      evaluationElement: "Medication Safety",
      epTitle: "Medication Storage",
      number: "PS.01",
      subPoint: "1.2",
      maxWeight: 10,
      selfAssessmentScore: 5,
      selfAssessmentEvidence: "https://example.com/storage-guidelines",
      selfAssessmentNotes:
        "Some medications are not stored at the correct temperature.",
      evaluationScore: 5,
      evaluationNotes:
        "Confirmed issues with temperature control in medication storage area.",
    },
    {
      id: "3",
      standard: "Patient Safety",
      evaluationElement: "Infection Control",
      epTitle: "Hand Hygiene",
      number: "PS.02",
      subPoint: "2.1",
      maxWeight: 10,
      selfAssessmentScore: 10,
      selfAssessmentEvidence: "hand_hygiene_policy.pdf",
      selfAssessmentNotes:
        "Hand hygiene stations available and staff trained on proper procedures.",
    },
    {
      id: "4",
      standard: "Patient Safety",
      evaluationElement: "Infection Control",
      epTitle: "Isolation Procedures",
      number: "PS.02",
      subPoint: "2.2",
      maxWeight: 10,
      selfAssessmentScore: 10,
      selfAssessmentEvidence: "https://example.com/isolation-procedures",
      selfAssessmentNotes:
        "Isolation procedures are well-documented and followed.",
    },
    {
      id: "5",
      standard: "Quality Improvement",
      evaluationElement: "Performance Measurement",
      epTitle: "Data Collection",
      number: "QI.01",
      subPoint: "1.1",
      maxWeight: 10,
      selfAssessmentScore: 5,
      selfAssessmentEvidence: "data_collection_process.pdf",
      selfAssessmentNotes:
        "Data collection process exists but is not consistently followed.",
    },
  ]);

  const [selectedItem, setSelectedItem] = useState<AssessmentItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openItemDialog = (item: AssessmentItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const saveItemEvaluation = () => {
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
      (item) => item.evaluationScore !== undefined,
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
        <h2 className="text-3xl font-bold tracking-tight">
          External Evaluation
        </h2>
        <p className="text-muted-foreground">
          Surgical Clinic - Q2 2023 Assessment
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evaluation Progress</CardTitle>
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
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" /> View Self-Assessment
          </Button>
          <Button>
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
                        item.evaluationScore !== undefined
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
                          {item.evaluationScore !== undefined ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              <CheckCircle className="mr-1 h-3 w-3" /> Evaluated
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
                        <div className="space-y-4">
                          <div className="p-3 bg-muted/50 rounded-md space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Self-Assessment Score:
                              </span>
                              <span className="text-sm font-bold">
                                {item.selfAssessmentScore}
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
                            {item.selfAssessmentNotes && (
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  Notes:
                                </span>
                                <span className="text-sm">
                                  {item.selfAssessmentNotes}
                                </span>
                              </div>
                            )}
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Evaluation Score:
                              </span>
                              <span className="text-sm font-bold">
                                {item.evaluationScore !== undefined
                                  ? item.evaluationScore
                                  : "Not evaluated"}
                              </span>
                            </div>
                            {item.evaluationNotes && (
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  Evaluation Notes:
                                </span>
                                <span className="text-sm">
                                  {item.evaluationNotes}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => openItemDialog(item)}
                          variant={
                            item.evaluationScore !== undefined
                              ? "outline"
                              : "default"
                          }
                          className="w-full"
                        >
                          {item.evaluationScore !== undefined
                            ? "Edit Evaluation"
                            : "Complete Evaluation"}
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
              <div className="p-3 bg-muted/50 rounded-md space-y-2">
                <h4 className="font-medium">Self-Assessment Information</h4>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Score:</span>
                  <span className="text-sm font-bold">
                    {selectedItem.selfAssessmentScore}
                  </span>
                </div>
                {selectedItem.selfAssessmentEvidence && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Evidence:</span>
                    <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                      {selectedItem.selfAssessmentEvidence.includes("http") ? (
                        <Link className="inline-block mr-1 h-3 w-3" />
                      ) : (
                        <FileText className="inline-block mr-1 h-3 w-3" />
                      )}
                      {selectedItem.selfAssessmentEvidence.includes("http")
                        ? "View Link"
                        : selectedItem.selfAssessmentEvidence}
                    </span>
                  </div>
                )}
                {selectedItem.selfAssessmentNotes && (
                  <div className="flex flex-col">
                    <span className="text-sm">Notes:</span>
                    <span className="text-sm">
                      {selectedItem.selfAssessmentNotes}
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Evaluation Score</Label>
                <RadioGroup
                  value={String(selectedItem.evaluationScore || "")}
                  onValueChange={(value) => {
                    setSelectedItem({
                      ...selectedItem,
                      evaluationScore: parseInt(value),
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

              <div className="space-y-2">
                <Label>Evaluation Notes</Label>
                <Textarea
                  placeholder="Add evaluation notes, findings, or recommendations..."
                  value={selectedItem.evaluationNotes || ""}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      evaluationNotes: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveItemEvaluation}>Save Evaluation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
