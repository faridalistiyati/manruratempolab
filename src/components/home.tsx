import { useState } from "react";
import MainLayout from "./layout/MainLayout";
import AdminDashboard from "./dashboard/AdminDashboard";
import EventList from "./events/EventList";
import RoomList from "./rooms/RoomList";
import UserList from "./users/UserList";
import SelfAssessmentForm from "./assessment/SelfAssessmentForm";
import EvaluationForm from "./assessment/EvaluationForm";
import EvaluatorAssignment from "./assignment/EvaluatorAssignment";
import SettingsPage from "./settings/SettingsPage";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const [userRole, setUserRole] = useState<
    "admin" | "room_representative" | "evaluator"
  >("admin");

  // Extract the path without the leading slash
  const path = location.pathname.substring(1) || "dashboard";

  // Map paths to components
  const getContent = () => {
    switch (path) {
      case "events":
        return <EventList />;
      case "rooms":
        return <RoomList />;
      case "users":
        return <UserList />;
      case "self-assessment":
        return <SelfAssessmentForm />;
      case "evaluation":
        return <EvaluationForm />;
      case "assignment":
        return <EvaluatorAssignment />;
      case "settings":
        return <SettingsPage />;
      case "dashboard":
      default:
        return <AdminDashboard />;
    }
  };

  return <MainLayout userRole={userRole}>{getContent()}</MainLayout>;
}
