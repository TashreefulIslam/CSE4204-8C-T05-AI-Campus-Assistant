import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import AdminDashboard from "./pages/Admin/Dashboard";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import StudentDashboard from "./pages/Student/Dashboard";
import GenericPage from "./pages/Student/GenericPage";

import AIChat from "./pages/AI/AIChat";
import StudyPlanner from "./pages/AI/StudyPlanner";
import AssignmentHelper from "./pages/AI/AssignmentHelper";
import QuizGenerator from "./pages/AI/QuizGenerator";
import NoteSummarizer from "./pages/AI/NoteSummarizer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student-profile" element={<GenericPage title="Profile" subtitle="Student profile overview" description="Manage your profile information and academic details here." />} />
        <Route path="/student-routine" element={<GenericPage title="Routine" subtitle="Class timetable" description="View your weekly class routine and timetable updates." />} />
        <Route path="/student-exam-routine" element={<GenericPage title="Exam Routine" subtitle="Upcoming examinations" description="Check exam dates, rooms, and schedules for your current semester." />} />
        <Route path="/student-notices" element={<GenericPage title="Notices" subtitle="Academic announcements" description="Stay updated with official notices and important announcements." />} />
        <Route path="/student-assignments" element={<GenericPage title="Assignments" subtitle="Pending tasks" description="Track assignments, due dates, and submission status." />} />
        <Route path="/student-courses" element={<GenericPage title="Courses" subtitle="Current course list" description="Review your enrolled courses and academic progress." />} />
        <Route path="/student-materials" element={<GenericPage title="Course Materials" subtitle="Study resources" description="Access notes, slides, documents, and course resources." />} />
        
        <Route path="/ai-chat" element={<AIChat />} />
        
        <Route path="/study-planner" element={<StudyPlanner />} />
        
        <Route path="/ai-assignment-helper" element={<AssignmentHelper />} />
        
        <Route path="/quiz-generator" element={<QuizGenerator />}/>
        
        <Route path="/note-summarizer" element={<NoteSummarizer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
