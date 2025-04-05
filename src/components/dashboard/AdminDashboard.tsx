import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle, Clock, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of assessment events and system metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Assessments
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24/45</div>
            <p className="text-xs text-muted-foreground">53% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Deadlines
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Events ending this week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Q2 2023 Assessment</CardTitle>
              <CardDescription>April 1 - June 30, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Progress</div>
                  <div className="font-medium">53%</div>
                </div>
                <Progress value={53} />
              </div>
              <div className="grid gap-2 grid-cols-2">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Rooms</span>
                  <span className="font-medium">45</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Evaluators
                  </span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Self-Assessments
                  </span>
                  <span className="font-medium">38/45</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    External Evaluations
                  </span>
                  <span className="font-medium">24/45</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Department Audit</CardTitle>
              <CardDescription>May 15 - June 15, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Progress</div>
                  <div className="font-medium">78%</div>
                </div>
                <Progress value={78} />
              </div>
              <div className="grid gap-2 grid-cols-2">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Rooms</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Evaluators
                  </span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Self-Assessments
                  </span>
                  <span className="font-medium">12/12</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    External Evaluations
                  </span>
                  <span className="font-medium">9/12</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Q3 2023 Assessment</CardTitle>
              <CardDescription>July 1 - September 30, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Scheduled to start in 15 days</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Q1 2023 Assessment</CardTitle>
              <CardDescription>January 1 - March 31, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Final Score</div>
                  <div className="font-medium">87%</div>
                </div>
                <Progress value={87} className="bg-muted" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
